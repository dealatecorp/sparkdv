import { AuthError, createStoreAccess, isOrderStaff, readBody, requireStorefrontRequest, sessionUser } from './auth.js';
import { products } from '../src/data.js';
import { nextOrderCheckpoint, orderCheckpoints, orderReference } from '../src/lib/order-status.js';

const catalog = new Map(products.map(product => [product.slug, product]));
const uuid = /^[a-f0-9]{8}-(?:[a-f0-9]{4}-){3}[a-f0-9]{12}$/;
const terminal = new Set(['delivered', 'cancelled']);
const pageSize = 20;

function makeSnapshot(items) {
  if (!Array.isArray(items) || !items.length || items.length > catalog.size) {
    throw new AuthError(400, 'Add a product to your cart before placing an order.');
  }
  const seen = new Set();
  return items.map(item => {
    const { slug, qty } = item ?? {};
    const product = catalog.get(slug);
    if (!product || product.coming || seen.has(slug) || !Number.isInteger(qty) || qty < 1 || qty > 99) {
      throw new AuthError(400, 'Some products or quantities in your cart are unavailable. Review your cart and try again.');
    }
    seen.add(slug);
    const img = product.img.startsWith('/') ? product.img : `/images/${product.img}`;
    return { slug, name: product.name, qty, img, photo: product.shareImage ?? img, price: product.price ?? null, variant: product.variant ?? null };
  });
}

async function initializeOrders(db) {
  await db.batch([
    `CREATE TABLE IF NOT EXISTS orders (
      id TEXT PRIMARY KEY, user_id TEXT NOT NULL REFERENCES auth_users(id),
      items TEXT NOT NULL, subtotal INTEGER, created_at TEXT NOT NULL
    )`,
    `CREATE TABLE IF NOT EXISTS order_checkpoints (
      order_id TEXT NOT NULL REFERENCES orders(id), seq INTEGER NOT NULL,
      status TEXT NOT NULL, created_at TEXT NOT NULL, carrier TEXT,
      tracking_number TEXT, tracking_url TEXT, email_status TEXT NOT NULL DEFAULT 'pending',
      PRIMARY KEY (order_id, seq), UNIQUE (order_id, status)
    )`,
    'CREATE INDEX IF NOT EXISTS orders_by_customer ON orders(user_id, created_at DESC, id DESC)',
    'CREATE INDEX IF NOT EXISTS orders_by_date ON orders(created_at DESC, id DESC)',
  ], 'write');
}

function orderData(row, staff) {
  const { id, created_at, subtotal, status } = row;
  return {
    id, created_at, subtotal, status, items: JSON.parse(row.items),
    ...(staff && { customer: { name: row.name, email: row.email, mobile: row.mobile } }),
  };
}

const selectOrders = `SELECT o.*, u.name, u.email, u.mobile,
  (SELECT status FROM order_checkpoints WHERE order_id = o.id ORDER BY seq DESC LIMIT 1) AS status
  FROM orders o JOIN auth_users u ON u.id = o.user_id`;

async function getDetail(db, id, userId, staff) {
  const [{ rows: [row] }, { rows: events }] = await db.batch([
    { sql: `${selectOrders} WHERE o.id = ? AND (? OR o.user_id = ?)`, args: [id, Number(staff), userId] },
    { sql: 'SELECT * FROM order_checkpoints WHERE order_id = ? ORDER BY seq', args: [id] },
  ], 'read');
  if (!row) throw new AuthError(404, 'Order not found.');
  return {
    ...orderData(row, staff),
    events: events.map(({ seq, status, created_at, carrier, tracking_number, tracking_url, email_status }) => ({
      seq, status, created_at, carrier, tracking_number, tracking_url,
      ...(staff && { email_status }),
    })),
  };
}

