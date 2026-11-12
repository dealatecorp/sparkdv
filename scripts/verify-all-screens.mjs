import { chromium } from 'playwright';

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });

  // 1. About Page: Cinematic Values (Unhovered & Hovered)
  await page.goto('http://localhost:4173/about', { waitUntil: 'networkidle' });
  await page.waitForTimeout(1000);

  // Scroll to cinematic values
  await page.evaluate(() => {
    const el = document.querySelector('.about-values-panel');
    if (el) el.scrollIntoView({ behavior: 'instant', block: 'center' });
  });
  await page.waitForTimeout(600);
  await page.screenshot({ path: 'audit/screenshots/about-cinematic-unhovered.png' });
  console.log('Saved about-cinematic-unhovered.png');

  // Hover over the first item (Science-led)
  const firstItem = await page.$('.about-values-panel .group');
  if (firstItem) {
    await firstItem.hover();
    await page.waitForTimeout(900); // allow 700ms transition to complete
    await page.screenshot({ path: 'audit/screenshots/about-cinematic-hovered.png' });
    console.log('Saved about-cinematic-hovered.png');
  }

  // 2. Contact Page
  await page.goto('http://localhost:4173/contact', { waitUntil: 'networkidle' });
  await page.waitForTimeout(1000);
  await page.screenshot({ path: 'audit/screenshots/contact-theme-verified.png' });
  console.log('Saved contact-theme-verified.png');

  // 3. Home Page Hero & Shelf
  await page.goto('http://localhost:4173/', { waitUntil: 'networkidle' });
  await page.waitForTimeout(1000);
  await page.screenshot({ path: 'audit/screenshots/home-hero-verified.png' });
  console.log('Saved home-hero-verified.png');

  await page.evaluate(() => {
    const el = document.getElementById('product-shelf');
    if (el) el.scrollIntoView({ behavior: 'instant', block: 'start' });
  });
  await page.waitForTimeout(1000);
  await page.screenshot({ path: 'audit/screenshots/home-shelf-verified.png' });
  console.log('Saved home-shelf-verified.png');

  await browser.close();
  console.log('All screenshots verified!');
})();

