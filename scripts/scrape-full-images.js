/**
 * Full Size Image Scraper
 * Visits each product detail page to get the full-size original image
 */

const axios = require('axios');
const cheerio = require('cheerio');
const fs = require('fs-extra');
const path = require('path');

// Configuration
const DATA_FILE = path.join(__dirname, '../src/app/products/products-scraped.json');
const OUTPUT_DIR = path.join(__dirname, '../public/products-images-full');
const PROGRESS_FILE = path.join(__dirname, '../src/app/products/progress-full-images.json');

// Rate limiting
const DELAY_BETWEEN_REQUESTS = 500;
const IMAGE_DELAY = 300;

fs.ensureDirSync(OUTPUT_DIR);

// Load products
const productsData = JSON.parse(fs.readFileSync(DATA_FILE, 'utf8'));
const products = productsData.products;
console.log(`Found ${products.length} products to process`);

// Load progress
let processedProducts = [];
if (fs.existsSync(PROGRESS_FILE)) {
  const progress = JSON.parse(fs.readFileSync(PROGRESS_FILE, 'utf8'));
  processedProducts = progress.processed || [];
  console.log(`Resuming from saved progress: ${processedProducts.length} products processed`);
}

const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));

const cleanFilename = (filename) => {
  return filename
    .replace(/[^a-z0-9]/gi, '_')
    .replace(/_+/g, '_')
    .replace(/^_|_$/g, '')
    .toLowerCase()
    .substring(0, 100);
};

// Download image
async function downloadImage(imageUrl, filename) {
  try {
    const response = await axios({
      url: imageUrl,
      method: 'GET',
      responseType: 'arraybuffer',
      timeout: 30000
    });

    const outputPath = path.join(OUTPUT_DIR, filename);
    await fs.writeFile(outputPath, response.data);

    return {
      success: true,
      localPath: `/products-images-full/${filename}`,
      filename: filename
    };
  } catch (error) {
    return { success: false, error: error.message };
  }
}

// Get full size image from product detail page
async function getFullSizeImage(productUrl, productId, productName) {
  try {
    const response = await axios.get(productUrl, {
      headers: { 'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36' },
      timeout: 30000
    });

    const $ = cheerio.load(response.data);

    // Method 1: Look for WooCommerce main product image
    let imageUrl = $('.woocommerce-product-gallery__image img').first().attr('data-large_image');

    // Method 2: Look for the srcset with largest size
    if (!imageUrl) {
      const img = $('.woocommerce-product-gallery__image img, .single-product-image img, .product-image img').first();
      if (img.length) {
        const srcset = img.attr('srcset');
        if (srcset) {
          // Parse srcset to get largest image
          const images = srcset.split(',').map(s => s.trim());
          imageUrl = parseSrcsetLarge(images);
        } else {
          imageUrl = img.attr('src');
        }
      }
    }

    // Method 3: Try to get from the gallery
    if (!imageUrl) {
      $('.woocommerce-product-gallery__image a, .woocommerce-product-gallery__thumbnails a').each((i, el) => {
        const href = $(el).attr('href');
        if (href && (href.match(/\.(jpg|jpeg|png|webp)$/i) || href.includes('product'))) {
          imageUrl = href;
          return false; // break
        }
      });
    }

    // Method 4: Look for any large image in the page
    if (!imageUrl) {
      $('img').each((i, el) => {
        const $el = $(el);
        const src = $el.attr('src') || $el.attr('data-src');
        if (src && src.includes('product')) {
          imageUrl = src;
          return false;
        }
      });
    }

    // Make absolute URL if needed
    if (imageUrl) {
      imageUrl = imageUrl.startsWith('http') ? imageUrl : `https://medicalinst.net${imageUrl}`;
      // Remove query strings
      imageUrl = imageUrl.split('?')[0];
    }

    return imageUrl;
  } catch (error) {
    console.error(`  Error fetching product page: ${error.message}`);
    return null;
  }
}

// Parse srcset to get largest image
function parseSrcsetLarge(images) {
  for (const img of images.reverse()) {
    const parts = img.split(' ');
    if (parts[0] && parts[0].match(/\.(jpg|jpeg|png|webp)$/i)) {
      return parts[0].trim();
    }
  }
  return null;
}

