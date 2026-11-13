import { chromium } from 'playwright';

async function main() {
  const browser = await chromium.launch();
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });

  console.log('Navigating to http://localhost:4173 ...');
  await page.goto('http://localhost:4173/', { waitUntil: 'networkidle' });
  await page.waitForTimeout(1000);

  // Scroll to testimonials
  const heading = page.locator('text=What Department Heads & Surgeons Say');
  await heading.scrollIntoViewIfNeeded();
  await page.waitForTimeout(1500);

  await page.screenshot({ path: 'audit/screenshots/home-testimonials-marquee.png' });
  console.log('Saved audit/screenshots/home-testimonials-marquee.png');

  // Verify cards and content
  const drMeenakshi = page.locator('text=Prof. Dr. Meenakshi S.').first();
  console.log('Meenakshi visible:', await drMeenakshi.isVisible());

  const pedoFile = page.locator('text=Pedo Spark 3-file system').first();
  console.log('Pedo file highlight visible:', await pedoFile.isVisible());

  // Check about page
  await page.goto('http://localhost:4173/about', { waitUntil: 'networkidle' });
  await page.waitForTimeout(1000);
  const whatWeBelieve = page.locator('text=WHAT WE BELIEVE');
  if (await whatWeBelieve.count() > 0) {
    await whatWeBelieve.scrollIntoViewIfNeeded();
    await page.waitForTimeout(800);
    await page.screenshot({ path: 'audit/screenshots/about-what-we-believe-check.png' });
    console.log('Saved audit/screenshots/about-what-we-believe-check.png');
  }

  // Check contact page
  await page.goto('http://localhost:4173/contact', { waitUntil: 'networkidle' });
  await page.waitForTimeout(1000);
  await page.screenshot({ path: 'audit/screenshots/contact-page-check.png' });
  console.log('Saved audit/screenshots/contact-page-check.png');

  // Check profile page
  await page.goto('http://localhost:4173/profile', { waitUntil: 'networkidle' });
  await page.waitForTimeout(1000);
  await page.screenshot({ path: 'audit/screenshots/profile-page-check.png' });
  console.log('Saved audit/screenshots/profile-page-check.png');

  await browser.close();
  console.log('Verification completed successfully!');
}

main().catch(err => {
  console.error(err);
  process.exit(1);
});

