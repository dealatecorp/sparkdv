import { chromium } from 'playwright';

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });

  console.log('--- 1. Testing Navigation Bar (For Dentists & For Parents) ---');
  await page.goto('http://localhost:4173/', { waitUntil: 'networkidle' });
  await page.waitForTimeout(800);
  await page.screenshot({ path: 'audit/screenshots/nav-with-dentists-parents.png' });
  console.log('Saved nav-with-dentists-parents.png');

  console.log('--- 2. Testing Authority & Metrics Band ---');
  const metricsEl = page.locator('text=Setting the Clinical Gold Standard');
  await metricsEl.scrollIntoViewIfNeeded();
  await page.waitForTimeout(800);
  await page.screenshot({ path: 'audit/screenshots/home-authority-metrics.png' });
  console.log('Saved home-authority-metrics.png');

  console.log('--- 3. Testing 21st.dev / Inspira UI Bento Grid ---');
  const bentoEl = page.locator('text=Engineering the Unrivaled Gold Standard');
  await bentoEl.scrollIntoViewIfNeeded();
  await page.waitForTimeout(800);
  await page.screenshot({ path: 'audit/screenshots/home-bento-grid.png' });
  console.log('Saved home-bento-grid.png');

  console.log('--- 4. Testing Dedicated Dual Portals for Dentists & Parents ---');
  const portalsEl = page.locator('text=Dedicated Portals for Every Smile');
  await portalsEl.scrollIntoViewIfNeeded();
  await page.waitForTimeout(800);
  await page.screenshot({ path: 'audit/screenshots/home-dual-portals.png' });
  console.log('Saved home-dual-portals.png');

  console.log('--- 5. Testing Flagship Breakthroughs & Fly-to-Cart ---');
  const flagshipsEl = page.locator('text=The Breakthrough Lineup');
  await flagshipsEl.scrollIntoViewIfNeeded();
  await page.waitForTimeout(800);
  await page.screenshot({ path: 'audit/screenshots/home-flagships-spotlight.png' });
  console.log('Saved home-flagships-spotlight.png');

  console.log('--- 6. Testing Testimonials & Marquee ---');
  const testEl = page.locator('text=What Department Heads & Surgeons Say');
  await testEl.scrollIntoViewIfNeeded();
  await page.waitForTimeout(800);
  await page.screenshot({ path: 'audit/screenshots/home-clinical-testimonials.png' });
  console.log('Saved home-clinical-testimonials.png');

  // Test adding Nanion Lite Pro from Home flagship to cart
  console.log('--- 7. Testing Flagship Add-to-Cart Action ---');
  const addBtn = page.locator('button[aria-label="Add Nanion Lite Pro to cart"]');
  if (await addBtn.count() > 0) {
    await addBtn.click();
    await page.waitForTimeout(300);
    await page.screenshot({ path: 'audit/screenshots/home-flagship-fly.png' });
    await page.waitForTimeout(600);
    await page.screenshot({ path: 'audit/screenshots/home-flagship-cart-glow.png' });
    console.log('Fly-to-cart triggered and captured!');
  }

  await browser.close();
  console.log('All home hype verification screenshots captured successfully!');
})();

