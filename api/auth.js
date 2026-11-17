import { createAuthHandler } from '../server/auth.js';

export default createAuthHandler(process.env, true);
