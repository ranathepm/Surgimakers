/**
 * MedicalInst.net Product Scraper
 * Updated to scrape subcategories first, then products
 */

const axios = require('axios');
const cheerio = require('cheerio');
const fs = require('fs-extra');
const path = require('path');

// Configuration
const BASE_URL = 'https://medicalinst.net';
const OUTPUT_DIR = path.join(__dirname, '../public/products-images');
const DATA_FILE = path.join(__dirname, '../src/app/products/products-scraped.json');
const SCRAPED_FILE = path.join(__dirname, '../src/app/products/progress-scraped.json');

// Rate limiting
const DELAY_BETWEEN_REQUESTS = 800;
const IMAGE_DELAY = 300;

// Create output directory
fs.ensureDirSync(OUTPUT_DIR);

// Load progress if exists
let scrapedProducts = [];
let processedSubcategories = [];

if (fs.existsSync(SCRAPED_FILE)) {
  const progress = fs.readJsonSync(SCRAPED_FILE);
  scrapedProducts = progress.products || [];
  processedSubcategories = progress.processedSubcategories || [];
  console.log(`Resuming from saved progress: ${scrapedProducts.length} products, ${processedSubcategories.length} subcategories processed`);
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
      localPath: `/products-images/${filename}`,
      filename: filename
    };
  } catch (error) {
    return { success: false, error: error.message };
  }
}

// Get all subcategory URLs from a main category
async function getSubcategoryUrls(categoryUrl) {
  try {
    console.log(`Fetching subcategories from: ${categoryUrl}`);
    const response = await axios.get(categoryUrl, {
      headers: { 'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36' },
      timeout: 30000
    });

    const $ = cheerio.load(response.data);
    const subcategories = [];

    // Find subcategory links (using the pattern from the site)
    $('a').each((index, element) => {
      const $el = $(element);
      const href = $el.attr('href');
      const text = $el.text().trim();

      // Check if it's a product category subcategory
      if (href && href.includes('/product-category/') && text && text.length > 3 && !text.includes('DENTAL INSTRUMENTS')) {
        // Get product count from text like "Apical Fragment Ejectors (23)"
        const match = text.match(/^(.+?)\s*\((\d+)\)$/);
        if (match) {
          subcategories.push({
            name: match[1].trim(),
            count: parseInt(match[2]),
            url: href.startsWith('http') ? href : `${BASE_URL}${href}`
          });
        }
      }
    });

    // Deduplicate
    const unique = [];
    const seen = new Set();
    subcategories.forEach(cat => {
      if (!seen.has(cat.url)) {
        seen.add(cat.url);
        unique.push(cat);
      }
    });

    console.log(`Found ${unique.length} subcategories`);
    return unique;
  } catch (error) {
    console.error(`Error fetching subcategories: ${error.message}`);
    return [];
  }
}

// Get products from a subcategory
async function getProductsFromSubcategory(subcategoryUrl, subcategoryName) {
  const products = [];
  let page = 1;
  let hasNextPage = true;

  while (hasNextPage) {
    try {
      const url = page === 1 ? subcategoryUrl : `${subcategoryUrl}page/${page}/`;
      console.log(`  Fetching page ${page}: ${url}`);

      const response = await axios.get(url, {
        headers: { 'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36' },
        timeout: 30000
      });

      const $ = cheerio.load(response.data);
      const productElements = $('.product');

      if (productElements.length === 0) {
        hasNextPage = false;
        break;
      }

      productElements.each((index, element) => {
        const $el = $(element);

        // Get link - could be from multiple locations
        let link = $el.find('.woocommerce-LoopProduct-link').attr('href');
        if (!link) {
          link = $el.find('a').first().attr('href');
        }

        // Get title - from h2 with class
        let title = $el.find('.woocommerce-loop-product__title').text().trim();
        if (!title || title === '') {
          title = $el.find('h2').text().trim();
        }

        // Get price - just get the full price text
        let price = $el.find('.price').text().trim() || '';

        // Get image - check multiple locations
        let imageUrl = $el.find('.attachment-woocommerce_thumbnail').attr('src')
                     || $el.find('.attachment-woocommerce_thumbnail').attr('data-src')
                     || $el.find('img').first().attr('src')
                     || '';

        // Get product ID from add-to-cart button
        const addToCartUrl = $el.find('.add_to_cart_button').attr('href') || '';
        const match = addToCartUrl.match(/add-to-cart=(\d+)/);
        const productId = match ? match[1] : '';
        const sku = productId || $el.attr('class').match(/post-(\d+)/)?.[1] || '';

        if (title && link && title !== '') {
          products.push({
            id: sku || cleanFilename(title),
            name: title,
            sku: sku,
            productId: productId,
            price: price,
            link: link.startsWith('http') ? link : `${BASE_URL}${link}`,
            imageUrl: imageUrl || null,
            category: subcategoryName,
            description: ''
          });
        }
      });

      const nextLink = $('.page-numbers .next').attr('href');
      hasNextPage = !!nextLink;
      page++;

      await sleep(DELAY_BETWEEN_REQUESTS);
    } catch (error) {
      console.error(`    Error: ${error.message}`);
      hasNextPage = false;
    }
  }

  return products;
}

