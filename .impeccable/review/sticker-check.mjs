import { chromium } from '@playwright/test';
const browser=await chromium.launch({channel:'chromium'});
const page=await browser.newPage();const errors=[];page.on('pageerror',e=>errors.push(e.message));
for(const [name,width,height] of [['desktop',1440,900],['mobile',390,844]]){
 await page.setViewportSize({width,height});await page.goto('http://127.0.0.1:5173',{waitUntil:'networkidle'});await page.waitForTimeout(4000);
 await page.getByRole('button',{name:'Pause headline'}).click();await page.waitForTimeout(1200);await page.screenshot({path:`.impeccable/review/sticker-${name}.png`});
 const before=await page.locator('.ssh-word:not(.is-out)').getAttribute('aria-label');await page.locator('.ssh-word:not(.is-out)').click();await page.waitForTimeout(1200);
 const after=await page.locator('.ssh-word:not(.is-out)').getAttribute('aria-label');
 await page.evaluate(()=>window.scrollTo(0,350));await page.waitForTimeout(700);await page.screenshot({path:`.impeccable/review/sticker-${name}-curtain.png`});
 console.log(JSON.stringify({name,before,after,prism:await page.locator('.shop-prism-hero').count(),photos:await page.locator('.curtain-photo-card').count(),overflow:await page.evaluate(()=>document.documentElement.scrollWidth>innerWidth)}));
}
console.log({errors});await browser.close();
