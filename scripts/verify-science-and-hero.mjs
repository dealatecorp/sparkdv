import { chromium } from 'playwright';

async function main() {
  const browser = await chromium.launch({ headless: true });

  console.log('--- 1. Testing Desktop Navigation for Science & Blogs ---');
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  await page.goto('http://localhost:4173/', { waitUntil: 'networkidle' });

  // Check Dock items
  const dockLinks = await page.$$eval('.text-dock a, .dock a', links => links.map(a => ({
    text: a.textContent.trim(),
    href: a.getAttribute('href')
  })));
  console.log('Dock links:', JSON.stringify(dockLinks, null, 2));

  // Verify Science and Blogs exist in dock
  const hasScienceInDock = dockLinks.some(l => l.href === '/science' && l.text === 'Science');
  const hasBlogsInDock = dockLinks.some(l => l.href === '/blogs' && l.text === 'Blogs');
  console.log('Science in Dock:', hasScienceInDock);
  console.log('Blogs in Dock:', hasBlogsInDock);

  // Take screenshot of header with new nav
  const header = page.locator('header.site-header');
  await header.screenshot({ path: 'audit/screenshots/header-with-science-blogs.png' });
  console.log('Saved audit/screenshots/header-with-science-blogs.png');

  console.log('--- 2. Testing Hero Auto-Scroll (Right to Left) ---');
  // Initial slide counter
  const counterText0 = await page.locator('.scroll-hero-slide-counter').textContent();
  console.log('Initial slide counter:', counterText0?.trim());
  await page.screenshot({ path: 'audit/screenshots/hero-slide-0.png' });
  console.log('Saved audit/screenshots/hero-slide-0.png');

  // Wait 3.6s for auto-scroll
  console.log('Waiting 3.6s for automatic horizontal scroll to next product...');
  await page.waitForTimeout(3600);

  const counterText1 = await page.locator('.scroll-hero-slide-counter').textContent();
  console.log('Slide counter after 3.6s:', counterText1?.trim());
  await page.screenshot({ path: 'audit/screenshots/hero-slide-1.png' });
  console.log('Saved audit/screenshots/hero-slide-1.png');

  // Wait another 3.4s
  console.log('Waiting 3.4s for next automatic horizontal scroll...');
  await page.waitForTimeout(3400);

  const counterText2 = await page.locator('.scroll-hero-slide-counter').textContent();
  console.log('Slide counter after another 3.4s:', counterText2?.trim());
  await page.screenshot({ path: 'audit/screenshots/hero-slide-2.png' });
  console.log('Saved audit/screenshots/hero-slide-2.png');

  console.log('--- 3. Testing Unimpeded Vertical Scrolling Down Home Page ---');
  // Scroll down with mouse wheel / window scroll
  await page.evaluate(() => window.scrollBy({ top: 800, behavior: 'instant' }));
  await page.waitForTimeout(500);

  const scrollY = await page.evaluate(() => window.scrollY);
  console.log('Current window.scrollY after scroll down:', scrollY);

  const authorityVisible = await page.locator('text=Setting the Clinical Gold Standard').isVisible();
  console.log('Authority Metrics Band visible after scrolling:', authorityVisible);
  await page.screenshot({ path: 'audit/screenshots/home-scrolled-past-hero.png' });
  console.log('Saved audit/screenshots/home-scrolled-past-hero.png');

  console.log('--- 4. Testing Science Page (/science) ---');
  await page.goto('http://localhost:4173/science', { waitUntil: 'networkidle' });
  await page.waitForTimeout(500);

  const scienceH1 = await page.locator('h1').textContent();
  console.log('Science Page H1:', scienceH1?.trim());

  // Click on Pillar 2 (Nano-HA)
  const pillar2Btn = page.locator('button:has-text("5% Nano-Hydroxyapatite")');
  await pillar2Btn.click();
  await page.waitForTimeout(300);

  const activePillarText = await page.locator('#mechanisms h3').textContent();
  console.log('Active Pillar Heading:', activePillarText?.trim());

  // Full page screenshot of Science Page
  await page.screenshot({ path: 'audit/screenshots/science-page-full.png', fullPage: true });
  console.log('Saved audit/screenshots/science-page-full.png');

  console.log('--- 5. Testing Blogs Page (/blogs) ---');
  await page.goto('http://localhost:4173/blogs', { waitUntil: 'networkidle' });
  await page.waitForTimeout(500);

  const blogsH1 = await page.locator('h1').textContent();
  console.log('Blogs Page H1:', blogsH1?.trim());

  await page.screenshot({ path: 'audit/screenshots/blogs-page-full.png' });
  console.log('Saved audit/screenshots/blogs-page-full.png');

  console.log('--- 6. Testing Mobile Menu ---');
  const mobilePage = await browser.newPage({ viewport: { width: 390, height: 844 } });
  await mobilePage.goto('http://localhost:4173/', { waitUntil: 'networkidle' });
  await mobilePage.click('button.menu-button');
  await mobilePage.waitForTimeout(400);

  const mobileLinks = await mobilePage.$$eval('.mobile-menu-links a', links => links.map(a => ({
    text: a.textContent.trim(),
    href: a.getAttribute('href')
  })));
  console.log('Mobile links:', JSON.stringify(mobileLinks, null, 2));
  await mobilePage.screenshot({ path: 'audit/screenshots/mobile-menu-verified.png' });
  console.log('Saved audit/screenshots/mobile-menu-verified.png');

  await browser.close();
  console.log('All verifications finished successfully!');
}

main().catch(err => {
  console.error(err);
  process.exit(1);
});

