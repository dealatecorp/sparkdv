import { chromium } from 'playwright';

async function test() {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.goto('http://localhost:4173/products', { waitUntil: 'networkidle' });
  await page.waitForTimeout(600);

  const images = await page.$$eval('.product-card img', imgs => imgs.map(i => ({
    src: i.src,
    naturalWidth: i.naturalWidth,
    naturalHeight: i.naturalHeight,
    visible: i.naturalWidth > 0 && i.naturalHeight > 0
  })));
  console.log('Catalog images:', images);

  await page.screenshot({ path: 'audit/screenshots/catalog-images-verified.png' });
  console.log('Saved audit/screenshots/catalog-images-verified.png');
  await browser.close();
}
test();

