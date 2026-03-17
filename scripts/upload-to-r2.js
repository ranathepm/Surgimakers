/**
 * CloudFlare R2 Image Upload Script
 * Uploads products images to CloudFlare R2 storage
 *
 * Prerequisites:
 * 1. npm install @aws-sdk/client-s3
 * 2. R2 credentials are configured below
 */

const { S3Client, PutObjectCommand } = require('@aws-sdk/client-s3');
const fs = require('fs-extra');
const path = require('path');

// CloudFlare R2 Configuration
const R2_CONFIG = {
  accountId: '840c539e879904bbd1502459c4e87cbb',
  accessKeyId: '7ab328ffef9a6c859febdac0401ca871',
  secretAccessKey: 'dd9cca27591a160603d70e0f8542f7b6df3adc08ccb1b5076e6cb5631ee19c2a',
  bucketName: 'surgi-makers-photos',
  publicUrl: 'https://pub-840c539e879904bbd1502459c4e87cbb.r2.dev'
};

// Local images directory
const IMAGES_DIR = path.join(__dirname, '../public/products-images');

// Initialize S3 client for R2
const s3Client = new S3Client({
  endpoint: `https://${R2_CONFIG.accountId}.r2.cloudflarestorage.com`,
  region: 'auto',
  credentials: {
    accessKeyId: R2_CONFIG.accessKeyId,
    secretAccessKey: R2_CONFIG.secretAccessKey,
  },
});

// Function to upload single file to R2
async function uploadFile(filePath, key) {
  try {
    const fileContent = await fs.readFile(filePath);
    const contentType = getContentType(key);

    const command = new PutObjectCommand({
      Bucket: R2_CONFIG.bucketName,
      Key: key,
      Body: fileContent,
      ContentType: contentType,
    });

    await s3Client.send(command);
    const url = `${R2_CONFIG.publicUrl}/${R2_CONFIG.bucketName}/${key}`;

    return {
      success: true,
      url: url,
      key: key
    };
  } catch (error) {
    console.error(`Error uploading ${filePath}:`, error.message);
    return { success: false, error: error.message };
  }
}

// Function to get content type
function getContentType(filename) {
  const ext = path.extname(filename).toLowerCase();
  const contentTypes = {
    '.jpg': 'image/jpeg',
    '.jpeg': 'image/jpeg',
    '.png': 'image/png',
    '.gif': 'image/gif',
    '.webp': 'image/webp',
    '.svg': 'image/svg+xml',
  };
  return contentTypes[ext] || 'application/octet-stream';
}

// Function to upload all images in directory
async function uploadAllImages() {
  console.log('Starting upload to CloudFlare R2...\n');

  // Check if images directory exists
  if (!await fs.pathExists(IMAGES_DIR)) {
    console.error(`Error: Images directory not found: ${IMAGES_DIR}`);
    console.error('Please run the scraper first to download images.');
    process.exit(1);
  }

  // Get all image files
  const imageExtensions = ['.jpg', '.jpeg', '.png', '.gif', '.webp', '.svg'];
  const files = await fs.readdir(IMAGES_DIR);
  const imageFiles = files.filter(file =>
    imageExtensions.includes(path.extname(file).toLowerCase())
  );

  console.log(`Found ${imageFiles.length} images to upload.\n`);

  const uploadResults = [];
  let successCount = 0;
  let failCount = 0;

  for (let i = 0; i < imageFiles.length; i++) {
    const filename = imageFiles[i];
    const filePath = path.join(IMAGES_DIR, filename);
    const key = `products/${filename}`; // Organize in 'products' folder

    console.log(`[${i + 1}/${imageFiles.length}] Uploading: ${filename}`);

    const result = await uploadFile(filePath, key);

    if (result.success) {
      successCount++;
      console.log(`  ✓ Uploaded: ${result.url}`);
      uploadResults.push({
        localName: filename,
        r2Key: key,
        url: result.url
      });
    } else {
      failCount++;
      uploadResults.push({
        localName: filename,
        error: result.error
      });
    }
  }

  // Save upload results
  const resultsPath = path.join(__dirname, '../src/app/products/r2-upload-results.json');
  await fs.writeJson(resultsPath, {
    uploadedAt: new Date().toISOString(),
    totalFiles: imageFiles.length,
    successful: successCount,
    failed: failCount,
    results: uploadResults
  }, { spaces: 2 });

  console.log('\n=== Upload Complete ===');
  console.log(`Total files: ${imageFiles.length}`);
  console.log(`Success: ${successCount}`);
  console.log(`Failed: ${failCount}`);
  console.log(`Results saved to: ${resultsPath}`);

  return uploadResults;
}

// Function to update products JSON with R2 URLs
async function updateProductsWithR2Urls() {
  console.log('\n=== Updating products with R2 URLs ===');

  const productsPath = path.join(__dirname, '../src/app/products/products-scraped.json');
  const resultsPath = path.join(__dirname, '../src/app/products/r2-upload-results.json');

  if (!await fs.pathExists(productsPath)) {
    console.error('Products file not found. Run scraper first.');
    return;
  }

  if (!await fs.pathExists(resultsPath)) {
    console.error('Upload results not found. Run upload script first.');
    return;
  }

  const products = await fs.readJson(productsPath);
  const uploadResults = await fs.readJson(resultsPath);

  // Create mapping of local filenames to R2 URLs
  const urlMapping = {};
  uploadResults.results.forEach(result => {
    if (result.success !== false) {
      urlMapping[result.localName] = result.url;
    }
  });

  // Update products
  let updatedCount = 0;
  products.products.forEach(product => {
    if (product.imageUrl) {
      const filename = path.basename(product.imageUrl);
      if (urlMapping[filename]) {
        product.r2Url = urlMapping[filename];
        product.imageUrl = urlMapping[filename]; // Replace with R2 URL
        updatedCount++;
      }
    }

    if (product.galleryImages) {
      product.galleryImages = product.galleryImages.map(galleryPath => {
        const filename = path.basename(galleryPath);
        return urlMapping[filename] || galleryPath;
      });
    }
  });

  // Save updated products
  const outputPath = path.join(__dirname, '../src/app/products/products.json');
  await fs.writeJson(outputPath, products, { spaces: 2 });

  console.log(`Updated ${updatedCount} products with R2 URLs`);
  console.log(`Saved to: ${outputPath}`);
}

// Main function
async function main() {
  try {
    await uploadAllImages();
    await updateProductsWithR2Urls();
  } catch (error) {
    console.error('Error:', error);
    process.exit(1);
  }
}

// Run if executed directly
if (require.main === module) {
  main();
}

module.exports = { uploadFile, uploadAllImages, updateProductsWithR2Urls };
