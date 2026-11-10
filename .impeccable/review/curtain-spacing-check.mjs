import {chromium} from '@playwright/test';
const browser=await chromium.launch({channel:'chromium'});const page=await browser.newPage();const errors=[];page.on('pageerror',e=>errors.push(e.message));
for(const [name,width,height] of [['desktop',1440,900],['short-desktop',1366,768],['mobile',390,844],['narrow',320,740]]){
 await page.setViewportSize({width,height});await page.goto('http://127.0.0.1:5173',{waitUntil:'networkidle'});await page.waitForTimeout(3800);
 await page.getByRole('button',{name:'Pause headline'}).click();await page.waitForTimeout(900);
 for(const scroll of [0,350]){
  await page.evaluate(y=>window.scrollTo(0,y),scroll);await page.waitForTimeout(500);
  const measurements=await page.evaluate(()=>{const cards=[...document.querySelectorAll('.curtain-photo-card')].map(e=>e.getBoundingClientRect());let overlaps=0;for(let i=0;i<cards.length;i++)for(let j=i+1;j<cards.length;j++){const a=cards[i],b=cards[j];if(a.left<b.right&&a.right>b.left&&a.top<b.bottom&&a.bottom>b.top)overlaps++;}return {overlaps,overflow:document.documentElement.scrollWidth>innerWidth,inside:cards.every(r=>r.left>=0&&r.right<=innerWidth)}});
  console.log(JSON.stringify({name,scroll,...measurements}));
 }
 if(width>767){await page.mouse.move(width*.8,200);await page.waitForTimeout(600);const moved=await page.locator('.ssh-h').evaluate(e=>getComputedStyle(e).transform);await page.mouse.move(10,10);await page.waitForTimeout(1000);const reset=await page.locator('.ssh-h').evaluate(e=>getComputedStyle(e).transform);console.log({name,moved,reset});}
 await page.screenshot({path:`.impeccable/review/curtain-spaced-${name}.png`});
}
await page.emulateMedia({reducedMotion:'reduce'});console.log({reducedTransform:await page.locator('.ssh-h').evaluate(e=>getComputedStyle(e).transform),errors});await browser.close();
