const scraperModule = require('website-scraper');
const scrape = scraperModule.default || scraperModule;
const path = require('path');
const fs = require('fs');

(async () => {
  const directory = path.join(__dirname, 'site');
  const options = {
    urls: ['https://nix-test.my.canva.site/'],
    directory,
    recursive: true,
    maxDepth: 2,
    requestConcurrency: 6,
    ignoreErrors: true,
    sources: [
      { selector: 'img', attr: 'src' },
      { selector: 'link[rel="stylesheet"]', attr: 'href' },
      { selector: 'script', attr: 'src' },
      { selector: 'source', attr: 'srcset' },
      { selector: 'link[rel="preload"]', attr: 'href' },
      { selector: 'meta[property="og:image"]', attr: 'content' }
    ],
  };

  try {
    const resources = await scrape(options);

    // Collect original image URLs
    const imageExtensions = ['.png', '.jpg', '.jpeg', '.webp', '.gif', '.svg'];
    const images = new Set();
    for (const r of resources) {
      try {
        const u = new URL(r.url);
        const p = u.pathname.toLowerCase();
        if (imageExtensions.some(ext => p.endsWith(ext))) {
          images.add(r.url);
        }
      } catch (e) {
        // Skip malformed URLs
      }
    }
    if (!fs.existsSync(directory)) fs.mkdirSync(directory, { recursive: true });
    fs.writeFileSync(path.join(directory, 'image-urls.txt'), Array.from(images).join('\n'));

    console.log(`Scrape complete. Saved to: ${directory}`);
    console.log(`Image URLs saved to: ${path.join(directory, 'image-urls.txt')}`);
  } catch (err) {
    console.error('Scrape failed:', err);
    process.exit(1);
  }
})();