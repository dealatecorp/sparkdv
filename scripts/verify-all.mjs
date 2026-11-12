import { chromium } from 'playwright';
import fs from 'fs';

async function main() {
  const browser = await chromium.launch();
  const context = await browser.newContext({ viewport: { width: 1440, height: 900 } });
  const page = await context.newPage();

  const outDir = 'audit/screenshots';
  if (!fs.existsSync(outDir)) fs.mkdirSync(outDir, { recursive: true });

  console.log('Testing Home page...');
  await page.goto('http://localhost:4173/', { waitUntil: 'networkidle' });
  await page.screenshot({ path: `${outDir}/home-hero-and-logo.png` });

  // Scroll down to the product shelf just below the hero section
  console.log('Scrolling to product shelf on home screen...');
  const shelf = await page.$('#product-shelf');
  if (shelf) {
    await shelf.scrollIntoViewIfNeeded();
    await page.waitForTimeout(1000);
    await page.screenshot({ path: `${outDir}/home-product-shelf.png` });
  }

  console.log('Testing Blog / Science page...');
  await page.goto('http://localhost:4173/science', { waitUntil: 'networkidle' });
  await page.waitForTimeout(500);
  await page.screenshot({ path: `${outDir}/blog-page-top.png` });

  // Scroll to school program community section
  const comm = await page.$('.science-community-block');
  if (comm) {
    await comm.scrollIntoViewIfNeeded();
    await page.waitForTimeout(500);
    await page.screenshot({ path: `${outDir}/blog-school-program.png` });
  }

  console.log('Testing Checkout page with Demo Payment Gateway...');
  // Add an item to cart first by setting localStorage or navigating to product
  await page.evaluate(() => {
    localStorage.setItem('sparkdv_cart_v1', JSON.stringify([
      { slug: 'nanion-lite', name: 'Nanion Lite', price: 599, qty: 2 },
      { slug: 'nanion-swish', name: 'Nanion Swish Mouthwash', price: 449, qty: 1 }
    ]));
  });

  await page.goto('http://localhost:4173/checkout', { waitUntil: 'networkidle' });
  await page.waitForTimeout(800);
  await page.screenshot({ path: `${outDir}/checkout-demo-gateway.png` });

  // Switch to UPI tab
  const upiTab = await page.$('.gateway-tab:has-text("UPI")');
  if (upiTab) {
    await upiTab.click();
    const qrBtn = await page.$('.qr-toggle-btn');
    if (qrBtn) await qrBtn.click();
    await page.waitForTimeout(300);
    await page.screenshot({ path: `${outDir}/checkout-demo-upi-qr.png` });
  }

  // Click pay button to simulate payment
  const payBtn = await page.$('.demo-pay-button');
  if (payBtn) {
    await payBtn.click();
    console.log('Clicked Pay Now, waiting for simulated processing...');
    await page.waitForTimeout(2500);
    await page.screenshot({ path: `${outDir}/checkout-demo-success.png` });
  }

  await browser.close();
  console.log('All screenshots captured successfully!');
}

main().catch(console.error);
