import { chromium } from '@playwright/test';

const browser = await chromium.launch({ channel: 'chromium' });
const page = await browser.newPage({ viewport: { width: 1440, height: 1000 } });
const errors = [];
page.on('pageerror', error => errors.push(error.message));
page.on('console', message => { if (message.type() === 'error') errors.push(message.text()); });
await page.goto('http://127.0.0.1:5173/products', { waitUntil: 'networkidle' });
await page.screenshot({ path: '.impeccable/review/catalog-desktop-viewport.png' });
await page.screenshot({ path: '.impeccable/review/catalog-desktop.png', fullPage: true });
const desktop = await page.evaluate(() => ({
  viewport: [innerWidth, innerHeight],
  scrollWidth: document.documentElement.scrollWidth,
  layout: document.querySelector('.catalog-layout')?.getBoundingClientRect().toJSON(),
  sidebar: document.querySelector('.catalog-sidebar')?.getBoundingClientRect().toJSON(),
  cards: document.querySelectorAll('.commerce-product-grid .product-card').length,
  imageFit: getComputedStyle(document.querySelector('.commerce-product-grid .product-photo img')).objectFit,
  image: [...document.querySelectorAll('.commerce-product-grid .product-photo img')].slice(0, 3).map(img => ({ src: img.getAttribute('src'), loaded: img.complete && img.naturalWidth > 0, fit: getComputedStyle(img).objectFit, css: {width:getComputedStyle(img).width,height:getComputedStyle(img).height,maxWidth:getComputedStyle(img).maxWidth,maxHeight:getComputedStyle(img).maxHeight,position:getComputedStyle(img).position}, frame: img.parentElement.getBoundingClientRect().toJSON(), image: img.getBoundingClientRect().toJSON() }))
}));
await page.locator('.catalog-filter-options input[type=checkbox]').first().check();
await page.waitForTimeout(150);
const filterResult = await page.locator('.catalog-meta-row').innerText();
await page.screenshot({ path: '.impeccable/review/catalog-filtered-desktop.png', fullPage: true });

await page.setViewportSize({ width: 390, height: 844 });
await page.goto('http://127.0.0.1:5173/products', { waitUntil: 'networkidle' });
await page.screenshot({ path: '.impeccable/review/catalog-mobile-viewport.png' });
await page.screenshot({ path: '.impeccable/review/catalog-mobile.png', fullPage: true });
const mobile = await page.evaluate(() => ({
  viewport: [innerWidth, innerHeight],
  scrollWidth: document.documentElement.scrollWidth,
  sidebar: document.querySelector('.catalog-sidebar')?.getBoundingClientRect().toJSON(),
  summaryVisible: getComputedStyle(document.querySelector('.catalog-mobile-filter-toggle')).display !== 'none',
  filterPanelHidden: getComputedStyle(document.querySelector('.catalog-filter-content')).display === 'none',
  cardColumns: getComputedStyle(document.querySelector('.commerce-product-grid')).gridTemplateColumns,
  imageFit: getComputedStyle(document.querySelector('.commerce-product-grid .product-photo img')).objectFit,
}));
await page.locator('.catalog-mobile-filter-toggle').click();
mobile.filterPanelOpens = await page.locator('.catalog-sidebar').evaluate(node => node.dataset.open === 'true');
console.log(JSON.stringify({ desktop, filterResult, mobile, errors }, null, 2));
await browser.close();
