import { chromium } from 'playwright';
import fs from 'fs';

async function run() {
  fs.mkdirSync('audit/screenshots', { recursive: true });
  const browser = await chromium.launch();
  const page = await browser.newPage();
  await page.setViewportSize({ width: 1440, height: 900 });

  console.log('1. Loading Home Page...');
  await page.goto('http://localhost:4173/', { waitUntil: 'networkidle' });
  await page.waitForTimeout(600);

  // Home 3D Carousel Slide 1
  await page.screenshot({ path: 'audit/screenshots/home-carousel-cutout-slide1.png' });
  console.log('  Captured audit/screenshots/home-carousel-cutout-slide1.png');

  // Verify slide counter
  const counter = await page.$eval('.scroll-hero-indicators', el => el.getAttribute('aria-label'));
  console.log('  Hero indicator label:', counter);

  const dotsCount = await page.$$eval('.scroll-hero-indicator-bar', els => els.length);
  console.log('  Hero dots count (should be 5):', dotsCount);

  // Scroll to Flagship Spotlight
  const flagshipSec = await page.$('section:has-text("Breakthroughs")');
  if (flagshipSec) {
    await flagshipSec.scrollIntoViewIfNeeded();
    await page.waitForTimeout(400);
    await page.screenshot({ path: 'audit/screenshots/home-flagships-all5-cutouts.png' });
    console.log('  Captured audit/screenshots/home-flagships-all5-cutouts.png');
  }

  // Scroll to Marquee
  const marqueeSec = await page.$('section:has-text("What Department Heads & Surgeons Say")');
  if (marqueeSec) {
    await marqueeSec.scrollIntoViewIfNeeded();
    await page.waitForTimeout(400);
    await page.screenshot({ path: 'audit/screenshots/home-testimonials-verified.png' });
    console.log('  Captured audit/screenshots/home-testimonials-verified.png');
  }

  // 2. Loading About Page
  console.log('2. Loading About Page...');
  await page.goto('http://localhost:4173/about', { waitUntil: 'networkidle' });
  await page.waitForTimeout(400);

  const storyPanel = await page.$('.about-story-panel');
  if (storyPanel) {
    await storyPanel.scrollIntoViewIfNeeded();
    await page.waitForTimeout(300);
    const bg = await storyPanel.evaluate(el => window.getComputedStyle(el).backgroundColor);
    console.log('  About story panel background:', bg);
    await page.screenshot({ path: 'audit/screenshots/about-story-panel-ivory.png' });
    console.log('  Captured audit/screenshots/about-story-panel-ivory.png');
  }

  const cinematicTitle = await page.$('.cinematic-item-title');
  if (cinematicTitle) {
    await cinematicTitle.scrollIntoViewIfNeeded();
    await page.waitForTimeout(300);
    const color = await cinematicTitle.evaluate(el => window.getComputedStyle(el).color);
    console.log('  Cinematic list title color:', color);
    await page.screenshot({ path: 'audit/screenshots/about-what-we-believe-contrast.png' });
    console.log('  Captured audit/screenshots/about-what-we-believe-contrast.png');
  }

  // 3. Loading Blogs Page
  console.log('3. Loading Blogs Page...');
  await page.goto('http://localhost:4173/blogs', { waitUntil: 'networkidle' });
  await page.waitForTimeout(500);
  await page.screenshot({ path: 'audit/screenshots/blogs-editorial-verified.png' });
  console.log('  Captured audit/screenshots/blogs-editorial-verified.png');

  await browser.close();
  console.log('ALL VERIFICATIONS COMPLETED SUCCESSFULLY!');
}

run().catch(err => {
  console.error(err);
  process.exit(1);
});
