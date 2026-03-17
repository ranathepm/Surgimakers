import fs from 'fs/promises';
import path from 'path';
import { execSync } from 'child_process';

// Account ID from wrangler whoami
const ACCOUNT_ID = '840c539e879904bbd1502459c4e87cbb';
const BUCKET_NAME = 'surgimakers-images';
const TEMP_DIR = path.join(process.cwd(), 'scripts', 'temp');

// Create temp directory
await fs.mkdir(TEMP_DIR, { recursive: true });

// Read products.json
const productsPath = path.join(process.cwd(), 'src', 'app', 'products', 'products.json');
const productsData = JSON.parse(await fs.readFile(productsPath, 'utf-8'));

console.log(`Found ${productsData.length} products`);

// Process each product
let uploaded = 0;
let skipped = 0;
let failed = 0;
const errors = [];

for (let i = 0; i < productsData.length; i++) {
  const product = productsData[i];
  const originalUrl = product.image;

  // Skip if no image or already uploaded
  if (!originalUrl || originalUrl.includes('.r2.dev')) {
    skipped++;
    if (i % 100 === 0) {
      console.log(`[${i + 1}/${productsData.length}] Skipped (already processed)`);
    }
    continue;
  }

  try {
    // Download the image
    console.log(`[${i + 1}/${productsData.length}] Downloading...`);

    const response = await fetch(originalUrl, {
      headers: { 'User-Agent': 'Mozilla/5.0' }
    });

    if (!response.ok) {
      console.log(`  ❌ Failed to download: ${response.status}`);
      failed++;
      continue;
    }

    const imageData = await response.arrayBuffer();
    const buffer = Buffer.from(imageData);

    // Save to temp file
    const ext = path.extname(new URL(originalUrl).pathname) || '.jpg';
    const tempFile = path.join(TEMP_DIR, `${product.id}${ext}`);
    await fs.writeFile(tempFile, buffer);

    // Upload via wrangler
    console.log(`  Uploading to R2 via wrangler...`);
    try {
      execSync(`wrangler r2 object put ${BUCKET_NAME}/products/${product.id}${ext} --file=${tempFile}`, {
        stdio: 'pipe'
      });

      // Update R2 URL (using public endpoint)
      product.image = `https://pub-${ACCOUNT_ID.replace(/-/g, '')}.r2.dev/products/${product.id}${ext}`;
      uploaded++;
      console.log(`  ✅ Uploaded`);

    } catch (uploadError) {
      console.log(`  ❌ Upload failed: ${uploadError.message}`);
      failed++;
    }

    // Clean up temp file
    await fs.unlink(tempFile).catch(() => {});

    // Rate limiting
    if (i % 5 === 0) {
      await new Promise(resolve => setTimeout(resolve, 300));
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
