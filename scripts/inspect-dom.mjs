import { chromium } from 'playwright';

async function check() {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  page.on('console', msg => console.log('PAGE LOG:', msg.text()));
  page.on('pageerror', err => console.log('PAGE ERROR:', err.message));
  await page.goto('http://localhost:4173/', { waitUntil: 'networkidle' });
  const rootHtml = await page.$eval('#root', el => el.innerHTML.slice(0, 1500));
  console.log('Root HTML length:', rootHtml.length);
  console.log('Root HTML:', rootHtml);
  await browser.close();
}
check();
