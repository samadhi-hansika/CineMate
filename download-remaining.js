const fs = require('fs');
const https = require('https');
const path = require('path');

const targets = [
  { name: 'the-last-of-us.jpg', url: 'https://image.tmdb.org/t/p/w500/dmo6TYuuJgaYinXBPjrgG9mB5od.jpg' },
  { name: 'arcane.jpg', url: 'https://image.tmdb.org/t/p/w500/cG91ExsDryCdvaTvp8IaMp9JyMZ.jpg' },
  { name: 'cyberpunk-edgerunners.jpg', url: 'https://image.tmdb.org/t/p/w500/hYthRgS1nvQkGILn9YmqsF8kSk6.jpg' },
  { name: 'shutter-island.jpg', url: 'https://image.tmdb.org/t/p/w500/nrmXQ0zcZUL8jFLrakWc90IR8z9.jpg' },
  { name: 'severance.jpg', url: 'https://image.tmdb.org/t/p/w500/ixgFmf1X59PUZam2qbAfskx2gQr.jpg' }
];

function downloadFile(url, dest) {
  return new Promise((resolve, reject) => {
    const file = fs.createWriteStream(dest);
    const options = {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)'
      }
    };
    https.get(url, options, (res) => {
      if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
        return downloadFile(res.headers.location, dest).then(resolve).catch(reject);
      }
      if (res.statusCode !== 200) {
        file.close();
        fs.unlink(dest, () => {});
        return reject(new Error(`Status ${res.statusCode}`));
      }
      res.pipe(file);
      file.on('finish', () => file.close(() => resolve(dest)));
    }).on('error', (err) => {
      file.close();
      fs.unlink(dest, () => {});
      reject(err);
    });
  });
}

(async () => {
  for (const item of targets) {
    const dest = path.join(__dirname, item.name);
    try {
      await downloadFile(item.url, dest);
      const stat = fs.statSync(dest);
      console.log(`✓ Downloaded ${item.name} (${stat.size} bytes)`);
    } catch(err) {
      console.error(`✗ Failed ${item.name}: ${err.message}`);
    }
  }
})();
