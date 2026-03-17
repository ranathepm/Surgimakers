const fs = require('fs');
const https = require('https');
const http = require('http');
const path = require('path');

const OUTPUT_DIR = path.join(__dirname, '../public/products');
const CONCURRENT = 20;

// Create output directory
if (!fs.existsSync(OUTPUT_DIR)) {
  fs.mkdirSync(OUTPUT_DIR, { recursive: true });
}

function downloadFile(url, dest) {
  return new Promise((resolve, reject) => {
    const protocol = url.startsWith('https') ? https : http;
    const file = fs.createWriteStream(dest);

    protocol.get(url, (res) => {
      if (res.statusCode === 200) {
        res.pipe(file);
        file.on('finish', () => {
          file.close();
          resolve();
        });
      } else {
        file.close();
        fs.unlink(dest, () => {});
        reject(new Error(`Status: ${res.statusCode}`));
      }
    }).on('error', (err) => {
      file.close();
      fs.unlink(dest, () => {});
      reject(err);
    });
  });
}

async function downloadImages() {
  // Read products.json to get actual image URLs
  const productsData = JSON.parse(fs.readFileSync('./src/app/products/products.json', 'utf8'));

  // Extract unique image URLs
  const imageUrls = new Map(); // fileName -> url
  productsData.forEach(p => {
    if (p.image) {
      // Extract filename from URL
      const match = p.image.match(/products\/(.+)$/);
      if (match) {
        imageUrls.set(match[1], p.image);
      }
    }
  });

  console.log(`Found ${imageUrls.size} unique images to download`);

  const downloaded = { count: 0, errors: 0, skipped: 0 };
  const urls = Array.from(imageUrls.entries());

  // Download in batches
  for (let i = 0; i < urls.length; i += CONCURRENT) {
    const batch = urls.slice(i, i + CONCURRENT);

    await Promise.allSettled(batch.map(async ([fileName, url]) => {
      const dest = path.join(OUTPUT_DIR, fileName);

      if (fs.existsSync(dest)) {
        downloaded.skipped++;
        return;
      }

      try {
        await downloadFile(url, dest);
        downloaded.count++;
        process.stdout.write(`\rDownloaded: ${downloaded.count}/${urls.length} | Skipped: ${downloaded.skipped} | Errors: ${downloaded.errors} | File: ${fileName}`);
      } catch (err) {
        downloaded.errors++;
      }
    }));
  }

  console.log(`\n\nDone! Downloaded: ${downloaded.count}, Skipped: ${downloaded.skipped}, Errors: ${downloaded.errors}`);
}

downloadImages().catch(console.error);