// Main function
async function scrapeFullImages() {
  console.log('=== Full Size Image Scraper ===');
  console.log(`Total products: ${products.length}`);
  console.log(`Already processed: ${processedProducts.length}\n`);

  const results = [];
  let successCount = 0;
  let failCount = 0;

  for (let i = 0; i < products.length; i++) {
    const product = products[i];
    const productId = product.id;
    const productUrl = product.link;

    // Skip if already processed
    if (processedProducts.includes(productId)) {
      results.push({
        id: productId,
        name: product.name,
        status: 'skipped',
        newImageUrl: product.imageUrl
      });
      continue;
    }

    console.log(`[${i + 1}/${products.length}] Processing: ${product.name}`);
    console.log(`  URL: ${productUrl}`);

    try {
      // Get full size URL from detail page
      console.log(`  Fetching product detail page...`);
      await sleep(DELAY_BETWEEN_REQUESTS);

      const fullImageUrl = await getFullSizeImage(productUrl, productId, product.name);

      if (fullImageUrl && fullImageUrl !== product.imageUrl) {
        console.log(`  Found full-size image: ${fullImageUrl}`);

        // Download the image
        const ext = fullImageUrl.split('.').pop().split('?')[0];
        const filename = `${cleanFilename(product.name)}_full.${ext}`;

        console.log(`  Downloading image...`);
        const downloadResult = await downloadImage(fullImageUrl, filename);

        if (downloadResult.success) {
          results.push({
            id: productId,
            name: product.name,
            status: 'success',
            oldImageUrl: product.imageUrl,
            newImageUrl: downloadResult.localPath,
            originalUrl: fullImageUrl,
            filename: filename
          });
          successCount++;
          processedProducts.push(productId);

          console.log(`  ✓ Downloaded: ${filename}`);
        } else {
          console.log(`  ✗ Download failed: ${downloadResult.error}`);
          results.push({
            id: productId,
            name: product.name,
            status: 'download_failed',
            oldImageUrl: product.imageUrl,
            newImageUrl: product.imageUrl,
            error: downloadResult.error
          });
          failCount++;
          processedProducts.push(productId); // Mark as processed to avoid re-trying failed downloads
        }
      } else {
        console.log(`  No larger image found, keeping current`);
        results.push({
          id: productId,
          name: product.name,
          status: 'no_change',
          oldImageUrl: product.imageUrl,
          newImageUrl: product.imageUrl
        });
        processedProducts.push(productId);
      }
    } catch (error) {
      console.error(`  Error: ${error.message}`);
      results.push({
        id: productId,
        name: product.name,
        status: 'error',
        oldImageUrl: product.imageUrl,
        newImageUrl: product.imageUrl,
        error: error.message
      });
      failCount++;
      processedProducts.push(productId);
    }

    // Save progress every 5 products
    if ((i + 1) % 5 === 0) {
      await saveProgress();
      console.log(`\n--- Progress: ${i + 1}/${products.length} processed ---\n`);
    }

    await sleep(IMAGE_DELAY);
  }

  // Final save
  await saveProgress();

  console.log(`\n${'='.repeat(50)}`);
  console.log('Scraping Complete!');
  console.log(`Success: ${successCount}`);
  console.log(`Failed: ${failCount}`);
  console.log(`No change: ${results.filter(r => r.status === 'no_change').length}`);
  console.log(`Skipped: ${results.filter(r => r.status === 'skipped').length}`);

  // Save full results
  const resultsPath = path.join(__dirname, '../src/app/products/full-images-results.json');
  await fs.writeJson(resultsPath, {
    total: products.length,
    success: successCount,
    failed: failCount,
    results: results
  }, { spaces: 2 });

  console.log(`\nResults saved to: ${resultsPath}`);
}

async function saveProgress() {
  await fs.writeJson(PROGRESS_FILE, {
    processed: processedProducts,
    lastUpdate: new Date().toISOString()
  }, { spaces: 2 });
}

if (require.main === module) {
  scrapeFullImages().catch(console.error);
}

module.exports = { getFullSizeImage, downloadImage };
