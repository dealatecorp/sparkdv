import { chromium } from 'playwright';

async function main() {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  
  await page.goto('http://localhost:4173/', { waitUntil: 'networkidle' });

  // Locate chatbot toggle button
  const toggle = page.locator('button[aria-label="Toggle SPARK-DV Clinical Chatbot"]');
  console.log('Toggle count:', await toggle.count());
  if (await toggle.count() > 0) {
    await toggle.click();
    await page.waitForTimeout(600);
    await page.screenshot({ path: 'audit/screenshots/chatbot-opened-exact.png' });
    console.log('Captured chatbot-opened-exact.png');

    const styles = await page.$$eval('button[aria-label="Reset chat history"], button[aria-label="Close chat window"]', btns => {
      return btns.map(b => ({
        label: b.getAttribute('aria-label'),
        bg: window.getComputedStyle(b).backgroundColor,
        color: window.getComputedStyle(b).color,
        svgStroke: b.querySelector('svg')?.getAttribute('stroke'),
        svgColor: b.querySelector('svg') ? window.getComputedStyle(b.querySelector('svg')).color : null
      }));
    });
    console.log('Button styles:', styles);
  }

  // Go to /science
  await page.goto('http://localhost:4173/science', { waitUntil: 'networkidle' });
  await page.screenshot({ path: 'audit/screenshots/science-page-full.png', fullPage: true });
  console.log('Captured science-page-full.png');

  // Go to /products
  await page.goto('http://localhost:4173/products', { waitUntil: 'networkidle' });
  await page.screenshot({ path: 'audit/screenshots/products-page-full.png', fullPage: true });
  console.log('Captured products-page-full.png');

  // Go to /contact
  await page.goto('http://localhost:4173/contact', { waitUntil: 'networkidle' });
  await page.screenshot({ path: 'audit/screenshots/contact-page-full.png', fullPage: true });
  console.log('Captured contact-page-full.png');

  await browser.close();
}

main().catch(console.error);

