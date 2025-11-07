const fs = require('fs');
const path = require('path');

const ROOT = path.join(__dirname, 'site');
const BASE = 'https://nix-test.my.canva.site';

function listFiles(dir) {
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  const files = [];
  for (const e of entries) {
    const p = path.join(dir, e.name);
    if (e.isDirectory()) files.push(...listFiles(p));
    else files.push(p);
  }
  return files;
}

function toAbsolute(u) {
  if (!u) return null;
  u = u.trim().replace(/^['"]|['"]$/g, '');
  if (u.startsWith('http://') || u.startsWith('https://')) return u;
  if (u.startsWith('//')) return 'https:' + u;
  if (u.startsWith('/')) return BASE + u;
  return BASE + '/' + u;
}

function extractFromContent(content) {
  const urls = new Set();
  // img src="..." or src='...'
  const imgSrc = [...content.matchAll(/<img[^>]+src=("([^"]+)"|'([^']+)')/gi)].map(m => m[2] || m[3]);
  imgSrc.forEach(u => urls.add(u));
  // srcset="..." (split by comma)
  const srcsets = [...content.matchAll(/srcset=("([^"]+)"|'([^']+)')/gi)].map(m => m[2] || m[3]);
  srcsets.forEach(s => s.split(',').forEach(part => {
    const u = part.trim().split(' ')[0];
    if (u) urls.add(u);
  }));
  // CSS url(...) patterns
  const cssUrls = [...content.matchAll(/url\(([^)]+)\)/gi)].map(m => m[1]);
  cssUrls.forEach(u => urls.add(u));
  return urls;
}

function coerceImagePath(u) {
  const m = u.match(/[^\s"')]+\.(png|jpe?g|webp|gif|svg)/i);
  return m ? m[0] : null;
}

function main() {
  if (!fs.existsSync(ROOT)) {
    console.error('site/ directory not found.');
    process.exit(1);
  }
  const files = listFiles(ROOT).filter(f => /\.(html|css|js)$/i.test(f));
  const found = new Set();
  for (const f of files) {
    try {
      const content = fs.readFileSync(f, 'utf8');
      const urls = extractFromContent(content);
      for (const u of urls) {
        let cleaned = u.trim().replace(/^["'\(]+/g, '');
        cleaned = cleaned.replace(/["'\)%,]+$/g, '');
        const core = coerceImagePath(cleaned);
        if (core) {
          cleaned = core;
          let abs = toAbsolute(cleaned);
          if (!abs) continue;
          // Validate URL and normalize minor issues
          try {
            // If invalid due to trailing %, attempt to trim and retry
            new URL(abs);
          } catch (_) {
            if (abs.endsWith('%')) {
              abs = abs.slice(0, -1);
            }
          }
          try {
            new URL(abs);
            found.add(abs);
          } catch (e) {
            // skip invalid URL after cleanup
          }
        }
      }
    } catch (e) {
      // ignore unreadable files
    }
  }
  const outPath = path.join(ROOT, 'image-urls.txt');
  fs.writeFileSync(outPath, Array.from(found).sort().join('\n'));
  console.log(`Wrote ${found.size} image URLs to ${outPath}`);
}

main();