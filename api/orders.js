import { createOrdersHandler } from '../server/orders.js';

export default createOrdersHandler(process.env, true);
