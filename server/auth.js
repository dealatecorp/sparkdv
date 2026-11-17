import { createClient } from '@libsql/client';
import { SignJWT, jwtVerify } from 'jose';
import { randomBytes, randomUUID, scrypt, timingSafeEqual } from 'node:crypto';
import { mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { pathToFileURL } from 'node:url';
import { promisify } from 'node:util';

const issuer = 'sparkdv';
const audience = 'sparkdv-storefront';
const cookieName = 'sparkdv_session';
const lifetime = 7 * 24 * 60 * 60;
const hash = promisify(scrypt);
const hashOptions = { N: 2 ** 15, r: 8, p: 3, maxmem: 64 * 1024 * 1024 };
const dummyHash = `${'0'.repeat(32)}.${'0'.repeat(128)}`;

export class AuthError extends Error {
  constructor(status, message) {
    super(message);
    this.status = status;
  }
}

function localSecret(directory) {
  const file = resolve(directory, 'auth-secret');
  try {
    writeFileSync(file, randomBytes(32).toString('hex'), { flag: 'wx', mode: 0o600 });
  } catch (error) {
    if (error.code !== 'EEXIST') throw error;
  }
  return readFileSync(file, 'utf8').trim();
}

async function openStore(env, deployed) {
  const url = env.AUTH_DATABASE_URL?.trim() || env.TURSO_DATABASE_URL?.trim();
  const authToken = env.AUTH_DATABASE_TOKEN?.trim() || env.TURSO_AUTH_TOKEN?.trim();
  const configuredSecret = env.AUTH_JWT_SECRET?.trim();
  if (deployed && (!url || !/^(libsql|https):\/\//.test(url) || !authToken || !configuredSecret)) {
    throw new Error('Vercel authentication requires a remote database and a signing secret');
  }

  const directory = resolve(env.AUTH_DATA_DIR || '.data');
  if (!url || !configuredSecret) mkdirSync(directory, { recursive: true, mode: 0o700 });
  const secret = new TextEncoder().encode(configuredSecret || localSecret(directory));
  if (secret.length < 32) throw new Error('AUTH_JWT_SECRET must contain at least 32 bytes');

  const db = createClient({ url: url || pathToFileURL(resolve(directory, 'auth.sqlite')).href, authToken });
  await db.batch([
    `CREATE TABLE IF NOT EXISTS auth_users (
      id TEXT PRIMARY KEY, email TEXT UNIQUE NOT NULL, name TEXT NOT NULL,
      password_hash TEXT NOT NULL, created_at TEXT NOT NULL, mobile TEXT
    )`,
    `CREATE TABLE IF NOT EXISTS auth_sessions (
      id TEXT PRIMARY KEY, user_id TEXT NOT NULL REFERENCES auth_users(id), expires_at INTEGER NOT NULL
    )`,
    `CREATE TABLE IF NOT EXISTS auth_limits (
      id TEXT PRIMARY KEY, attempts INTEGER NOT NULL, expires_at INTEGER NOT NULL
    )`,
  ], 'write');
  const { rows: userColumns } = await db.execute('PRAGMA table_info(auth_users)');
  if (!userColumns.some(column => column.name === 'mobile')) {
    try {
      await db.execute('ALTER TABLE auth_users ADD COLUMN mobile TEXT');
    } catch (error) {
      // Another server instance may have added the column after the schema check.
      const { rows } = await db.execute('PRAGMA table_info(auth_users)');
      if (!rows.some(column => column.name === 'mobile')) throw error;
    }
  }
  await db.execute('CREATE UNIQUE INDEX IF NOT EXISTS auth_users_mobile ON auth_users(mobile)');
  return { db, secret };
}

async function derivePassword(password, salt) {
  return await hash(password, Buffer.from(salt, 'hex'), 64, hashOptions);
}

async function passwordHash(password) {
  const salt = randomBytes(16).toString('hex');
  return `${salt}.${(await derivePassword(password, salt)).toString('hex')}`;
}

async function matchesPassword(password, value) {
  const [salt, digest] = value.split('.');
  return timingSafeEqual(await derivePassword(password, salt), Buffer.from(digest, 'hex'));
}

function requirePassword(password, isNew = false) {
  if (typeof password !== 'string' || !password || Buffer.byteLength(password) > 256 || (isNew && password.length < 8)) {
    throw new AuthError(400, isNew ? 'Use a password with at least 8 characters and at most 256 bytes.' : 'Enter your password.');
  }
}

function normalizeMobile(value) {
  if (typeof value !== 'string' || value.length > 32) return null;
  const number = value.trim().replace(/[\s().-]/g, '');
  if (/^\d{10}$/.test(number)) return `+91${number}`;
  return /^\+[1-9]\d{7,14}$/.test(number) ? number : null;
}

function publicUser({ id, email, name, created_at, mobile }) {
  return { id, email, name, created_at, mobile: mobile ?? null };
}

function sendSessionCookie(res, token, secure) {
  res.setHeader('Set-Cookie', `${cookieName}=${token}; Path=/; HttpOnly; SameSite=Lax; Max-Age=${token ? lifetime : 0}${secure ? '; Secure' : ''}`);
}

async function sessionClaims(req, secret) {
  const token = req.headers.cookie?.split('; ').find(part => part.startsWith(`${cookieName}=`))?.slice(cookieName.length + 1);
  if (!token) return null;
  try {
    const { payload } = await jwtVerify(token, secret, {
      algorithms: ['HS256'], issuer, audience, requiredClaims: ['sub', 'jti', 'iat', 'exp'],
    });
    return payload;
  } catch {
    return null;
  }
}

async function startSession(db, secret, user, res, secure) {
  const id = randomUUID();
  const now = Math.floor(Date.now() / 1000);
  const expires = now + lifetime;
  const token = await new SignJWT({}).setProtectedHeader({ alg: 'HS256', typ: 'JWT' })
    .setIssuer(issuer).setAudience(audience).setSubject(user.id).setJti(id)
    .setIssuedAt(now).setExpirationTime(expires).sign(secret);
  const [, insert] = await db.batch([
    { sql: 'DELETE FROM auth_sessions WHERE expires_at <= ?', args: [now] },
    { sql: 'INSERT INTO auth_sessions SELECT ?, id, ? FROM auth_users WHERE id = ? AND password_hash = ?', args: [id, expires, user.id, user.password_hash] },
  ], 'write');
  if (!insert.rowsAffected) throw new AuthError(401, 'Please sign in again.');
  sendSessionCookie(res, token, secure);
  return { user: publicUser(user) };
}

async function limitAttempts(db, req, action, deployed) {
  const ip = (deployed && req.headers['x-vercel-forwarded-for']) || req.socket.remoteAddress || 'unknown';
  const now = Math.floor(Date.now() / 1000);
  const [, result] = await db.batch([
    { sql: 'DELETE FROM auth_limits WHERE expires_at <= ?', args: [now] },
    { sql: `INSERT INTO auth_limits (id, attempts, expires_at) VALUES (?, 1, ?)
      ON CONFLICT(id) DO UPDATE SET attempts = attempts + 1 RETURNING attempts`, args: [`${action}:${ip}`, now + 15 * 60] },
  ], 'write');
  if (Number(result.rows[0].attempts) > (action === 'sign-in' ? 30 : 12)) {
    throw new AuthError(429, 'Too many attempts. Try again in a few minutes.');
  }
}

export async function readBody(req) {
  if (Number(req.headers['content-length']) > 8192) throw new AuthError(413, 'Request is too large.');
  const type = req.headers['content-type']?.split(';')[0];
  if (type !== 'application/json') throw new AuthError(415, 'Use a JSON request.');
  if (req.body && typeof req.body === 'object' && !Buffer.isBuffer(req.body)) return req.body;

  const chunks = [];
  let size = 0;
  for await (const chunk of req) {
    size += Buffer.byteLength(chunk);
    if (size > 8192) throw new AuthError(413, 'Request is too large.');
    chunks.push(Buffer.from(chunk));
  }
  try {
    return JSON.parse(req.body || Buffer.concat(chunks).toString('utf8'));
  } catch {
    throw new AuthError(400, 'Invalid request.');
  }
}

export function createStoreAccess(env, deployed) {
  let store;
  return () => store ??= openStore(env, deployed).catch(error => { store = undefined; throw error; });
}

export async function sessionUser(req, { db, secret }) {
  const claims = await sessionClaims(req, secret);
  if (!claims) return null;
  const { rows } = await db.execute({
    sql: 'SELECT u.id, u.email, u.name, u.created_at, u.mobile FROM auth_users u JOIN auth_sessions s ON s.user_id = u.id WHERE s.id = ? AND u.id = ? AND s.expires_at > ?',
    args: [claims.jti, claims.sub, Math.floor(Date.now() / 1000)],
  });
  return rows[0] ? publicUser(rows[0]) : null;
}

export function isOrderStaff(env, userId) {
  return (env.ORDER_STAFF_USER_IDS ?? '').split(',').some(id => id.trim() === userId);
}

export function requireStorefrontRequest(req, res, deployed) {
  if (!['GET', 'POST'].includes(req.method)) {
    res.setHeader('Allow', 'GET, POST');
    throw new AuthError(405, 'Method not allowed.');
  }
  const secure = deployed || Boolean(req.socket.encrypted);
  if (req.method === 'POST' && req.headers.origin !== `${secure ? 'https' : 'http'}://${req.headers.host}`) {
    throw new AuthError(403, 'This request must come from the storefront.');
  }
  return secure;
}

export function createAuthHandler(env, deployed = false, getStore = createStoreAccess(env, deployed)) {

  return async (req, res) => {
    res.setHeader('Cache-Control', 'no-store');
    res.setHeader('Content-Type', 'application/json; charset=utf-8');
    const send = (status, body) => {
      if (body.user) body.user.order_staff = isOrderStaff(env, body.user.id);
      res.statusCode = status;
      res.end(JSON.stringify(body));
    };

    try {
      const secure = requireStorefrontRequest(req, res, deployed);
      const { db, secret } = await getStore();
      if (req.method === 'GET') {
        return send(200, { user: await sessionUser(req, { db, secret }) });
      }

      const { action, password, currentPassword, ...fields } = (await readBody(req)) ?? {};
      if (action === 'sign-out') {
        const claims = await sessionClaims(req, secret);
        if (claims) await db.execute({ sql: 'DELETE FROM auth_sessions WHERE id = ? AND user_id = ?', args: [claims.jti, claims.sub] });
        sendSessionCookie(res, '', secure);
        return send(200, { user: null });
      }
      if (!['sign-in', 'sign-up', 'change-password'].includes(action)) throw new AuthError(400, 'Unknown account action.');
      await limitAttempts(db, req, action, deployed);
      requirePassword(password, action !== 'sign-in');

      if (action === 'change-password') {
        const claims = await sessionClaims(req, secret);
        if (!claims) throw new AuthError(401, 'Sign in again to change your password.');
        requirePassword(currentPassword);
        const { rows: [user] } = await db.execute({
          sql: 'SELECT u.password_hash FROM auth_users u JOIN auth_sessions s ON s.user_id = u.id WHERE s.id = ? AND u.id = ?', args: [claims.jti, claims.sub],
        });
        if (!user || !await matchesPassword(currentPassword, user.password_hash)) throw new AuthError(400, 'The current password is incorrect.');
        const [updated] = await db.batch([
          { sql: 'UPDATE auth_users SET password_hash = ? WHERE id = ? AND password_hash = ?', args: [await passwordHash(password), claims.sub, user.password_hash] },
          { sql: 'DELETE FROM auth_sessions WHERE user_id = ?', args: [claims.sub] },
        ], 'write');
        if (!updated.rowsAffected) throw new AuthError(409, 'Your password changed. Sign in and try again.');
        sendSessionCookie(res, '', secure);
        return send(200, { user: null });
      }

      if (action === 'sign-up') {
        const email = typeof fields.email === 'string' ? fields.email.trim().toLowerCase() : '';
        const name = typeof fields.name === 'string' ? fields.name.trim() : '';
        const mobile = normalizeMobile(fields.mobile);
        if (email.length > 254 || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) throw new AuthError(400, 'Enter a valid email address.');
        if (!name || name.length > 100) throw new AuthError(400, 'Enter your name using 100 characters or fewer.');
        if (!mobile) throw new AuthError(400, 'Enter a 10-digit Indian mobile number or include the country code.');
        const user = { id: randomUUID(), email, name, mobile, password_hash: await passwordHash(password), created_at: new Date().toISOString() };
        const created = await db.execute({
          sql: 'INSERT INTO auth_users (id, email, name, mobile, password_hash, created_at) VALUES (?, ?, ?, ?, ?, ?) ON CONFLICT DO NOTHING',
          args: [user.id, user.email, user.name, user.mobile, user.password_hash, user.created_at],
        });
        if (!created.rowsAffected) throw new AuthError(409, 'That email address or mobile number is already registered.');
        return send(201, await startSession(db, secret, user, res, secure));
      }

      const identifier = fields.identifier ?? fields.email;
      const login = typeof identifier === 'string' ? identifier.trim().toLowerCase() : '';
      const email = login.length <= 254 && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(login) ? login : null;
      const mobile = normalizeMobile(login);
      if (!email && !mobile) throw new AuthError(400, 'Enter a valid email address or mobile number.');
      const { rows: [user] } = await db.execute({ sql: 'SELECT * FROM auth_users WHERE email = ? OR mobile = ?', args: [email, mobile] });
      const valid = await matchesPassword(password, user?.password_hash ?? dummyHash);
      if (!user || !valid) throw new AuthError(401, 'The email, mobile number, or password is incorrect.');
      return send(200, await startSession(db, secret, user, res, secure));
    } catch (error) {
      if (error instanceof AuthError) return send(error.status, { error: error.message });
      console.error('Account service error:', error.code ?? error.name);
      return send(503, { error: 'The account service is unavailable. Try again shortly.' });
    }
  };
}
