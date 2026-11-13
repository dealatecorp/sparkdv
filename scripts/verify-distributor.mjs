import { chromium } from 'playwright';

async function main() {
  const browser = await chromium.launch({ headless: true });

  // 1. Desktop Nav & Page Check
  console.log('1. Checking Desktop Nav & Header...');
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  await page.goto('http://localhost:4173/', { waitUntil: 'networkidle' });

  // Check Dock items order
  const dockLinks = await page.$$eval('.text-dock a', links => links.map(a => ({
    text: a.textContent.trim(),
    href: a.getAttribute('href')
  })));
  console.log('Desktop Dock Items:', JSON.stringify(dockLinks, null, 2));

  // Check Request distributor pricing button in header
  const distBtn = page.locator('a.header-distributor-btn');
  const isDistBtnVisible = await distBtn.isVisible();
  console.log('Distributor button visible in header:', isDistBtnVisible);
  if (isDistBtnVisible) {
    const text = await distBtn.textContent();
    console.log('Distributor button text:', text.trim());
  }

  // Screenshot header
  const header = page.locator('header.site-header');
  await header.screenshot({ path: 'audit/screenshots/distributor-header-desktop.png' });
  console.log('Saved audit/screenshots/distributor-header-desktop.png');

  // Click on Request distributor pricing button
  await distBtn.click();
  await page.waitForTimeout(500);
  console.log('Current URL after click:', page.url());

  // Verify elements on Distributor Page
  const h1Text = await page.locator('h1').textContent();
  console.log('H1 text:', h1Text.trim());

  // Capture full page screenshot of Distributor Page
  await page.screenshot({ path: 'audit/screenshots/distributor-page-full.png', fullPage: true });
  console.log('Saved audit/screenshots/distributor-page-full.png');

  // Test form filling
  console.log('2. Testing Distributor form interactions...');
  await page.fill('input[placeholder*="Prime Dental"]', 'Apex Dental Wholesale Ltd');
  await page.fill('input[placeholder*="Rajesh"]', 'Vikram Malhotra');
  await page.fill('input[placeholder*="Managing Director"]', 'Head of Procurement');
  await page.fill('input[placeholder*="purchases@"]', 'vikram@apexdental.in');
  await page.fill('input[placeholder*="+91"]', '+91 98450 12345');
  await page.fill('input[placeholder*="Bengaluru"]', 'Mumbai');
  await page.fill('input[placeholder*="Karnataka"]', 'Maharashtra & Gujarat');

  // Submit form
  await page.click('button[type="submit"]:has-text("Submit Distributor Pricing Request")');
  await page.waitForTimeout(1200);

  const confirmationVisible = await page.locator('text=Distributor Application Received').isVisible();
  console.log('Form confirmation visible:', confirmationVisible);
  if (confirmationVisible) {
    const refText = await page.locator('text=/SPARK-DIST-/').textContent();
    console.log('Reference ID generated:', refText.trim());
  }

  // Screenshot confirmation card
  await page.screenshot({ path: 'audit/screenshots/distributor-form-success.png' });
  console.log('Saved audit/screenshots/distributor-form-success.png');

  // 3. Mobile View Check
  console.log('3. Checking Mobile Nav Menu...');
  const mobilePage = await browser.newPage({ viewport: { width: 390, height: 844 } });
  await mobilePage.goto('http://localhost:4173/', { waitUntil: 'networkidle' });

  // Open mobile menu
  await mobilePage.click('button.menu-button');
  await mobilePage.waitForTimeout(400);

  const mobileLinks = await mobilePage.$$eval('.mobile-menu-links a', links => links.map(a => ({
    text: a.textContent.trim(),
    href: a.getAttribute('href')
  })));
  console.log('Mobile Menu Links:', JSON.stringify(mobileLinks, null, 2));

  await mobilePage.screenshot({ path: 'audit/screenshots/distributor-mobile-menu.png' });
  console.log('Saved audit/screenshots/distributor-mobile-menu.png');

  await browser.close();
  console.log('All distributor verifications completed successfully!');
}

main().catch(console.error);

