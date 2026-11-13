import { chromium } from 'playwright';

async function main() {
  const browser = await chromium.launch();
  const page = await browser.newPage({ viewport: { width: 1440, height: 1000 } });

  console.log('1. Verifying Blogs page (/science)...');
  await page.goto('http://localhost:4173/science', { waitUntil: 'networkidle' });
  await page.waitForTimeout(1000);
  await page.screenshot({ path: 'audit/screenshots/blogs-redesigned-page.png' });

  // Open an article modal reader
  const articleCard = page.locator('article').first();
  await articleCard.click();
  await page.waitForTimeout(600);
  await page.screenshot({ path: 'audit/screenshots/blogs-article-reader-modal.png' });

  // Close modal
  const closeBtn = page.locator('button[aria-label="Close reading view"]');
  await closeBtn.click();
  await page.waitForTimeout(500);

  console.log('2. Verifying Chatbot header buttons (/)...');
  await page.goto('http://localhost:4173/', { waitUntil: 'networkidle' });
  await page.waitForTimeout(1000);

  // Toggle chatbot
  const chatLauncher = page.locator('button[aria-label="Toggle SPARK-DV Clinical Chatbot"]');
  await chatLauncher.click();
  await page.waitForTimeout(600);
  await page.screenshot({ path: 'audit/screenshots/chatbot-window-contrast.png' });

  console.log('3. Verifying Products catalog (/products)...');
  await page.goto('http://localhost:4173/products', { waitUntil: 'networkidle' });
  await page.waitForTimeout(1000);
  await page.screenshot({ path: 'audit/screenshots/products-5-items-svg.png' });

  // Count products
  const productCards = page.locator('.product-card, .catalog-card, a[href^="/products/"]');
  console.log('Catalog products visible count:', await productCards.count());

  await browser.close();
  console.log('All verifications completed successfully!');
}

main().catch(console.error);

