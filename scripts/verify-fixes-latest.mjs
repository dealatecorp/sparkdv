import { chromium } from 'playwright';

async function main() {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });

  console.log('1. Checking Distributor page tiers and button contrast...');
  await page.goto('http://localhost:4173/distributor', { waitUntil: 'networkidle' });
  await page.waitForTimeout(500);

  // Locate the commercial tiers matrix
  const tiersSection = page.locator('section:has-text("Distributor Commercial Tiers")');
  await tiersSection.scrollIntoViewIfNeeded();
  await page.waitForTimeout(400);

  // Screenshot the tiers section
  await tiersSection.screenshot({ path: 'audit/screenshots/distributor-tiers-contrast-fixed.png' });
  console.log('Saved audit/screenshots/distributor-tiers-contrast-fixed.png');

  // Verify Card 2 button
  const card2Button = page.locator('a:has-text("Select District Protected")');
  const isCard2BtnVisible = await card2Button.isVisible();
  console.log('Card 2 button visible:', isCard2BtnVisible);
  if (isCard2BtnVisible) {
    const btnText = await card2Button.textContent();
    console.log('Card 2 button text:', btnText.trim());
    const color = await card2Button.evaluate(el => window.getComputedStyle(el).color);
    const bg = await card2Button.evaluate(el => window.getComputedStyle(el).backgroundColor);
    console.log('Card 2 button computed color:', color, 'background:', bg);
  }

  console.log('2. Checking Home page AuthorityMetricsBand...');
  await page.goto('http://localhost:4173/', { waitUntil: 'networkidle' });
  await page.waitForTimeout(500);

  const authoritySection = page.locator('section:has-text("Setting the Clinical Gold Standard")');
  const isAuthorityVisible = await authoritySection.isVisible();
  console.log('AuthorityMetricsBand visible:', isAuthorityVisible);
  if (isAuthorityVisible) {
    await authoritySection.scrollIntoViewIfNeeded();
    await page.waitForTimeout(400);
    await authoritySection.screenshot({ path: 'audit/screenshots/home-authority-band-verified.png' });
    console.log('Saved audit/screenshots/home-authority-band-verified.png');
  }

  console.log('3. Checking Home Hero section...');
  const heroSection = page.locator('.scroll-product-hero-root');
  await heroSection.scrollIntoViewIfNeeded();
  await page.waitForTimeout(400);
  await heroSection.screenshot({ path: 'audit/screenshots/home-hero-verified.png' });
  console.log('Saved audit/screenshots/home-hero-verified.png');

  await browser.close();
  console.log('Verification finished!');
}

main().catch(err => {
  console.error(err);
  process.exit(1);
});
