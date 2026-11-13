import { chromium } from 'playwright';

async function main() {
  const browser = await chromium.launch();
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  await page.goto('http://localhost:4173/profile', { waitUntil: 'networkidle' });
  const ordersTab = page.locator('button:has-text("Orders (3)")');
  await ordersTab.click();
  await page.waitForTimeout(600);
  await page.screenshot({ path: 'audit/screenshots/profile-orders-tab.png' });
  await browser.close();
  console.log('Saved profile orders tab screenshot');
}

main().catch(console.error);

