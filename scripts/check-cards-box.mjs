import { chromium } from 'playwright';

async function main() {
  const browser = await chromium.launch();
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  await page.goto('http://localhost:4173/distributor');
  
  const section = page.locator('section:has-text("Distributor Commercial Tiers")');
  const sBox = await section.boundingBox();
  const cards = await page.$$eval('.grid > div', els => els.map(el => {
    const r = el.getBoundingClientRect();
    return { top: r.top, bottom: r.bottom, height: r.height };
  }));
  console.log('Section box:', sBox);
  console.log('Cards boxes:', cards);

  // Also check the button in Card 2
  const btn2 = page.locator('a:has-text("Select District Protected")');
  const bBox = await btn2.boundingBox();
  console.log('Btn 2 box:', bBox);

  await browser.close();
}

main().catch(console.error);

