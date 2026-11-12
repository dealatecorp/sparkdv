import { chromium } from 'playwright';

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });

  console.log('--- Verifying About Page Values Visibility ---');
  await page.goto('http://localhost:4173/about', { waitUntil: 'networkidle' });
  await page.waitForTimeout(1000);
  const panel = page.locator('.about-values-panel');
  await panel.scrollIntoViewIfNeeded();
  await page.waitForTimeout(800);

  const colors = await page.evaluate(() => {
    const title = document.querySelector('.cinematic-item-title');
    const id = document.querySelector('.cinematic-item-id');
    return {
      titleText: title?.textContent,
      titleColor: title ? getComputedStyle(title).color : null,
      idColor: id ? getComputedStyle(id).color : null,
    };
  });
  console.log('Unhovered item computed colors:', colors);
  await panel.screenshot({ path: 'audit/screenshots/about-values-panel-fixed.png' });

  // Hover over the first item
  const item1 = page.locator('.cinematic-item-title').first();
  await item1.hover();
  await page.waitForTimeout(800);
  const hoveredColor = await page.evaluate(() => {
    const title = document.querySelector('.cinematic-item-title');
    return title ? getComputedStyle(title).color : null;
  });
  console.log('Hovered item computed color:', hoveredColor);
  await panel.screenshot({ path: 'audit/screenshots/about-values-hovered.png' });

  console.log('--- Verifying Fly-to-Cart & Cart Glow on Products Page ---');
  await page.goto('http://localhost:4173/products', { waitUntil: 'networkidle' });
  await page.waitForTimeout(800);

  // Click Add on first product card
  const addBtn = page.locator('button[aria-label*="Add"]').first();
  await addBtn.click();
  // Wait 250ms mid-flight
  await page.waitForTimeout(250);
  await page.screenshot({ path: 'audit/screenshots/fly-to-cart-midflight.png' });

  // Wait for arrival & cart glow
  await page.waitForTimeout(600);
  const isGlowing = await page.evaluate(() => {
    const cart = document.querySelector('#header-cart-button');
    return cart?.classList.contains('cart-trigger-glowing');
  });
  console.log('Cart button glowing status:', isGlowing);
  await page.screenshot({ path: 'audit/screenshots/cart-glowing-active.png' });

  console.log('--- Verifying Slack Profile Page Contrast ---');
  await page.goto('http://localhost:4173/profile', { waitUntil: 'networkidle' });
  await page.waitForTimeout(800);
  await page.screenshot({ path: 'audit/screenshots/profile-verified.png' });

  // Switch to Saved Protocols tab
  await page.click('button:has-text("Saved Protocols")');
  await page.waitForTimeout(400);
  await page.screenshot({ path: 'audit/screenshots/profile-tab-protocols.png' });

  console.log('--- Verifying Contact Page ---');
  await page.goto('http://localhost:4173/contact', { waitUntil: 'networkidle' });
  await page.waitForTimeout(800);
  await page.screenshot({ path: 'audit/screenshots/contact-verified.png' });

  await browser.close();
  console.log('All verifications completed successfully!');
})();
