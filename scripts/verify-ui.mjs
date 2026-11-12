import { chromium } from 'playwright';

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });

  // 1. Contact Page
  await page.goto('http://localhost:4173/contact', { waitUntil: 'networkidle' });
  await page.waitForTimeout(1000);
  await page.screenshot({ path: 'audit/screenshots/contact-light-theme.png' });
  console.log('Saved contact-light-theme.png');

  // 2. Home Page Hero
  await page.goto('http://localhost:4173/', { waitUntil: 'networkidle' });
  await page.waitForTimeout(1000);
  await page.screenshot({ path: 'audit/screenshots/home-hero-enlarged.png' });
  console.log('Saved home-hero-enlarged.png');

  // Scroll to shelf
  await page.evaluate(() => {
    const el = document.getElementById('product-shelf');
    if (el) el.scrollIntoView();
  });
  await page.waitForTimeout(1000);
  await page.screenshot({ path: 'audit/screenshots/home-shelf-noframes.png' });
  console.log('Saved home-shelf-noframes.png');

  // 3. About Page Hero
  await page.goto('http://localhost:4173/about', { waitUntil: 'networkidle' });
  await page.waitForTimeout(1000);
  await page.screenshot({ path: 'audit/screenshots/about-hero-logo-colors.png' });
  console.log('Saved about-hero-logo-colors.png');

  // Scroll to cinematic values
  await page.evaluate(() => {
    const el = document.querySelector('.about-values-panel');
    if (el) el.scrollIntoView();
  });
  await page.waitForTimeout(1000);
  await page.screenshot({ path: 'audit/screenshots/about-cinematic-values.png' });
  console.log('Saved about-cinematic-values.png');

  // 4. Profile Page
  await page.goto('http://localhost:4173/profile', { waitUntil: 'networkidle' });
  await page.waitForTimeout(1000);
  await page.screenshot({ path: 'audit/screenshots/profile-page-nike.png', fullPage: true });
  console.log('Saved profile-page-nike.png');

  await browser.close();
  console.log('All verification screenshots captured successfully!');
})();

