import { chromium } from 'playwright';

async function main() {
  const browser = await chromium.launch();
  const page = await browser.newPage({ viewport: { width: 1440, height: 1000 } });
  await page.goto('http://localhost:4173/about', { waitUntil: 'networkidle' });
  const storyPanel = page.locator('#about-story');
  await storyPanel.scrollIntoViewIfNeeded();
  await page.waitForTimeout(600);
  await page.screenshot({ path: 'audit/screenshots/about-story-removed.png' });
  await browser.close();
  console.log('Saved audit/screenshots/about-story-removed.png');
}

main().catch(console.error);

