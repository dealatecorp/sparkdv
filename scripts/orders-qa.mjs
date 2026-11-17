import assert from 'node:assert/strict';
import { randomUUID } from 'node:crypto';
import { mkdtemp } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { createServer } from 'node:http';
import { createAuthHandler, createStoreAccess } from '../server/auth.js';
import { createOrdersHandler } from '../server/orders.js';

const env = {
  AUTH_DATA_DIR: await mkdtemp(join(tmpdir(), 'sparkdv-orders-')),
  RESEND_API_KEY: 'local-test',
  ORDER_EMAIL_FROM: 'SPARK-DV Orders <orders@example.com>',
};
const store = createStoreAccess(env, false);
const auth = createAuthHandler(env, false, store);
const orders = createOrdersHandler(env, false, store);
const app = createServer((req, res) => (req.url.startsWith('/api/orders') ? orders : auth)(req, res));
await new Promise(resolve => app.listen(0, '127.0.0.1', resolve));
const origin = `http://127.0.0.1:${app.address().port}`;
const realFetch = globalThis.fetch;
const emails = new Map();
const attempts = new Map();
let failNextEmail = false;

globalThis.fetch = async (url, options) => {
  if (url !== 'https://api.resend.com/emails') return realFetch(url, options);
  const key = options.headers['Idempotency-Key'];
  attempts.set(key, (attempts.get(key) ?? 0) + 1);
  if (failNextEmail) {
    failNextEmail = false;
    return new Response('{}', { status: 429 });
  }
  emails.set(key, JSON.parse(options.body));
  return Response.json({ id: key });
};

async function request(path, { cookie, body, from = origin } = {}) {
  const response = await fetch(origin + path, {
    method: body ? 'POST' : 'GET',
    headers: { ...(cookie && { Cookie: cookie }), ...(body && { 'Content-Type': 'application/json', Origin: from }) },
    ...(body && { body: JSON.stringify(body) }),
  });
  return { status: response.status, data: await response.json(), cookie: response.headers.get('set-cookie')?.split(';')[0] };
}

async function signUp(name, mobile) {
  const result = await request('/api/auth', {
    body: { action: 'sign-up', name, mobile, email: `${name.toLowerCase()}@example.com`, password: randomUUID() },
  });
  assert.equal(result.status, 201);
  return result;
}

try {
  const staff = await signUp('Staff', '+12025550100');
  const buyer = await signUp('Buyer', '+12025550101');
  const other = await signUp('Other', '+12025550102');
  env.ORDER_STAFF_USER_IDS = staff.data.user.id;
  assert.equal((await request('/api/auth', { cookie: staff.cookie })).data.user.order_staff, true);
  assert.equal((await request('/api/auth', { cookie: buyer.cookie })).data.user.order_staff, false);
  const id = randomUUID();
  const place = { action: 'place', id, items: [{ slug: 'nanion-lite', qty: 2, price: 1 }] };
  assert.equal((await request('/api/orders', { body: place })).status, 401);
  assert.equal((await request('/api/orders', { cookie: buyer.cookie, body: place, from: 'https://example.com' })).status, 403);
  assert.equal((await request('/api/orders', { cookie: buyer.cookie, body: { ...place, items: [null] } })).status, 400);
  assert.equal((await request('/api/orders', { cookie: buyer.cookie, body: { ...place, items: [{ slug: 'tac', qty: 1 }] } })).status, 400);
  const created = await request('/api/orders', { cookie: buyer.cookie, body: place });
  assert.equal(created.status, 201);
  assert.equal(created.data.order.subtotal, 1198);
  assert.equal(created.data.order.events[0].status, 'placed');
  assert.equal(created.data.order.customer, undefined);
  assert.equal(created.data.order.events[0].email_status, undefined);
  assert.equal((await request('/api/orders', { cookie: buyer.cookie, body: place })).status, 200);
  assert.equal((await request('/api/orders', { cookie: buyer.cookie })).data.orders.length, 1);
  assert.equal((await request(`/api/orders?id=${id}`, { cookie: other.cookie })).status, 404);
  assert.deepEqual((await request('/api/orders', { cookie: other.cookie })).data.orders, []);
  assert.equal((await request('/api/orders?staff=1', { cookie: buyer.cookie })).status, 403);
  assert.equal(attempts.get(`sparkdv-order/${id}/placed`), 1);
  const update = (expected, status, details = {}, cookie = staff.cookie) => request('/api/orders?staff=1', {
    cookie, body: { action: 'checkpoint', id, expected, status, ...details },
  });
  assert.equal((await update('placed', 'confirmed', {}, buyer.cookie)).status, 403);
  assert.equal((await update('placed', 'delivered')).status, 400);
  const race = await Promise.all([update('placed', 'confirmed'), update('placed', 'confirmed')]);
  assert.deepEqual(race.map(result => result.status).sort(), [200, 409]);

  failNextEmail = true;
  const dispatched = await update('confirmed', 'dispatched', {
    carrier: 'Test courier', trackingNumber: 'TEST12345', trackingUrl: 'https://example.com/track/TEST12345',
  });
  assert.equal(dispatched.status, 200);
  assert.equal(dispatched.data.order.events.at(-1).email_status, 'failed');
  const retried = await request('/api/orders?staff=1', { cookie: staff.cookie, body: { action: 'retry-email', id, status: 'dispatched' } });
  assert.equal(retried.data.order.events.at(-1).email_status, 'sent');
  assert.equal((await update('dispatched', 'out_for_delivery')).status, 200);
  assert.equal((await update('out_for_delivery', 'delivered')).status, 200);
  assert.equal((await update('delivered', 'cancelled')).status, 400);
  const tracked = (await request(`/api/orders?id=${id}`, { cookie: buyer.cookie })).data.order;
  assert.deepEqual(tracked.events.map(event => event.status), ['placed', 'confirmed', 'dispatched', 'out_for_delivery', 'delivered']);
  assert.equal(tracked.events[2].tracking_number, 'TEST12345');
  assert.equal(emails.size, 5);
  assert.ok([...emails.values()].every(email => email.to[0] === 'buyer@example.com' && email.text.includes(`/orders/${id}`)));
  console.log('Passed order ownership, pricing, idempotency, staff access, concurrent updates, courier tracking, and checkpoint email delivery and retry.');
} finally {
  globalThis.fetch = realFetch;
  await new Promise(resolve => app.close(resolve));
}
