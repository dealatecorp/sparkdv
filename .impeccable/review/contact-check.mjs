import { chromium } from '@playwright/test';

const browser = await chromium.launch({ channel: 'chromium' });
const page = await browser.newPage({ viewport: { width: 1440, height: 1000 } });
const errors = [];
page.on('pageerror', error => errors.push(error.message));
page.on('console', message => { if (message.type() === 'error') errors.push(message.text()); });
await page.goto('http://127.0.0.1:5173/contact?type=Professional%20pricing', { waitUntil: 'networkidle' });
await page.screenshot({ path: '.impeccable/review/contact-desktop.png', fullPage: true });
const desktop = await page.evaluate(() => ({
  viewport: [innerWidth, innerHeight],
  scrollWidth: document.documentElement.scrollWidth,
  nav: [...document.querySelectorAll('.site-header nav a')].map(a => a.textContent.trim()),
  formType: document.querySelector('.enquiry-form select[name="Enquiry"]')?.value,
  layout: document.querySelector('.contact-ui-grid')?.getBoundingClientRect().toJSON(),
  bubbles: document.querySelectorAll('.contact-bubbles span').length,
}));
await page.getByRole('button', { name: 'Clinical enquiry' }).click();
const selectedType = await page.locator('.enquiry-form select[name="Enquiry"]').inputValue();
await page.setViewportSize({ width: 390, height: 844 });
await page.goto('http://127.0.0.1:5173/contact', { waitUntil: 'networkidle' });
await page.screenshot({ path: '.impeccable/review/contact-mobile.png', fullPage: true });
const mobile = await page.evaluate(() => ({ viewport: [innerWidth, innerHeight], scrollWidth: document.documentElement.scrollWidth, form: document.querySelector('.enquiry-form')?.getBoundingClientRect().toJSON() }));
console.log(JSON.stringify({ desktop, selectedType, mobile, errors }, null, 2));
await browser.close();
