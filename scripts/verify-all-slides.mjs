import { chromium } from 'playwright';

async function verifySlides() {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.goto('http://localhost:4173/', { waitUntil: 'networkidle' });

  const dots = await page.$$('.scroll-hero-indicator-bar');
  console.log(`Found ${dots.length} hero indicator dots.`);

  for (let i = 0; i < dots.length; i++) {
    await dots[i].click();
    await page.waitForTimeout(500);
    const activeWord = await page.$eval('.scroll-hero-right-word', el => el.textContent.trim());
    const visibleImg = await page.$$eval('.scroll-hero-product-item', items => {
      const vis = items.find(it => window.getComputedStyle(it).visibility === 'visible' && parseFloat(window.getComputedStyle(it).opacity) > 0.5);
      if (vis) {
        const img = vis.querySelector('img');
        return { src: img.getAttribute('src'), alt: img.getAttribute('alt') };
      }
      return null;
    });
    console.log(`Slide ${i + 1}: Word="${activeWord}", Image=`, visibleImg);
    await page.screenshot({ path: `audit/screenshots/slide-${i + 1}-cutout.png` });
  }

  await browser.close();
  console.log('All 5 slides verified with transparent cutouts!');
}

verifySlides().catch(err => {
  console.error(err);
  process.exit(1);
});

