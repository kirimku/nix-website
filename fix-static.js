const fs = require('fs');
const path = require('path');
const https = require('https');

const ORIGIN = 'https://nix-test.my.canva.site';
const SITE_DIR = path.join(__dirname, 'site');
const SRC = path.join(SITE_DIR, 'static.html');
const OUT = path.join(SITE_DIR, 'index.html');

function download(url, outPath) {
  return new Promise((resolve, reject) => {
    const dir = path.dirname(outPath);
    fs.mkdirSync(dir, { recursive: true });
    const file = fs.createWriteStream(outPath);
    https.get(url, res => {
      if (res.statusCode !== 200) {
        file.close();
        fs.unlink(outPath, () => {});
        return reject(new Error(`HTTP ${res.statusCode} for ${url}`));
      }
      res.pipe(file);
      file.on('finish', () => file.close(resolve));
    }).on('error', err => {
      file.close();
      fs.unlink(outPath, () => {});
      reject(err);
    });
  });
}

function stripScripts(html) {
  // Remove all <script ...>...</script> and <link rel="preload" as="script"> tags
  html = html.replace(/<link[^>]+rel=["']preload["'][^>]+as=["']script["'][^>]*>/gi, '');
  html = html.replace(/<script[^>]*>[\s\S]*?<\/script>/gi, '');
  return html;
}

async function main() {
  let html = fs.readFileSync(SRC, 'utf8');
  // Normalize base to local root
  html = html.replace(/<base[^>]*>/gi, '');
  html = html.replace('<head>', '<head>\n  <base href="/">');

  // Replace remote CSS with local CSS files
  html = html.replace(new RegExp(`${ORIGIN}/_assets/a0684b0780c739e9\\.vendor\\.ltr\\.css`, 'g'), 'css/a0684b0780c739e9.vendor.ltr.css');
  html = html.replace(new RegExp(`${ORIGIN}/_assets/3c73f2054d33c90c\\.ltr\\.css`, 'g'), 'css/3c73f2054d33c90c.ltr.css');
  html = html.replace(new RegExp(`${ORIGIN}/_assets/static_font_4\\.ltr\\.css`, 'g'), 'css/static_font_4.ltr.css');

  // Strip all JS to avoid blocked *_online and analytics calls
  html = stripScripts(html);

  // Collect remote asset URLs to download and rewrite
  const assetRegex = new RegExp(`${ORIGIN}/_assets/(media|images|fonts)/[^"' )]+`, 'g');
  const urls = new Set();
  let m;
  while ((m = assetRegex.exec(html)) !== null) {
    urls.add(m[0]);
  }

  const rewrites = [];
  for (const u of urls) {
    const rel = u.replace(ORIGIN + '/', ''); // _assets/.../file
    const outPath = path.join(SITE_DIR, rel);
    try {
      await download(u, outPath);
      rewrites.push({ from: u, to: rel });
    } catch (e) {
      // If download fails, keep remote URL; but still try to rewrite to local if exists
      if (fs.existsSync(outPath)) {
        rewrites.push({ from: u, to: rel });
      }
    }
  }

  // Apply rewrites in HTML to point to local files
  for (const { from, to } of rewrites) {
    const re = new RegExp(from.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'g');
    html = html.replace(re, to);
  }

  fs.writeFileSync(OUT, html, 'utf8');
  console.log(`Wrote cleaned index: ${OUT}`);
}

main().catch(err => {
  console.error(err);
  process.exit(1);
});