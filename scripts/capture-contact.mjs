import { chromium } from 'playwright';

async function main() {
  const browser = await chromium.launch();
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  await page.goto('http://localhost:4173/contact', { waitUntil: 'networkidle' });
  const form = page.locator('form');
  await form.scrollIntoViewIfNeeded();
  await page.waitForTimeout(500);
  await page.screenshot({ path: 'audit/screenshots/contact-button-visible.png' });
  await browser.close();
  console.log('Saved contact button screenshot');
}

main().catch(console.error);

