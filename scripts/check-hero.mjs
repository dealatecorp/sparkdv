import { chromium } from 'playwright';

async function test() {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  
  await page.goto('http://localhost:4173/', { waitUntil: 'networkidle' });

  const data = await page.evaluate(() => {
    const imgs = Array.from(document.querySelectorAll('.scroll-hero-product-img'));
    const counter = document.querySelector('.scroll-hero-indicator-container')?.textContent?.trim();
    const dots = document.querySelectorAll('.scroll-hero-indicators button').length;
    return {
      counter,
      totalDots: dots,
      imgs: imgs.map(i => ({
        src: i.src,
        naturalWidth: i.naturalWidth,
        naturalHeight: i.naturalHeight,
        complete: i.complete,
        visible: window.getComputedStyle(i).visibility
      }))
    };
  });

  console.log('Hero data:', JSON.stringify(data, null, 2));

  // Take screenshot of hero
  await page.screenshot({ path: 'audit/screenshots/hero-rendered-now.png' });
  console.log('Saved audit/screenshots/hero-rendered-now.png');

  await browser.close();
}

test().catch(console.error);
