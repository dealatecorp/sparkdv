import { chromium } from 'playwright';

async function main() {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  await page.goto('http://localhost:4173/science', { waitUntil: 'networkidle' });

  // Check chat button position relative to content
  const chatBox = await page.locator('button[aria-label="Toggle SPARK-DV Clinical Chatbot"]').boundingBox();
  console.log('Chat button bounding box:', chatBox);

  // Check read article links
  const links = await page.locator('a:has-text("Read article")').all();
  for (let i = 0; i < links.length; i++) {
    const box = await links[i].boundingBox();
    console.log(`Link ${i} box:`, box);
    if (chatBox && box) {
      const overlap = !(chatBox.x + chatBox.width < box.x ||
                        box.x + box.width < chatBox.x ||
                        chatBox.y + chatBox.height < box.y ||
                        box.y + box.height < chatBox.y);
      console.log(`Link ${i} overlaps chat button:`, overlap);
    }
  }

  await browser.close();
}

main().catch(console.error);

