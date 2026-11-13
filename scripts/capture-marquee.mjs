import { chromium } from 'playwright';

async function main() {
  const browser = await chromium.launch();
  const page = await browser.newPage({ viewport: { width: 1440, height: 1000 } });
  await page.goto('http://localhost:4173/', { waitUntil: 'networkidle' });
  const section = page.locator('section').filter({ hasText: 'What Department Heads' });
  await section.scrollIntoViewIfNeeded();
  await page.waitForTimeout(1000);
  await section.screenshot({ path: 'audit/screenshots/testimonials-marquee-section.png' });
  await browser.close();
  console.log('Saved marquee section screenshot');
}

main().catch(console.error);

