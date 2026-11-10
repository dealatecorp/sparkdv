import { chromium, expect } from '@playwright/test';
import fs from 'node:fs/promises';
const base = process.env.ABOUT_TEST_URL || 'http://127.0.0.1:5174';
const dir = 'motion/prs-about/frames';
await fs.mkdir(dir,{recursive:true});
const browser = await chromium.launch();
const page = await browser.newPage();
const errors=[];
page.on('pageerror',error=>errors.push(error.message));
const results=[];
try {
  for (const width of [320,390,768,1440,1920]) {
    await page.setViewportSize({width,height:width<768?844:1000});
    await page.goto(`${base}/about`,{waitUntil:'networkidle'});
    for (const phase of [0,.4,.85,.4,0]) {
      await page.evaluate(phase=>{const s=document.querySelector('.about-manifesto');scrollTo({top:s.offsetTop-88+(s.offsetHeight-innerHeight+88)*phase,behavior:'instant'});},phase);
      await page.waitForTimeout(750);
      const index=phase<.18?0:phase<.62?1:2;
      const inFrame=await page.locator('.about-statement-line').nth(index).evaluate(e=>{const r=e.getBoundingClientRect(),p=e.parentElement.getBoundingClientRect();return Math.abs(r.top-p.top)<2&&r.bottom<=p.bottom+2});
      expect(inFrame,`Statement ${index} is in frame at ${width}px`).toBe(true);
      if(phase===.4&&[390,1440,1920].includes(width)) await page.screenshot({path:`${dir}/final-${width}-statement.png`});
    }
    await page.getByRole('button',{name:'Patient-centered',exact:true}).click();
    await expect(page.getByRole('button',{name:'Patient-centered',exact:true})).toHaveAttribute('aria-expanded','true');
    await expect(page.locator('#about-value-panel-1')).toBeVisible();
    await page.getByRole('button',{name:'Patient-centered',exact:true}).click();
    await expect(page.locator('#about-value-panel-1')).toBeHidden();
    await page.getByRole('button',{name:'Science-led',exact:true}).focus();
    await page.keyboard.press('Enter');
    await expect(page.locator('#about-value-panel-0')).toBeVisible();
    await page.locator('.about-founder-details summary').click();
    await expect(page.locator('.about-founder-details')).toHaveAttribute('open','');
    await page.locator('.about-founder-details summary').click();
    for (const section of ['founder-section','collage-section','values-panel','community-section']) {
      const el=page.locator(`.about-${section}`);
      await el.evaluate(e=>scrollTo({top:e.getBoundingClientRect().top+scrollY-110,behavior:'instant'}));
      await page.waitForTimeout(section==='collage-section'?1800:100);
      expect(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth),`No overflow ${width}/${section}`).toBe(true);
      if([390,1440].includes(width)) await page.screenshot({path:`${dir}/final-${width}-${section}.png`});
    }
    expect(await page.locator('.spark-about img').evaluateAll(es=>es.every(e=>e.complete&&e.naturalWidth>0))).toBe(true);
    results.push({width,statementsForwardAndReverse:'pass',accordionMouseAndKeyboard:'pass',founderDetails:'pass',overflow:false,images:'loaded'});
  }
  await page.emulateMedia({reducedMotion:'reduce'});
  await page.setViewportSize({width:390,height:844});
  await page.goto(`${base}/about`,{waitUntil:'networkidle'});
  const staticLines=await page.locator('.about-statement-line').evaluateAll(es=>es.every(e=>getComputedStyle(e).transform==='none'));
  expect(staticLines).toBe(true);
  expect(await page.locator('.about-manifesto-stage').evaluate(e=>getComputedStyle(e).position)).toBe('relative');
  await page.screenshot({path:`${dir}/final-reduced-motion.png`});
  // SPA navigation must remove About-specific styles and scroll effects.
  await page.locator('.about-hero-shop').click();
  await expect(page).toHaveURL(/\/products$/);
  await expect(page.locator('.spark-about')).toHaveCount(0);
  expect(errors).toEqual([]);
  await fs.writeFile('motion/prs-about/checks.json',JSON.stringify({results,reducedMotion:'pass',navigation:'pass',consoleErrors:errors},null,2));
  console.log(JSON.stringify({results,reducedMotion:'pass',navigation:'pass',consoleErrors:errors},null,2));
} finally {await browser.close();}
