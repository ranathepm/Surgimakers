/**
 * Upload Full Size Images to CloudFlare R2
 * Uploads new high-res images and deletes old low-res ones
 */

const { S3Client, PutObjectCommand, DeleteObjectsCommand } = require('@aws-sdk/client-s3');
const fs = require('fs-extra');
const path = require('path');

// CloudFlare R2 Configuration
const R2_CONFIG = {
  accountId: '840c539e879904bbd1502459c4e87cbb',
  accessKeyId: '7ab328ffef9a6c859febdac0401ca871',
  secretAccessKey: 'dd9cca27591a160603d70e0f8542f7b6df3adc08ccb1b5076e6cb5631ee19c2a',
  bucketName: 'surgi-makers-photos',
  publicUrl: 'https://cdn.surgimakers.com'
};

const IMAGES_DIR = path.join(__dirname, '../public/products-images-full');
const PROGRESS_FILE = path.join(__dirname, '../src/app/products/upload-full-progress.json');

const s3Client = new S3Client({
  endpoint: `https://${R2_CONFIG.accountId}.r2.cloudflarestorage.com`,
  region: 'auto',
  credentials: {
    accessKeyId: R2_CONFIG.accessKeyId,
    secretAccessKey: R2_CONFIG.secretAccessKey,
  },
});

const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));

function getContentType(filename) {
  const ext = path.extname(filename).toLowerCase();
  const contentTypes = {
    '.jpg': 'image/jpeg',
    '.jpeg': 'image/jpeg',
    '.png': 'image/png',
    '.gif': 'image/gif',
    '.webp': 'image/webp',
    '.bmp': 'image/bmp',
  };
  return contentTypes[ext] || 'image/jpeg';
}

// Load progress
let uploadedFiles = [];
if (fs.existsSync(PROGRESS_FILE)) {
  const progress = JSON.parse(fs.readFileSync(PROGRESS_FILE, 'utf8'));
  uploadedFiles = progress.uploaded || [];
  console.log(`Resuming from saved progress: ${uploadedFiles.length} files uploaded`);
}

async function uploadFile(filename) {
  try {
    const filePath = path.join(IMAGES_DIR, filename);
    const fileContent = await fs.readFile(filePath);
    const contentType = getContentType(filename);

    const key = `products/${filename}`;

    const command = new PutObjectCommand({
      Bucket: R2_CONFIG.bucketName,
      Key: key,
      Body: fileContent,
      ContentType: contentType,
    });

    await s3Client.send(command);

    return {
      success: true,
      filename: filename,
      url: `${R2_CONFIG.publicUrl}/${key}`
    };
  } catch (error) {
    return { success: false, error: error.message, filename: filename };
  }
}

// List all objects in the products folder
async function listProductsObjects() {
  try {
    const { ListObjectsV2Command } = require('@aws-sdk/client-s3');
    const command = new ListObjectsV2Command({
      Bucket: R2_CONFIG.bucketName,
      Prefix: 'products/',
    });

    const result = await s3Client.send(command);
    return result.Contents || [];
  } catch (error) {
    console.error('Error listing objects:', error.message);
    return [];
  }
}

// Delete old images
async function deleteOldObjects() {
  try {
    const objects = await listProductsObjects();
    const oldImages = objects
      .filter(obj => !obj.Key.includes('_full.')) // Delete only non-full images
      .map(obj => ({ Key: obj.Key }));

    if (oldImages.length > 0) {
      console.log(`Found ${oldImages.length} old images to delete...`);
      const { DeleteObjectsCommand } = require('@aws-sdk/client-s3');
      const command = new DeleteObjectsCommand({
        Bucket: R2_CONFIG.bucketName,
        Delete: {
          Objects: oldImages,
          Quiet: false
        }
      });

      await s3Client.send(command);
      console.log(`Deleted ${oldImages.length} old images`);
      return oldImages.length;
    }
    return 0;
  } catch (error) {
    console.error('Error deleting old images:', error.message);
    return 0;
  }
}

async function main() {
  console.log('=== Full Size Image Upload to R2 ===\n');

  // Get all image files
  const imageExtensions = ['.jpg', '.jpeg', '.png', '.gif', '.webp', '.bmp'];
  const files = await fs.readdir(IMAGES_DIR);
  const imageFiles = files.filter(file =>
    imageExtensions.includes(path.extname(file).toLowerCase())
  );

  console.log(`Found ${imageFiles.length} high-res images to upload\n`);

  // Upload new images
  let successCount = 0;
  let failCount = 0;

  for (let i = 0; i < imageFiles.length; i++) {
    const filename = imageFiles[i];

    // Skip if already uploaded
    if (uploadedFiles.includes(filename)) {
      successCount++;
      if ((i + 1) % 100 === 100) {
        console.log(`[${i + 1}/${imageFiles.length}] Skipping ${filename} (already uploaded)`);
      }
      continue;
    }

    console.log(`[${i + 1}/${imageFiles.length}] Uploading: ${filename}`);

    const result = await uploadFile(filename);

    if (result.success) {
      successCount++;
      uploadedFiles.push(filename);
    } else {
      failCount++;
      console.error(`  ✗ Failed: ${result.error}`);
    }

    // Save progress every 10 files
    if ((i + 1) % 10 === 0) {
      await fs.writeJson(PROGRESS_FILE, {
        uploaded: uploadedFiles,
        lastUpdate: new Date().toISOString()
      }, { spaces: 2 });
      console.log(`  Progress saved: ${i + 1}/${imageFiles.length}\n`);
    }

    await sleep(200); // Small delay between uploads
  }

  // Final progress save
  await fs.writeJson(PROGRESS_FILE, {
    uploaded: uploadedFiles,
    lastUpdate: new Date().toISOString()
  }, { spaces: 2 });

  console.log('\n=== Upload Complete ===');
  console.log(`Success: ${successCount}`);
  console.log(`Failed: ${failCount}`);

  // Delete old low-res images
  console.log('\n=== Deleting Old Images ===');
  const deletedCount = await deleteOldObjects();

  console.log('\n=== Summary ===');
  console.log(`Uploaded: ${successCount} high-res images`);
  console.log(`Deleted: ${deletedCount} old low-res images`);
  console.log(`Failed: ${failCount}`);

  return { successCount, failCount, deletedCount };
}

if (require.main === module) {
  main().catch(console.error);
}

module.exports = { uploadFile, deleteOldObjects };
