const fs = require('fs');
const path = require('path');
const puppeteer = require('puppeteer');

(async () => {
  const url = 'https://nix-test.my.canva.site/';
  const outPath = path.join(__dirname, 'site', 'static.html');
  const browser = await puppeteer.launch({ headless: true });
  try {
    const page = await browser.newPage();
    await page.setViewport({ width: 1440, height: 900, deviceScaleFactor: 1 });
    await page.goto(url, { waitUntil: 'networkidle2', timeout: 60000 });
    // Give a moment for late assets
    await new Promise(r => setTimeout(r, 1500));
    let html = await page.evaluate(() => document.documentElement.outerHTML);
    // Ensure _assets and other relative paths resolve against remote origin
    html = html.replace(/(href|src)="_assets\//g, '$1="https://nix-test.my.canva.site/_assets/');
    // Inject a <base> tag to resolve other relative references to remote
    html = html.replace('<head>', '<head>\n  <base href="https://nix-test.my.canva.site/">');
    fs.writeFileSync(outPath, html, 'utf8');
    console.log('Saved static snapshot:', outPath);
  } catch (e) {
    console.error('Snapshot failed:', e);
    process.exitCode = 1;
  } finally {
    await browser.close();
  }
})();