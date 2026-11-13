import { chromium } from 'playwright';

async function test() {
  const browser = await chromium.launch();
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  await page.goto('http://localhost:4173/', { waitUntil: 'networkidle' });
  await page.waitForTimeout(1000);

  const btn = page.locator('.whatsapp');
  const count = await btn.count();
  console.log('.whatsapp count:', count);
  if (count > 0) {
    const isVis = await btn.first().isVisible();
    const box = await btn.first().boundingBox();
    console.log('.whatsapp isVisible:', isVis, 'box:', box);
  }

  await page.screenshot({ path: 'audit/screenshots/test-home-whatsapp.png' });
  await browser.close();
}

test().catch(console.error);

