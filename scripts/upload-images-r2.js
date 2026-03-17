import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3';
import fs from 'fs/promises';
import path from 'path';

// Cloudflare R2 configuration
// Get these from your Cloudflare dashboard:
// 1. Account ID: From Cloudflare dashboard URL or R2 API Tokens page
// 2. Access Key ID: From R2 API Token
// 3. Secret Access Key: From R2 API Token

const R2_CONFIG = {
  accountId: process.env.R2_ACCOUNT_ID || 'YOUR_ACCOUNT_ID',
  accessKeyId: process.env.R2_ACCESS_KEY_ID || 'YOUR_ACCESS_KEY_ID',
  secretAccessKey: process.env.R2_SECRET_ACCESS_KEY || 'YOUR_SECRET_ACCESS_KEY',
  bucketName: 'surgimakers-images'
};

// Create S3 client for R2
const s3 = new S3Client({
  region: 'auto',
  endpoint: `https://${R2_CONFIG.accountId}.r2.cloudflarestorage.com`,
  credentials: {
    accessKeyId: R2_CONFIG.accessKeyId,
    secretAccessKey: R2_CONFIG.secretAccessKey
  }
});

// Read products.json
const productsPath = path.join(process.cwd(), 'src', 'app', 'products', 'products.json');
const productsData = JSON.parse(await fs.readFile(productsPath, 'utf-8'));

console.log(`Found ${productsData.length} products`);

// Validation
if (R2_CONFIG.accountId === 'YOUR_ACCOUNT_ID') {
  console.error('\nError: Please set up R2 credentials:');
  console.error('1. Go to https://dash.cloudflare.com/');
  console.error('2. Navigate to R2 > Create bucket (name: surgimakers-images)');
  console.error('3. Go to R2 > Manage R2 API Tokens > Create API Token');
  console.error('4. Set environment variables:');
  console.error('   R2_ACCOUNT_ID=<your-account-id>');
  console.error('   R2_ACCESS_KEY_ID=<your-access-key-id>');
  console.error('   R2_SECRET_ACCESS_KEY=<your-secret-access-key>');
  process.exit(1);
}

// Process each product
let uploaded = 0;
let skipped = 0;
let failed = 0;
const errors = [];

for (let i = 0; i < productsData.length; i++) {
  const product = productsData[i];
  const originalUrl = product.image;

  // Skip if no image or already uploaded (check for r2 URL)
  if (!originalUrl || originalUrl.includes('.r2.dev') || originalUrl.includes('.r2.cloudflarestorage.com')) {
    skipped++;
    if (i % 100 === 0) {
      console.log(`[${i + 1}/${productsData.length}] Skipped (no new images)`);
    }
    continue;
  }

  try {
    // Download the image from medicalinst
    console.log(`[${i + 1}/${productsData.length}] Downloading: ${originalUrl.substring(0, 80)}...`);
    const response = await fetch(originalUrl, {
      headers: { 'User-Agent': 'Mozilla/5.0' }
    });

    if (!response.ok) {
      console.log(`  ❌ Failed to download: ${response.status}`);
      failed++;
      continue;
    }

    // Get image data
    const imageData = await response.arrayBuffer();
    const imageBuffer = Buffer.from(imageData);

    // Generate unique filename
    const ext = path.extname(new URL(originalUrl).pathname) || '.jpg';
    const filename = `products/${product.id}-${Date.now()}${ext}`;

    // Upload to R2
    console.log(`  Uploading to R2...`);
    const command = new PutObjectCommand({
      Bucket: R2_CONFIG.bucketName,
      Key: filename,
      Body: imageBuffer,
      ContentType: response.headers.get('content-type') || 'image/jpeg',
    });

    await s3.send(command);

    // Update the product with new R2 URL
    // R2 public URL format: https://<bucket>.<account-id>.r2.cloudflarestorage.com/<key>
    // Or use custom domain if set up
    product.image = `https://${R2_CONFIG.bucketName}.${R2_CONFIG.accountId}.r2.cloudflarestorage.com/${filename}`;
    uploaded++;

    console.log(`  ✅ Uploaded`);

    // Small delay to be nice to the source server
    if (i % 10 === 0) {
      await new Promise(resolve => setTimeout(resolve, 200));
    }

  } catch (error) {
    console.error(`  ❌ Error: ${error.message}`);
    errors.push({ product: product.id, error: error.message });
    failed++;
  }
}

// Save updated products.json
await fs.writeFile(productsPath, JSON.stringify(productsData, null, 2));
console.log('\n=== Upload Summary ===');
console.log(`Uploaded: ${uploaded}`);
console.log(`Skipped: ${skipped}`);
console.log(`Failed: ${failed}`);
console.log(`Total processed: ${productsData.length}`);

if (errors.length > 0 && errors.length <= 20) {
  console.log('\nFailed products:');
  errors.forEach(e => console.log(`  - Product ${e.product}: ${e.error}`));
}
