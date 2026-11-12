import { chromium } from 'playwright';

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  await page.goto('http://localhost:4173/products', { waitUntil: 'networkidle' });
  await page.waitForTimeout(600);

  const btn = page.locator('button[aria-label*="Add"]').first();
  await btn.click();

  // Snapshot at 240ms (item in the air)
  await page.waitForTimeout(240);
  await page.screenshot({ path: 'audit/screenshots/fly-item-midair.png' });

  // Snapshot at 750ms (cart glowing with halo)
  await page.waitForTimeout(500);
  await page.screenshot({ path: 'audit/screenshots/cart-halo-glowing.png' });

  await browser.close();
  console.log('Cart fly screenshots captured!');
})();

