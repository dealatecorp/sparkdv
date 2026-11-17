import { sendNotification } from 'web-push';
import { AuthError } from './auth.js';
import { orderCheckpoints, orderReference } from '../src/lib/order-status.js';

export function pushPublicKey(env) {
  return env.ORDER_PUSH_PRIVATE_KEY?.trim() ? env.ORDER_PUSH_PUBLIC_KEY?.trim() ?? null : null;
}

function pushEndpoint(value) {
  if (typeof value !== 'string' || value.length > 2048) return null;
  let url;
  try { url = new URL(value); } catch { return null; }
  const host = url.hostname;
  const knownService = host === 'fcm.googleapis.com' ||
    host === 'updates.push.services.mozilla.com' ||
    host.endsWith('.push.apple.com') ||
    host.endsWith('.notify.windows.com');
  if (!knownService || url.protocol !== 'https:' || url.port || url.username || url.password || url.hash) return null;
  return url.href;
}

function validKey(value, size) {
  return typeof value === 'string' && /^[\w-]{22,87}$/.test(value) && Buffer.from(value, 'base64url').length === size;
}

export async function updateOrderPush(db, env, userId, body) {
  if (!pushPublicKey(env)) throw new AuthError(503, 'Browser alerts are unavailable.');
  const enabled = body.action === 'enable-alerts';
  const endpoint = pushEndpoint(enabled ? body.subscription?.endpoint : body.endpoint);
  if (!endpoint) throw new AuthError(400, 'This browser’s push service isn’t supported.');
  if (!enabled) {
    await db.execute({ sql: 'DELETE FROM order_push_subscriptions WHERE endpoint = ? AND user_id = ?', args: [endpoint, userId] });
    return { enabled };
  }
  const { p256dh, auth } = body.subscription?.keys ?? {};
  if (!validKey(p256dh, 65) || Buffer.from(p256dh, 'base64url')[0] !== 4 || !validKey(auth, 16)) {
    throw new AuthError(400, 'This browser supplied an invalid subscription.');
  }
  await db.batch([
    {
      sql: `INSERT INTO order_push_subscriptions (endpoint, user_id, p256dh, auth_key, updated_at)
        VALUES (?, ?, ?, ?, ?) ON CONFLICT(endpoint) DO UPDATE SET
        user_id = excluded.user_id, p256dh = excluded.p256dh, auth_key = excluded.auth_key, updated_at = excluded.updated_at`,
      args: [endpoint, userId, p256dh, auth, Date.now()],
    },
    {
      sql: `DELETE FROM order_push_subscriptions WHERE user_id = ? AND endpoint IN (
        SELECT endpoint FROM order_push_subscriptions WHERE user_id = ? ORDER BY updated_at DESC LIMIT -1 OFFSET 5
      )`,
      args: [userId, userId],
    },
  ], 'write');
  return { enabled };
}

export async function sendOrderPush(db, env, orderId, status) {
  const publicKey = pushPublicKey(env);
  if (!publicKey) return;

  try {
    const { rows } = await db.execute({
      sql: `SELECT s.* FROM order_push_subscriptions s JOIN orders o ON o.user_id = s.user_id WHERE o.id = ?`,
      args: [orderId],
    });
    await Promise.allSettled(rows.map(async ({ endpoint, user_id, p256dh, auth_key }) => {
      if (!pushEndpoint(endpoint)) return;
      const payload = JSON.stringify({
        recipient: user_id,
        title: orderCheckpoints[status].label,
        body: `${orderReference(orderId)} · View your order update`,
        path: `/orders/${orderId}`,
        tag: `${orderId}:${status}`,
      });
      try {
        await sendNotification({ endpoint, keys: { p256dh, auth: auth_key } }, payload, {
          vapidDetails: { subject: 'https://sparkdv.com/contact', publicKey, privateKey: env.ORDER_PUSH_PRIVATE_KEY.trim() },
          TTL: 24 * 60 * 60,
          timeout: 3500,
        });
      } catch (error) {
        if (error.statusCode === 404 || error.statusCode === 410) {
          await db.execute({ sql: 'DELETE FROM order_push_subscriptions WHERE endpoint = ? AND user_id = ?', args: [endpoint, user_id] });
        } else {
          console.warn('Order push provider returned', error.statusCode ?? error.name);
        }
      }
    }));
  } catch (error) {
    console.warn('Order push delivery failed:', error.code ?? error.name);
  }
}
