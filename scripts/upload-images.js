import { put } from '@vercel/blob';
import fs from 'fs/promises';
import path from 'path';

// Read products.json
const productsPath = path.join(process.cwd(), 'src', 'app', 'products', 'products.json');
const productsData = JSON.parse(await fs.readFile(productsPath, 'utf-8'));

console.log(`Found ${productsData.length} products`);

// Process each product
let uploaded = 0;
let skipped = 0;
let failed = 0;

for (let i = 0; i < productsData.length; i++) {
  const product = productsData[i];
  const originalUrl = product.image;

  // Skip if no image or already uploaded (check for vercel blob URL)
  if (!originalUrl || originalUrl.includes('vercel-storage')) {
    skipped++;
    continue;
  }

  try {
    // Download the image from medicalinst
    console.log(`[${i + 1}/${productsData.length}] Downloading: ${originalUrl}`);
    const response = await fetch(originalUrl);

    if (!response.ok) {
      console.log(`  ❌ Failed to download: ${response.status}`);
      failed++;
      continue;
    }

    // Get image data
    const imageData = await response.arrayBuffer();
    const imageBuffer = Buffer.from(imageData);

    // Generate unique filename
    const filename = `products/${product.id}-${path.basename(new URL(originalUrl).pathname)}`;

    // Upload to Vercel Blob
    console.log(`  Uploading to Blob...`);
    const blob = await put(filename, imageBuffer, {
      access: 'public',
      contentType: response.headers.get('content-type') || 'image/jpeg',
    });

    // Update the product with new URL
    product.image = blob.url;
    uploaded++;

    console.log(`  ✅ Uploaded: ${blob.url}`);

    // Rate limiting to avoid overwhelming medicalinst
    if (i % 10 === 0) {
      await new Promise(resolve => setTimeout(resolve, 1000));
    }

  } catch (error) {
    console.error(`  ❌ Error: ${error.message}`);
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