// Save progress
async function saveProgress() {
  await fs.writeJson(SCRAPED_FILE, {
    products: scrapedProducts,
    processedSubcategories: processedSubcategories,
    lastUpdate: new Date().toISOString()
  }, { spaces: 2 });
}

// Main scrape function
async function scrapeAllProducts() {
  console.log('=== MedicalInst.net Scraper ===');
  console.log('This will take several hours (rate limited)\n');

  const mainCategories = {
    dental: 'https://medicalinst.net/product-category/dental-instruments/',
    surgical: 'https://medicalinst.net/product-category/surgical-instruments/'
  };

  for (const [category, url] of Object.entries(mainCategories)) {
    console.log(`\n${'='.repeat(50)}`);
    console.log(`Processing ${category.toUpperCase()} category`);
    console.log(`${'='.repeat(50)}`);

    // Get subcategories
    const subcategories = await getSubcategoryUrls(url);
    console.log(`Found ${subcategories.length} subcategories to process\n`);

    for (const subcat of subcategories) {
      const subcatKey = subcat.url;

      // Skip if already processed
      if (processedSubcategories.includes(subcatKey)) {
        console.log(`[SKIP] ${subcat.name} (${subcat.count} products) - already processed`);
        continue;
      }

      console.log(`\n[PROCESSING] ${subcat.name} (${subcat.count} products)`);
      console.log(`URL: ${subcat.url}`);

      try {
        const products = await getProductsFromSubcategory(subcat.url, subcat.name);
        console.log(`  -> Found ${products.length} products`);

        scrapedProducts.push(...products);
        processedSubcategories.push(subcatKey);

        // Save progress every subcategory
        await saveProgress();
        console.log(`  -> Progress saved. Total: ${scrapedProducts.length} products`);

        await sleep(DELAY_BETWEEN_REQUESTS);
      } catch (error) {
        console.error(`  -> Error processing ${subcat.name}: ${error.message}`);
      }
    }
  }

  console.log(`\n${'='.repeat(50)}`);
  console.log('Scraping complete!');
  console.log(`Total products: ${scrapedProducts.length}`);

  // Create unique products (remove duplicates by link)
  const uniqueProducts = [];
  const seenLinks = new Set();

  scrapedProducts.forEach(p => {
    if (!seenLinks.has(p.link)) {
      seenLinks.add(p.link);
      uniqueProducts.push(p);
    }
  });

  console.log(`After deduplication: ${uniqueProducts.length} products`);

  // Download images
  console.log(`\n${'='.repeat(50)}`);
  console.log('Downloading images...');

  let downloadedCount = 0;
  const downloadedImages = new Map();

  for (let i = 0; i < uniqueProducts.length; i++) {
    const product = uniqueProducts[i];

    if ((i + 1) % 10 === 0) {
      console.log(`Downloading: ${i + 1}/${uniqueProducts.length} (${downloadedCount} downloaded)`);
    }

    if (product.imageUrl && !downloadedImages.has(product.imageUrl)) {
      const ext = product.imageUrl.split('.').pop().split('?')[0];
      const filename = `${cleanFilename(product.name)}.${ext}`;

      const result = await downloadImage(product.imageUrl, filename);

      if (result.success) {
        product.localImagePath = result.localPath;
        downloadedImages.set(product.imageUrl, result.localPath);
        downloadedCount++;
      }
    }

    await sleep(IMAGE_DELAY);
  }

  console.log(`\nDownloaded ${downloadedCount}/${uniqueProducts.length} images`);

  // Save final data
  const outputData = {
    scrapedAt: new Date().toISOString(),
    totalProducts: uniqueProducts.length,
    imagesDownloaded: downloadedCount,
    products: uniqueProducts.map(p => ({
      id: p.id,
      name: p.name,
      sku: p.sku,
      price: p.price,
      description: p.description,
      category: p.category,
      link: p.link,
      imageUrl: p.localImagePath || p.imageUrl
    }))
  };

  await fs.writeJson(DATA_FILE, outputData, { spaces: 2 });
  console.log(`\nData saved to: ${DATA_FILE}`);
  console.log(`Images saved to: ${OUTPUT_DIR}`);

  return outputData;
}

if (require.main === module) {
  scrapeAllProducts().catch(console.error);
}

module.exports = { scrapeAllProducts, getSubcategoryUrls, getProductsFromSubcategory };