async function sendCheckpointEmail(db, env, id, status) {
  if (!env.RESEND_API_KEY || !env.ORDER_EMAIL_FROM) return;
  const { rows: [event] } = await db.execute({
    sql: `SELECT c.created_at, c.email_status, u.email FROM order_checkpoints c
      JOIN orders o ON o.id = c.order_id JOIN auth_users u ON u.id = o.user_id
      WHERE c.order_id = ? AND c.status = ?`,
    args: [id, status],
  });
  if (!event || event.email_status === 'sent' || Date.now() - Date.parse(event.created_at) >= 23 * 60 * 60 * 1000) return;
  const checkpoint = orderCheckpoints[status];
  const ref = orderReference(id);
  let delivery = 'failed';
  try {
    const response = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${env.RESEND_API_KEY.trim()}`,
        'Content-Type': 'application/json',
        'Idempotency-Key': `sparkdv-order/${id}/${status}`,
      },
      body: JSON.stringify({
        from: env.ORDER_EMAIL_FROM.trim(),
        to: [event.email],
        subject: `${checkpoint.label} · ${ref}`,
        text: `${checkpoint.message}\n\nTrack ${ref} in your account:\nhttps://sparkdv.com/orders/${id}`,
      }),
      signal: AbortSignal.timeout(4500),
    });
    if (response.ok) delivery = 'sent';
    else console.warn('Order email provider returned', response.status);
  } catch (error) {
    console.warn('Order email delivery failed:', error.name);
  }
  await db.execute({
    sql: "UPDATE order_checkpoints SET email_status = ? WHERE order_id = ? AND status = ? AND email_status != 'sent'",
    args: [delivery, id, status],
  });
}

async function createOrder(db, env, user, body) {
  const { id } = body;
  if (typeof id !== 'string' || !uuid.test(id)) throw new AuthError(400, 'Invalid order reference.');
  const items = makeSnapshot(body.items);
  const subtotal = items.some(item => item.price != null)
    ? items.reduce((sum, item) => sum + (item.price ?? 0) * item.qty, 0)
    : null;
  const now = new Date().toISOString();
  const hourAgo = new Date(Date.now() - 60 * 60 * 1000).toISOString();
  const [insert, , existing] = await db.batch([
    {
      sql: `INSERT INTO orders (id, user_id, items, subtotal, created_at)
        SELECT ?, ?, ?, ?, ? WHERE (SELECT COUNT(*) FROM orders WHERE user_id = ? AND created_at > ?) < 6
        ON CONFLICT(id) DO NOTHING`,
      args: [id, user.id, JSON.stringify(items), subtotal, now, user.id, hourAgo],
    },
    {
      sql: `INSERT INTO order_checkpoints (order_id, seq, status, created_at)
        SELECT id, 1, 'placed', created_at FROM orders WHERE id = ? AND user_id = ?
        ON CONFLICT(order_id, seq) DO NOTHING`,
      args: [id, user.id],
    },
    { sql: 'SELECT items FROM orders WHERE id = ? AND user_id = ?', args: [id, user.id] },
  ], 'write');
  if (!existing.rows.length) throw new AuthError(429, 'You’ve reached the order limit. Try again later or contact our team.');
  const savedItems = JSON.parse(existing.rows[0].items);
  if (savedItems.length !== items.length || items.some(item => !savedItems.some(saved => saved.slug === item.slug && saved.qty === item.qty))) {
    throw new AuthError(409, 'This checkout has already been saved. Open the order from My orders.');
  }
  await sendCheckpointEmail(db, env, id, 'placed');
  return { code: insert.rowsAffected ? 201 : 200, order: await getDetail(db, id, user.id, false) };
}

function shippingDetails(body) {
  const carrier = typeof body.carrier === 'string' ? body.carrier.trim() : '';
  const number = typeof body.trackingNumber === 'string' ? body.trackingNumber.trim() : '';
  const url = typeof body.trackingUrl === 'string' ? body.trackingUrl.trim() : '';
  if (carrier.length > 100 || number.length > 100 || url.length > 500) throw new AuthError(400, 'Tracking details are too long.');
  if (url) {
    let parsed;
    try { parsed = new URL(url); } catch { throw new AuthError(400, 'Enter the full HTTPS courier tracking link.'); }
    if (parsed.protocol !== 'https:' || parsed.username || parsed.password) throw new AuthError(400, 'Enter the full HTTPS courier tracking link.');
  }
  return [carrier || null, number || null, url || null];
}

