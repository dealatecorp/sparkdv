import { chromium } from 'playwright';

async function main() {
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({ viewport: { width: 1440, height: 900 } });
  const page = await context.newPage();

  console.log('1. Checking Home page...');
  await page.goto('http://localhost:4173/', { waitUntil: 'networkidle' });
  await page.screenshot({ path: 'audit/screenshots/audit-home-top.png' });

  // Scroll down to check sections
  await page.evaluate(() => window.scrollBy(0, 1000));
  await page.waitForTimeout(500);
  await page.screenshot({ path: 'audit/screenshots/audit-home-carousel.png' });

  await page.evaluate(() => window.scrollBy(0, 1200));
  await page.waitForTimeout(500);
  await page.screenshot({ path: 'audit/screenshots/audit-home-mid2.png' });

  await page.evaluate(() => window.scrollBy(0, 1200));
  await page.waitForTimeout(500);
  await page.screenshot({ path: 'audit/screenshots/audit-home-testimonials.png' });

  console.log('2. Opening Chatbot...');
  const chatBtn = page.getByRole('button', { name: /Chat with SPARK-DV/i });
  if (await chatBtn.isVisible()) {
    await chatBtn.click();
    await page.waitForTimeout(600);
    await page.screenshot({ path: 'audit/screenshots/audit-chatbot-open.png' });

    const headerBtns = await page.$$eval('button[aria-label="Reset chat history"], button[aria-label="Close chat window"]', btns => {
      return btns.map(b => ({
        ariaLabel: b.getAttribute('aria-label'),
        bg: window.getComputedStyle(b).backgroundColor,
        color: window.getComputedStyle(b).color,
        svgColor: b.querySelector('svg') ? window.getComputedStyle(b.querySelector('svg')).color : null
      }));
    });
    console.log('Chat header buttons computed styles:', JSON.stringify(headerBtns, null, 2));
  } else {
    console.log('Chat button not found on Home!');
  }

  console.log('3. Checking Science/Blogs page...');
  await page.goto('http://localhost:4173/science', { waitUntil: 'networkidle' });
  await page.screenshot({ path: 'audit/screenshots/audit-blogs-page.png' });

  console.log('4. Checking Products catalog page...');
  await page.goto('http://localhost:4173/products', { waitUntil: 'networkidle' });
  await page.screenshot({ path: 'audit/screenshots/audit-catalog-page.png' });

  await browser.close();
  console.log('Visual audit finished successfully!');
}

main().catch(console.error);

