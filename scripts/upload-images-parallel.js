import fs from 'fs/promises';
import path from 'path';
import { execSync } from 'child_process';

// Configuration
const ACCOUNT_ID = '840c539e879904bbd1502459c4e87cbb';
const BUCKET_NAME = 'surgimakers-images';
const TEMP_DIR = path.join(process.cwd(), 'scripts', 'temp');
const PROGRESS_FILE = path.join(process.cwd(), 'scripts', 'upload-progress.json');
const MAX_CONCURRENT = 10; // Number of parallel uploads

// Create temp directory
await fs.mkdir(TEMP_DIR, { recursive: true });

// Load products.json
const productsPath = path.join(process.cwd(), 'src', 'app', 'products', 'products.json');
const productsData = JSON.parse(await fs.readFile(productsPath, 'utf-8'));

console.log(`Found ${productsData.length} products`);

// Load existing progress
let progress = { uploaded: 0, skipped: 0, failed: 0, lastIndex: -1, processed: {} };
try {
  const savedProgress = await fs.readFile(PROGRESS_FILE, 'utf-8');
  progress = { ...progress, ...JSON.parse(savedProgress) };
  console.log(`Resuming from product ${progress.lastIndex + 1}`);
} catch {
  console.log('Starting fresh upload');
}

// Helper function to upload a single product
async function uploadProduct(product) {
  const { id, image: originalUrl } = product;

  // Skip if already uploaded
  if (!originalUrl || originalUrl.includes('.r2.dev') || progress.processed[id]) {
    return { success: true, skipped: true };
  }

  let retries = 0;
  const maxRetries = 3;

  while (retries < maxRetries) {
    try {
      // Download image
      const response = await fetch(originalUrl, {
        headers: { 'User-Agent': 'Mozilla/5.0' },
        signal: AbortSignal.timeout(30000) // 30s timeout
      });

      if (!response.ok) {
        throw new Error(`HTTP ${response.status}`);
      }

      const imageData = await response.arrayBuffer();
      const buffer = Buffer.from(imageData);

      // Save to temp file
      const ext = path.extname(new URL(originalUrl).pathname) || '.jpg';
      const tempFile = path.join(TEMP_DIR, `${id}${ext}`);
      await fs.writeFile(tempFile, buffer);

      // Upload via wrangler
      execSync(`wrangler r2 object put ${BUCKET_NAME}/products/${id}${ext} --file=${tempFile}`, {
        stdio: 'pipe',
        timeout: 60000
      });

      // Update product URL
      product.image = `https://pub-${ACCOUNT_ID.replace(/-/g, '')}.r2.dev/products/${id}${ext}`;

      // Clean up
      await fs.unlink(tempFile).catch(() => {});

      // Mark as processed
      progress.processed[id] = true;

      return { success: true, uploaded: true };

    } catch (error) {
      retries++;
      console.log(`  ⚠️ Product ${id} failed (attempt ${retries}/${maxRetries}): ${error.message}`);

      if (retries >= maxRetries) {
        return { success: false, error: error.message };
      }

      // Wait before retry
      await new Promise(r => setTimeout(r, 1000 * retries));
    }
  }

  return { success: false, error: 'Max retries exceeded' };
}

// Main upload loop
let uploaded = progress.uploaded;
let skipped = progress.skipped;
let failed = progress.failed;
const errors = [];
let lastIndex = progress.lastIndex;

console.log(`\nStarting from index ${lastIndex + 1}...`);

// Process in batches
const batchSize = MAX_CONCURRENT;

for (let i = lastIndex + 1; i < productsData.length; i += batchSize) {
  const batch = productsData.slice(i, i + batchSize);
  const uploadPromises = batch.map(async (product) => {
    const result = await uploadProduct(product);

    if (result.skipped) {
      skipped++;
    } else if (result.success) {
      uploaded++;
      console.log(`[${i + batch.indexOf(product) + 1}/${productsData.length}] ✅ Uploaded (total: ${uploaded})`);
    } else {
      failed++;
      errors.push({ id: product.id, error: result.error });
      console.log(`[${i + batch.indexOf(product) + 1}/${productsData.length}] ❌ Failed: ${result.error}`);
    }

    return result;
  });

  // Wait for all uploads in this batch
  await Promise.all(uploadPromises);

  // Update progress every batch
  lastIndex = i + batch.length - 1;
  progress = { uploaded, skipped, failed, lastIndex, processed: progress.processed };
  await fs.writeFile(PROGRESS_FILE, JSON.stringify(progress, null, 2));

  // Small delay between batches
  await new Promise(r => setTimeout(r, 100));

  // Save products.json every 100 batches
  if ((i / batchSize) % 100 === 0) {
    await fs.writeFile(productsPath, JSON.stringify(productsData, null, 2));
    console.log(`\n💾 Saved progress (${uploaded}/${productsData.length} processed)\n`);
  }
}

// Final save
await fs.writeFile(productsPath, JSON.stringify(productsData, null, 2));
await fs.unlink(PROGRESS_FILE).catch(() => {});

console.log('\n=======================================');
console.log('🎉 Upload Complete!');
console.log('=======================================');
console.log(`Uploaded:   ${uploaded}`);
console.log(`Skipped:    ${skipped}`);
console.log(`Failed:     ${failed}`);
console.log(`Total:      ${productsData.length}`);

if (errors.length > 0) {
  console.log('\n--- Failed Products ---');
  errors.slice(0, 50).forEach(e => console.log(`  - ${e.id}: ${e.error}`));
  if (errors.length > 50) {
    console.log(`  ... and ${errors.length - 50} more`);
  }
}
