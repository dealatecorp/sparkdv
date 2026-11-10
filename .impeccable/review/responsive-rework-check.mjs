import {chromium} from '@playwright/test';
import {products} from '../../src/data.js';
const browser=await chromium.launch({channel:'chromium'});const page=await browser.newPage({reducedMotion:'reduce'});const errors=[];page.on('pageerror',e=>errors.push(e.message));
await page.addInitScript(cart=>localStorage.setItem('spark-cart',JSON.stringify(cart)),[{...products[0],qty:1},{...products[4],qty:2}]);
const routes=['/','/products',...products.map(p=>'/products/'+p.slug),'/products/nanion-pro','/products/spark-files','/science','/science?article=antibacterial-action','/about','/contact','/parents','/dentists','/school-program','/cart','/checkout','/privacy','/terms','/shipping'];
const overflow=[];
for(const width of [320,390,768]){
 await page.setViewportSize({width,height:844});
 for(const route of routes){await page.goto('http://127.0.0.1:5173'+route,{waitUntil:'domcontentloaded'});await page.waitForTimeout(route==='/'?1000:120);const size=await page.evaluate(()=>({w:innerWidth,scroll:document.documentElement.scrollWidth}));if(size.scroll>width+1)overflow.push({width,route,...size});
 if(width===390&&['/','/products','/science','/about','/contact','/checkout'].includes(route))await page.screenshot({path:'.impeccable/review/rework-'+(route.slice(1)||'home')+'-mobile.png',fullPage:route==='/checkout'});
 }
}
await page.setViewportSize({width:390,height:844});await page.goto('http://127.0.0.1:5173/checkout',{waitUntil:'networkidle'});
await page.getByLabel('Full name',{exact:true}).fill('Test Customer');await page.getByLabel('Email',{exact:true}).fill('test@example.com');await page.getByLabel('Mobile number').fill('9999999999');await page.getByLabel('PIN code').fill('600001');await page.getByLabel('Address',{exact:true}).fill('12 Test Street');await page.getByLabel('City',{exact:true}).fill('Chennai');await page.getByLabel('State / union territory').fill('Tamil Nadu');await page.getByRole('button',{name:'Use this address'}).click();console.log({addressSaved:await page.locator('.checkout-address-review').isVisible(),emailEnabled:await page.getByRole('button',{name:'Prepare order email'}).isEnabled()});
await page.getByRole('button',{name:'Increase '+products[0].name,exact:true}).click();console.log({checkoutSubtotal:await page.locator('.checkout-total dd').innerText()});await page.screenshot({path:'.impeccable/review/rework-checkout-review-mobile.png',fullPage:true});
await page.getByRole('button',{name:'Open menu',exact:true}).click();await page.screenshot({path:'.impeccable/review/rework-menu-mobile.png'});await page.keyboard.press('Escape');console.log({escapeCloses:await page.getByRole('button',{name:'Open menu',exact:true}).isVisible()});await page.getByRole('button',{name:'Open menu',exact:true}).click();await page.locator('.mobile-menu-links').getByRole('link',{name:'Science'}).click();await page.locator('.journal-card').first().click();console.log({scienceArticle:await page.locator('.journal-body').isVisible()});
await page.goto('http://127.0.0.1:5173/about',{waitUntil:'networkidle'});await page.getByRole('button',{name:'Family care',exact:true}).click();console.log({aboutFrame:await page.getByRole('button',{name:'Family care',exact:true}).getAttribute('aria-expanded')});
await page.setViewportSize({width:1440,height:1000});for(const route of ['/about','/science','/checkout']){await page.goto('http://127.0.0.1:5173'+route,{waitUntil:'networkidle'});await page.screenshot({path:'.impeccable/review/rework-'+route.slice(1)+'-desktop.png',fullPage:false});}
console.log(JSON.stringify({overflow,errors}));await browser.close();