async function addCheckpoint(db, env, user, body) {
  const { id, expected, status } = body;
  if (typeof id !== 'string' || !uuid.test(id)) throw new AuthError(404, 'Order not found.');
  const order = await getDetail(db, id, user.id, true);
  if (body.action === 'retry-email') {
    if (!order.events.some(event => event.status === status)) throw new AuthError(404, 'Checkpoint not found.');
    await sendCheckpointEmail(db, env, id, status);
    return getDetail(db, id, user.id, true);
  }
  if (order.status !== expected) throw new AuthError(409, 'Someone already updated this order. Refresh it and try again.');
  if (terminal.has(expected) || !status || (status !== nextOrderCheckpoint(expected) && status !== 'cancelled')) {
    throw new AuthError(400, 'Choose the next order checkpoint.');
  }
  const shipping = status === 'dispatched' ? shippingDetails(body) : [null, null, null];
  const result = await db.execute({
    sql: `INSERT INTO order_checkpoints (order_id, seq, status, created_at, carrier, tracking_number, tracking_url)
      SELECT order_id, seq + 1, ?, ?, ?, ?, ? FROM order_checkpoints
      WHERE order_id = ? AND status = ? AND seq = (SELECT MAX(seq) FROM order_checkpoints WHERE order_id = ?)`,
    args: [status, new Date().toISOString(), ...shipping, id, expected, id],
  });
  if (!result.rowsAffected) throw new AuthError(409, 'Someone already updated this order. Refresh it and try again.');
  await sendCheckpointEmail(db, env, id, status);
  return getDetail(db, id, user.id, true);
}

export function createOrdersHandler(env, deployed = false, getStore = createStoreAccess(env, deployed)) {
  let ready;
  return async (req, res) => {
    res.setHeader('Cache-Control', 'no-store');
    res.setHeader('Content-Type', 'application/json; charset=utf-8');
    const send = (code, body) => { res.statusCode = code; res.end(JSON.stringify(body)); };
    try {
      requireStorefrontRequest(req, res, deployed);
      const store = await getStore();
      const user = await sessionUser(req, store);
      if (!user) throw new AuthError(401, 'Sign in to view or place orders.');
      const { db } = store;
      ready ??= initializeOrders(db).catch(error => { ready = undefined; throw error; });
      await ready;
      const params = new URL(req.url, 'http://storefront').searchParams;
      const staffView = params.get('staff') === '1';
      if (staffView && !isOrderStaff(env, user.id)) throw new AuthError(403, 'This area is for order staff.');
      if (req.method === 'GET') {
        const id = params.get('id');
        if (id) {
          if (!uuid.test(id)) throw new AuthError(404, 'Order not found.');
          return send(200, { order: await getDetail(db, id, user.id, staffView) });
        }
        const page = Number(params.get('page') || 1);
        if (!Number.isSafeInteger(page) || page < 1 || page > 10000) throw new AuthError(400, 'Invalid order page.');
        const { rows } = await db.execute({
          sql: `${selectOrders} WHERE (? OR o.user_id = ?) ORDER BY o.created_at DESC, o.id DESC LIMIT ? OFFSET ?`,
          args: [Number(staffView), user.id, pageSize + 1, (page - 1) * pageSize],
        });
        return send(200, { orders: rows.slice(0, pageSize).map(row => orderData(row, staffView)), hasMore: rows.length > pageSize });
      }
      const body = await readBody(req);
      if (!body || typeof body !== 'object') throw new AuthError(400, 'Invalid order request.');
      if (body.action === 'place') {
        const { code, order } = await createOrder(db, env, user, body);
        return send(code, { order });
      }
      if (!isOrderStaff(env, user.id)) throw new AuthError(403, 'Only order staff can update checkpoints.');
      if (body.action !== 'checkpoint' && body.action !== 'retry-email') throw new AuthError(400, 'Invalid order action.');
      return send(200, { order: await addCheckpoint(db, env, user, body) });
    } catch (error) {
      if (error instanceof AuthError) return send(error.status, { error: error.message });
      console.error('Order service error:', error.code ?? error.name);
      return send(503, { error: 'The order service is unavailable. Try again shortly.' });
    }
  };
}
