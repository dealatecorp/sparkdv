import { chromium } from 'playwright';

async function main() {
  const browser = await chromium.launch();
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  await page.goto('http://localhost:4173/profile', { waitUntil: 'networkidle' });
  const savedTab = page.locator('button:has-text("Saved Protocols")');
  await savedTab.click();
  await page.waitForTimeout(600);
  await page.screenshot({ path: 'audit/screenshots/profile-saved-protocols.png' });
  await browser.close();
  console.log('Saved profile saved protocols tab screenshot');
}

main().catch(console.error);

