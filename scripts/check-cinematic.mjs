import { chromium } from 'playwright';

async function check() {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  await page.goto('http://localhost:4173/about', { waitUntil: 'networkidle' });
  const titles = await page.$$eval('.cinematic-item-title', els => els.map(e => ({
    text: e.textContent.trim(),
    color: window.getComputedStyle(e).color,
    opacity: window.getComputedStyle(e).opacity,
    visibility: window.getComputedStyle(e).visibility
  })));
  console.log('Cinematic Titles:', titles);
  await browser.close();
}
check();

