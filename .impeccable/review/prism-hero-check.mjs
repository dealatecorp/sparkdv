import { chromium } from '@playwright/test';
const browser = await chromium.launch({ channel: 'chromium' });
const page = await browser.newPage({ viewport: {width:1440,height:900} });
const errors = [];
page.on('pageerror', e => errors.push(e.message));
page.on('console', m => { if (m.type() === 'error') errors.push(m.text()); });
await page.goto('http://127.0.0.1:5173', {waitUntil:'networkidle'});
await page.locator('[data-testid="landing-reveal"]').waitFor({state:'detached',timeout:9000});
await page.waitForTimeout(1700);
const prism = await page.evaluate(() => ({
  title: document.querySelector('.shop-prism-hero h1')?.textContent,
  canvas: document.querySelector('.shop-prism-hero canvas')?.getBoundingClientRect().toJSON(),
  resolution: [document.querySelector('.shop-prism-hero canvas')?.width,document.querySelector('.shop-prism-hero canvas')?.height],
  heroHeight: document.querySelector('.shop-prism-hero')?.getBoundingClientRect().height,
  shopRange: document.body.innerText.includes('Shop the range'),
  productHeroImmediatelyAfterPrism: document.querySelector('.shop-prism-hero')?.nextElementSibling?.id === 'featured-products'
}));
await page.screenshot({path:'.impeccable/review/prism-desktop.png'});
await page.locator('#featured-products').scrollIntoViewIfNeeded();
await page.getByRole('button',{name:'Previous product'}).click();
await page.waitForTimeout(500);
await page.screenshot({path:'.impeccable/review/product-after-prism-desktop.png'});
const desktopImage = await page.evaluate(() => {
  const stage=document.querySelector('.brand-product-hero .snp-stage');
  const image=[...document.querySelectorAll('.brand-product-hero .snp-shoe:not(.snp-reflect):not(.snp-sheen)')].find(e=>getComputedStyle(e).visibility==='visible');
  return {stage:stage?.getBoundingClientRect().toJSON(),image:image?.getBoundingClientRect().toJSON(),source:image?.getAttribute('src')};
});
await page.setViewportSize({width:390,height:844});
await page.goto('http://127.0.0.1:5173',{waitUntil:'networkidle'});
await page.locator('[data-testid="landing-reveal"]').waitFor({state:'detached',timeout:9000});
await page.waitForTimeout(1600);
await page.evaluate(()=>{history.scrollRestoration='manual';document.scrollingElement.scrollTop=0});
await page.screenshot({path:'.impeccable/review/prism-mobile.png'});
const mobilePrism=await page.evaluate(()=>({resolution:[document.querySelector('.shop-prism-hero canvas')?.width,document.querySelector('.shop-prism-hero canvas')?.height], viewport:[innerWidth,innerHeight], scrollWidth:document.documentElement.scrollWidth}));
await page.locator('#featured-products').scrollIntoViewIfNeeded();
await page.getByRole('button',{name:'Previous product'}).click();
await page.waitForTimeout(400);
await page.screenshot({path:'.impeccable/review/product-after-prism-mobile.png'});
const mobileProduct=await page.evaluate(()=>({viewport:[innerWidth,innerHeight],scrollWidth:document.documentElement.scrollWidth,image:document.querySelector('.brand-product-hero .snp-stage')?.getBoundingClientRect().toJSON(),hero:document.querySelector('.brand-product-hero')?.getBoundingClientRect().toJSON()}));
console.log(JSON.stringify({prism,desktopImage,mobilePrism,mobileProduct,errors},null,2));
await browser.close();
