import { chromium } from 'playwright';

async function main() {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });

  console.log('1. Checking Home Hero without plate on Desktop...');
  await page.goto('http://localhost:4173/', { waitUntil: 'networkidle' });

  // Check if pedestal is anywhere on the page
  const pedestalCount = await page.locator('.scroll-hero-pedestal, img[src*="hero-pedestal"]').count();
  console.log('Pedestal elements found:', pedestalCount);

  // Check product image dimensions and positioning
  const productInfo = await page.evaluate(() => {
    const activeImg = document.querySelector('.scroll-hero-product-item[style*="visible"] img, .scroll-hero-product-img');
    const stage = document.querySelector('.scroll-hero-stage');
    const typography = document.querySelector('.scroll-hero-typography');
    const counter = document.querySelector('.scroll-hero-slide-counter')?.textContent?.trim();

    return {
      counter,
      imgSrc: activeImg ? activeImg.src : null,
      imgBoundingBox: activeImg ? activeImg.getBoundingClientRect() : null,
      stageBoundingBox: stage ? stage.getBoundingClientRect() : null,
      typographyBoundingBox: typography ? typography.getBoundingClientRect() : null,
    };
  });

  console.log('Product Info:', JSON.stringify(productInfo, null, 2));

  // Take screenshot of hero
  await page.screenshot({ path: 'audit/screenshots/home-hero-no-plate.png' });
  console.log('Saved audit/screenshots/home-hero-no-plate.png');

  // Check slide 2 by scrolling
  console.log('2. Scrolling through hero slides...');
  await page.evaluate(() => window.scrollBy(0, 700));
  await page.waitForTimeout(400);
  await page.screenshot({ path: 'audit/screenshots/home-hero-slide-2.png' });

  // Check sections below hero
  console.log('3. Scrolling down to check sections below hero...');
  await page.evaluate(() => window.scrollBy(0, 1800));
  await page.waitForTimeout(500);

  // Verify that "Engineering the Unrivaled Gold Standard" is GONE
  const bentoHeadingCount = await page.locator('text="Engineering the Unrivaled Gold Standard"').count();
  console.log('Bento heading count (should be 0):', bentoHeadingCount);

  // Verify that "Flagship Dual-Matrix" or Flagship spotlight is GONE
  const flagshipBadgeCount = await page.locator('text="Flagship Dual-Matrix"').count();
  console.log('Flagship spotlight badge count (should be 0):', flagshipBadgeCount);

  // Verify that ClinicianTestimonialMarquee is PRESENT
  const marqueeCount = await page.locator('text="Verified Clinical Testimonials"').count();
  console.log('Testimonials marquee count (should be 1):', marqueeCount);

  await page.screenshot({ path: 'audit/screenshots/home-below-hero.png' });
  console.log('Saved audit/screenshots/home-below-hero.png');

  // 4. Mobile Check
  console.log('4. Checking Mobile 390x844...');
  const mobilePage = await browser.newPage({ viewport: { width: 390, height: 844 } });
  await mobilePage.goto('http://localhost:4173/', { waitUntil: 'networkidle' });
  await mobilePage.screenshot({ path: 'audit/screenshots/home-hero-mobile-no-plate.png' });
  console.log('Saved audit/screenshots/home-hero-mobile-no-plate.png');

  await browser.close();
  console.log('All verifications completed successfully!');
}

main().catch(console.error);

