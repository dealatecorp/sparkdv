import { randomInt, randomUUID } from 'node:crypto';
import { chromium, expect } from '@playwright/test';

const storefront = new URL(process.env.AUTH_QA_URL ?? 'http://localhost:5173');
if (!['localhost', '127.0.0.1'].includes(storefront.hostname)) throw new Error('Use a local test instance.');

const email = `sparkdv-${randomUUID()}@example.com`;
const mobile = `9${randomInt(100000000, 1000000000)}`;
const password = 'Sparkdv-Local-QA-582';
const newPassword = 'Sparkdv-Local-QA-734';
const browser = await chromium.launch({ channel: 'chromium' });

try {
  const context = await browser.newContext({ baseURL: storefront.origin, viewport: { width: 390, height: 844 }, reducedMotion: 'reduce' });
  const page = await context.newPage();
  const visit = path => page.goto(path, { waitUntil: 'domcontentloaded' });
  const accountHeading = page.getByRole('heading', { name: 'Spark-DV QA Member', exact: true });
  const signIn = async (secret, identifier = email) => {
    await page.getByLabel('Email or mobile number', { exact: true }).fill(identifier);
    await page.getByLabel('Password', { exact: true }).fill(secret);
    await page.getByRole('button', { name: 'Sign in', exact: true }).click();
  };

  await visit('/profile');
  await expect(page).toHaveURL(/\/login$/);
  await page.getByRole('link', { name: 'Create an account' }).click();
  await page.getByLabel('Full name').fill('Spark-DV QA Member');
  await page.getByLabel('Email', { exact: true }).fill(email.toUpperCase());
  await page.getByLabel('Mobile number', { exact: true }).fill(`+91 ${mobile}`);
  await page.getByLabel('Password', { exact: true }).fill(password);
  await page.getByRole('button', { name: 'Create an account', exact: true }).click();
  await expect(page).toHaveURL(/\/profile$/);
  await expect(accountHeading).toBeVisible();
  await expect(page.getByText(email, { exact: true })).toBeVisible();
  await expect(page.getByText(`+91${mobile}`, { exact: true })).toBeVisible();

  const cookie = (await context.cookies()).find(({ name }) => name === 'sparkdv_session');
  expect(cookie.httpOnly).toBe(true);
  expect(cookie.sameSite).toBe('Lax');
  expect(cookie.value.split('.')).toHaveLength(3);
  expect(await page.evaluate(() => document.cookie)).not.toContain('sparkdv_session');
  await page.reload({ waitUntil: 'domcontentloaded' });
  await expect(accountHeading).toBeVisible();

  const secondTab = await context.newPage();
  await secondTab.goto('/account', { waitUntil: 'domcontentloaded' });
  await expect(secondTab.getByRole('heading', { name: 'Spark-DV QA Member' })).toBeVisible();
  await page.getByRole('button', { name: 'Sign out' }).click();
  await expect(page).toHaveURL(/\/login$/);
  await expect(secondTab).toHaveURL(/\/login$/);
  await secondTab.close();
  const ended = await fetch(new URL('/api/auth', storefront), { headers: { Cookie: `${cookie.name}=${cookie.value}` } });
  expect(await ended.json()).toEqual({ user: null });

  await signIn('incorrect-password');
  await expect(page.getByRole('alert')).toContainText('The email, mobile number, or password is incorrect.');
  await signIn(password, mobile);
  await expect(accountHeading).toBeVisible();
  await page.getByRole('link', { name: 'Change password' }).click();
  await page.getByLabel('Current password').fill(password);
  await page.getByLabel('New password').fill(newPassword);
  await page.getByRole('button', { name: 'Save password' }).click();
  await expect(page.getByText('Password changed. Sign in with your new password.')).toBeVisible();
  await signIn(password);
  await expect(page.getByRole('alert')).toContainText('The email, mobile number, or password is incorrect.');
  await signIn(newPassword);
  await expect(accountHeading).toBeVisible();

  const crossSite = await fetch(new URL('/api/auth', storefront), {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Origin: 'https://example.com' },
    body: '{"action":"sign-out"}',
  });
  expect(crossSite.status).toBe(403);
  console.log('Passed mobile signup, email and mobile sign-in, JWT cookies, cross-tab sign-out, session revocation, and password changes.');
} finally {
  await browser.close();
}
