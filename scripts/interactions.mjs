import { randomInt, randomUUID } from 'node:crypto';
import { chromium, expect } from '@playwright/test';

const browser = await chromium.launch({ channel: 'chromium' });
const baseURL = process.env.BROWSER_QA_URL ?? 'http://127.0.0.1:5173';
const desktop = await browser.newPage({ baseURL, viewport: { width: 1440, height: 960 }, reducedMotion: 'reduce' });
const errors = [];
desktop.on('pageerror', error => errors.push(error.message));

try {
  const visit = (path) => desktop.goto(path, { waitUntil: 'domcontentloaded' });
  await visit('/');
  const slide = desktop.getByRole('button', { name: /^Slide 2 of/ });
  await slide.press('Enter');
  await expect(slide).toHaveAttribute('aria-pressed', 'true');
  await expect(slide).toBeFocused();

  await visit('/products');
  await desktop.getByRole('textbox', { name: 'Search products' }).fill('no-such-product');
  await expect(desktop.getByRole('heading', { name: 'No products found' })).toBeVisible();
  await desktop.getByRole('button', { name: 'Clear all filters' }).click();
  await desktop.getByRole('link', { name: 'Professional pricing', exact: true }).click();
  const message = desktop.getByRole('textbox', { name: /Detailed Requirements/ });
  await expect(message).toHaveValue('Enquiry: Professional pricing');
  await message.fill('Please include a price list for A & B.');
  const topics = [
    'Request Clinic Sample Kit',
    'Chairside Non-Staining NSF IFU',
    'Pediatric Enamel Sensitivity Protocol',
    'Doctor Professional Discounts',
  ];
  for (const topic of topics) {
    const button = desktop.getByRole('button', { name: topic });
    await button.hover();
    await expect(button).toHaveCSS('background-color', 'rgb(7, 55, 99)');
    await expect(button).toHaveCSS('color', 'rgb(255, 255, 255)');
    await button.click();
    await expect(message).toBeFocused();
    await expect(message).toHaveValue(new RegExp(topic));
    await expect(button).toHaveAttribute('aria-pressed', 'true');
    await button.hover();
    await expect(button).toHaveCSS('background-color', 'rgb(7, 55, 99)');
    await expect(button).toHaveCSS('color', 'rgb(255, 255, 255)');
  }
  await desktop.getByRole('button', { name: topics[2] }).click();
  await expect(message).not.toHaveValue(new RegExp(topics[2]));
  await expect(message).toHaveValue(/Please include a price list for A & B/);

  const prepareContact = desktop.getByRole('button', { name: 'Prepare enquiry email' });
  const draft = desktop.getByRole('link', { name: 'Open email draft' });
  await prepareContact.click();
  await expect(desktop.getByLabel(/Full name/i)).toBeFocused();
  await expect(draft).toHaveCount(0);
  await desktop.getByLabel(/Full name/i).fill('Contact QA');
  await desktop.getByRole('textbox', { name: 'Email Address *', exact: true }).fill('contact@example.com');
  await desktop.getByLabel(/Phone \/ WhatsApp/).fill('+91 99999 99999');
  await prepareContact.click();
  const contactEmail = new URL(await draft.getAttribute('href'));
  expect(contactEmail.protocol).toBe('mailto:');
  expect(contactEmail.searchParams.get('subject')).toBe('Professional pricing');
  expect(contactEmail.searchParams.get('body')).toContain('Please include a price list for A & B.');
  await message.fill('Revised enquiry');
  await expect(draft).toHaveCount(0);

  await visit('/products/nanion-lite');
  await desktop.getByRole('link', { name: 'Ask a clinical specialist' }).click();
  await expect(message).toHaveValue(/Enquiry: Clinical enquiry\nProduct: Nanion Lite/);
  await visit('/products/pobtura');
  await expect(desktop.getByRole('heading', { level: 1, name: 'P-Obtura Bio-Activ' })).toBeVisible();
  await desktop.getByRole('link', { name: 'Ask a clinical specialist' }).click();
  await expect(message).toHaveValue(/Product: P-Obtura Bio-Activ/);
  await visit('/contact?type=Distributor%20enquiry&product=Nanion%20Lite');
  await expect(desktop.getByRole('button', { name: 'Distribution Partners' })).toHaveAttribute('aria-pressed', 'true');
  await expect(message).toHaveValue(/Enquiry: Distributor enquiry\nProduct: Nanion Lite/);

  await visit('/science');
  await desktop.getByRole('link', { name: /^Request Clinical Practice Monograph/ }).click();
  await expect(message).toHaveValue(/Enquiry: Whitepaper request\nResource: Clinical Practice Monograph/);

  await visit('/distributor');
  const volumes = ['100 – 500 units/mo', '500 – 2,500 units/mo', '2,500 – 10,000 units/mo', '10,000+ units/mo'];
  const tiers = desktop.getByRole('link', { name: /^Select / });
  await expect(tiers).toHaveCount(volumes.length);
  for (const [index, volume] of volumes.entries()) {
    await tiers.nth(index).click();
    await expect(desktop.getByLabel('Projected Monthly Volume')).toHaveValue(volume);
  }
  const distributorFields = [
    [/Company \/ Dental Depot Legal Name/, 'QA Dental'],
    [/Authorized Contact Person/, 'QA Member'],
    [/Designation \/ Role/, 'Procurement'],
    [/Business Email Address/, 'distribution@example.com'],
    [/Direct Mobile \/ WhatsApp/, '+91 99999 99999'],
    [/City \/ Headquarters/, 'Hyderabad'],
    [/Target State \/ Territory/, 'Telangana'],
  ];
  for (const [label, value] of distributorFields) await desktop.getByLabel(label).fill(value);
  await desktop.getByRole('button', { name: 'Prepare pricing request' }).click();
  const distributorEmail = new URL(await draft.getAttribute('href'));
  expect(distributorEmail.searchParams.get('body')).toContain('Monthly volume: 10,000+ units/mo');

  await visit('/products/nanion-lite');
  await desktop.getByRole('button', { name: 'Add to cart', exact: true }).click();
  await expect(desktop.getByRole('button', { name: 'Open cart, 1 items' })).toBeVisible();
  await desktop.getByRole('button', { name: 'Continue to checkout' }).click();
  await expect(desktop).toHaveURL(/\/checkout$/);
  await desktop.getByRole('button', { name: 'Increase Nanion Lite' }).click();
  await desktop.getByRole('link', { name: 'Sign in to place order' }).click();
  await desktop.getByRole('link', { name: 'Create an account' }).click();
  await desktop.getByLabel('Full name').fill('Storefront QA');
  await desktop.getByLabel('Email', { exact: true }).fill(`order-qa-${randomUUID()}@example.com`);
  await desktop.getByLabel('Mobile number', { exact: true }).fill(`+120255501${String(randomInt(100)).padStart(2, '0')}`);
  await desktop.getByLabel('Password', { exact: true }).fill(randomUUID());
  await desktop.getByRole('button', { name: 'Create an account', exact: true }).click();
  await expect(desktop).toHaveURL(/\/checkout$/);
  await desktop.context().route('https://wa.me/**', route => route.fulfill({ body: 'WhatsApp handoff captured' }));
  const [chat] = await Promise.all([
    desktop.waitForEvent('popup'),
    desktop.getByRole('button', { name: 'Place order & open WhatsApp' }).click(),
  ]);
  await expect(desktop).toHaveURL(/\/orders\/[a-f0-9-]{36}$/);
  const whatsapp = desktop.getByRole('link', { name: 'Open WhatsApp draft' });
  const whatsappUrl = new URL(await whatsapp.getAttribute('href'));
  expect(whatsappUrl.origin + whatsappUrl.pathname).toBe('https://wa.me/917981546939');
  expect(whatsappUrl.searchParams.get('text')).toContain('Nanion Lite · 2% NSF');
  expect(whatsappUrl.searchParams.get('text')).toContain('Quantity: 2 · ₹599 each · ₹1,198');
  expect(whatsappUrl.searchParams.get('text')).toMatch(/Photo: https?:\/\/[^\s]+\/images\/nanion-lite\.png/);
  expect(whatsappUrl.searchParams.get('text')).toContain('Product subtotal: ₹1,198');
  await expect(desktop.getByText(/Demo Payment Gateway/i)).toHaveCount(0);

  await expect(chat).toHaveURL(whatsappUrl.href);
  await expect(chat.getByText('WhatsApp handoff captured')).toBeVisible();
  await chat.close();
  await expect(desktop.getByRole('button', { name: 'Open cart, 0 items' })).toBeVisible();
  await expect(desktop.getByRole('heading', { name: 'Order placed', exact: true })).toBeVisible();
  await desktop.getByRole('link', { name: 'My orders', exact: true }).click();
  await expect(desktop.getByRole('link', { name: /Nanion Lite.*Track order/ })).toBeVisible();
  await visit('/checkout');
  await expect(desktop.getByRole('heading', { name: 'Your cart is empty' })).toBeVisible();
  await expect(whatsapp).toHaveCount(0);

  const mobile = await browser.newPage({ baseURL, viewport: { width: 390, height: 844 }, isMobile: true, hasTouch: true, reducedMotion: 'reduce' });
  mobile.on('pageerror', error => errors.push(error.message));
  await mobile.goto('/products', { waitUntil: 'domcontentloaded' });
  await mobile.getByRole('button', { name: 'Open menu', exact: true }).tap();
  await mobile.locator('.nav.open').getByRole('link', { name: 'Contact', exact: true }).tap();
  await expect(mobile).toHaveURL(/\/contact$/);
  await mobile.getByRole('button', { name: topics[2] }).tap();
  await expect(mobile.getByRole('textbox', { name: /Detailed Requirements/ })).toBeFocused();
  await expect(mobile.getByRole('textbox', { name: /Detailed Requirements/ })).toHaveValue(new RegExp(topics[2]));
  expect(await mobile.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
  expect(errors).toEqual([]);
  console.log('Passed contact topics, distributor tiers, email drafts, WhatsApp checkout, keyboard focus and mobile touch.');
} finally {
  await browser.close();
}
