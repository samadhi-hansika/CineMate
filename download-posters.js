const fs = require('fs');
const https = require('https');
const path = require('path');

const targets = [
  { name: 'the-last-of-us.jpg', url: 'https://image.tmdb.org/t/p/w500/uKvVjK19yM207h82a17FkLoz6zS.jpg' },
  { name: 'arcane.jpg', url: 'https://image.tmdb.org/t/p/w500/fqldrq26laLRx94pnslCwflx6kd.jpg' },
  { name: 'cyberpunk-edgerunners.jpg', url: 'https://image.tmdb.org/t/p/w500/7Jp9rZ8vKk6n1O288yQf0pT1T2l.jpg' },
  { name: 'stranger-things.jpg', url: 'https://image.tmdb.org/t/p/w500/49WJfeN0moxb9IPfGn8AIqMGskD.jpg' },
  { name: 'breaking-bad.jpg', url: 'https://image.tmdb.org/t/p/w500/ztkUQFLlC19CCMYHW9o1zWhJRNq.jpg' },
  { name: 'blade-runner-2049.jpg', url: 'https://image.tmdb.org/t/p/w500/gajva2L0rPYkEWjzgFlBXCAVBE5.jpg' },
  { name: 'spider-verse.jpg', url: 'https://image.tmdb.org/t/p/w500/8Vt6mWEReuy4Of61Lnj5Xj704m8.jpg' },
  { name: 'gladiator-2.jpg', url: 'https://image.tmdb.org/t/p/w500/2cxhvwyEwRlysAmRH4iodkvo0z5.jpg' },
  { name: 'parasite.jpg', url: 'https://image.tmdb.org/t/p/w500/7IiTTgloJzvGI1TAYymCfbfl3vT.jpg' },
  { name: 'deadpool-and-wolverine.jpg', url: 'https://image.tmdb.org/t/p/w500/8cdWjvZQUExUUTzyp4t6EDMubfO.jpg' },
  { name: 'wednesday.jpg', url: 'https://image.tmdb.org/t/p/w500/9PFonBhy4cQy7Jz20NpMygczOkv.jpg' },
  { name: 'the-batman.jpg', url: 'https://image.tmdb.org/t/p/w500/74xTEgt7R36Fpooo50r9T25onhq.jpg' },
  { name: 'alien-romulus.jpg', url: 'https://image.tmdb.org/t/p/w500/b33nnKl1GSFbao4l3fZDDqsMx0F.jpg' },
  { name: 'shutter-island.jpg', url: 'https://image.tmdb.org/t/p/w500/4GDy0PHYX3VRXUtwK5ysagvk29z.jpg' },
  { name: 'severance.jpg', url: 'https://image.tmdb.org/t/p/w500/kFIqE6iS4o4gP4lFjQ12F7K0n57.jpg' },
  { name: 'fight-club.jpg', url: 'https://image.tmdb.org/t/p/w500/pB8BM7pdSp6B6Ih7QZ4DrQ3PmJK.jpg' },
  { name: 'avengers-endgame.jpg', url: 'https://image.tmdb.org/t/p/w500/or06FN3Dka5tukK1e9sl16pB3iy.jpg' }
];

function downloadFile(url, dest) {
  return new Promise((resolve, reject) => {
    const file = fs.createWriteStream(dest);
    const options = {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
      }
    };
    https.get(url, options, (response) => {
      if (response.statusCode >= 300 && response.statusCode < 400 && response.headers.location) {
        return downloadFile(response.headers.location, dest).then(resolve).catch(reject);
      }
      if (response.statusCode !== 200) {
        file.close();
        fs.unlink(dest, () => {});
        return reject(new Error(`Status ${response.statusCode} for ${url}`));
      }
      response.pipe(file);
      file.on('finish', () => {
        file.close(() => resolve(dest));
      });
    }).on('error', (err) => {
      file.close();
      fs.unlink(dest, () => {});
      reject(err);
    });
  });
}

(async () => {
  console.log(`Starting download of ${targets.length} movie posters...`);
  for (const item of targets) {
    const dest = path.join(__dirname, item.name);
    try {
      await downloadFile(item.url, dest);
      const stat = fs.statSync(dest);
      console.log(`✓ Downloaded ${item.name} (${stat.size} bytes)`);
    } catch (err) {
      console.error(`✗ Failed ${item.name}: ${err.message}`);
    }
  }
  console.log('Finished.');
})();
