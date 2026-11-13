import { chromium } from 'playwright';

async function test() {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.goto('http://localhost:4173/', { waitUntil: 'networkidle' });
  const count = await page.$$eval('.scroll-hero-dot', els => els.length);
  console.log('Hero dots count:', count);
  const text = await page.$eval('.scroll-hero-typography', el => el.textContent.trim());
  console.log('Hero typography:', text);
  await browser.close();
}
test();

