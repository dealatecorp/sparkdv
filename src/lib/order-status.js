export const orderCheckpoints = {
  placed: { label: 'Order placed', message: 'Your order request is saved. Send the WhatsApp draft so our team can confirm availability, shipping, and payment.' },
  confirmed: { label: 'Order confirmed', message: 'Our team confirmed your order and is preparing it for dispatch.' },
  dispatched: { label: 'Order dispatched', message: 'Your order has been handed over to the courier.' },
  out_for_delivery: { label: 'Out for delivery', message: 'The courier is bringing your order to you.' },
  delivered: { label: 'Order delivered', message: 'The courier marked your order as delivered.' },
  cancelled: { label: 'Order cancelled', message: 'Your order was cancelled. Contact our team if you have any questions.' },
};

const next = {
  placed: 'confirmed',
  confirmed: 'dispatched',
  dispatched: 'out_for_delivery',
  out_for_delivery: 'delivered',
};

export function nextOrderCheckpoint(status) {
  return Object.hasOwn(next, status) ? next[status] : null;
}

export function orderReference(id) {
  return `SDV-${id.slice(0, 8).toUpperCase()}`;
}
