import { useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, MessageCircle, Minus, Plus, ShoppingBag, Trash2 } from 'lucide-react';
import { ProductImage } from './Editorial';
import { money } from './data';
import { useAuth } from './components/auth-provider';
import { orderRequest, whatsappOrderDraft } from './lib/orders';

export default function CheckoutPage({ cart, update, remove, completeOrder }) {
  const { status, user } = useAuth();
  const navigate = useNavigate();
  const attempt = useRef(null);
  const inFlight = useRef(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');

  async function placeOrder() {
    if (!user || inFlight.current) return;
    inFlight.current = true;
    setSaving(true);
    setError('');
    const items = cart.map(({ slug, qty }) => ({ slug, qty })).sort((a, b) => a.slug.localeCompare(b.slug));
    const key = `sparkdv-checkout:${user.id}:${JSON.stringify(items)}`;
    let savedId;
    try { savedId = sessionStorage.getItem(key); } catch { /* Storage may be blocked. */ }
    const id = savedId || (attempt.current?.key === key ? attempt.current.id : crypto.randomUUID());
    attempt.current = { key, id };
    try { sessionStorage.setItem(key, id); } catch { /* Keep the retry key in memory. */ }

    const draftWindow = window.open('', '_blank');
    if (draftWindow) draftWindow.opener = null;
    try {
      const { order } = await orderRequest({}, { action: 'place', id, items });
      try { sessionStorage.removeItem(key); } catch { /* The order is already saved. */ }
      completeOrder(items);
      navigate(`/orders/${order.id}`, { replace: true });
      if (draftWindow && !draftWindow.closed) draftWindow.location.replace(whatsappOrderDraft(order));
    } catch (failure) {
      draftWindow?.close();
      setError(failure instanceof Error ? failure.message : 'We couldn’t save your order. Try again.');
    } finally {
      inFlight.current = false;
      setSaving(false);
    }
  }

  if (!cart.length) {
    return (
      <section className="checkout-shell wrap checkout-empty">
        <h1>Checkout</h1>
        <ShoppingBag size={40} aria-hidden="true" />
        <h2>Your cart is empty</h2>
        <Link className="button button-dark" to="/products">Shop products</Link>
      </section>
    );
  }

  const count = cart.reduce((sum, item) => sum + item.qty, 0);
  const hasUnpricedItems = cart.some(item => item.price == null);
  const subtotal = cart.some(item => item.price != null)
    ? cart.reduce((sum, item) => sum + (item.price ?? 0) * item.qty, 0)
    : null;
  return (
    <section className="checkout-shell wrap">
      <Link className="checkout-return" to="/cart">
        <ArrowLeft size={16} aria-hidden="true" /> Back to cart
      </Link>
      <div className="checkout-title">
        <h1>Checkout</h1>
        <span>{count} {count === 1 ? 'item' : 'items'} in your order</span>
      </div>
      <p className="checkout-notice">Place your order to save it to your account, then send the WhatsApp draft so our team can confirm it.</p>

      <div className="checkout-layout">
        <section className="checkout-step" aria-labelledby="checkout-items-title">
          <div className="checkout-step-title">
            <h2 id="checkout-items-title">Your items</h2>
            <Link to="/products">Add more</Link>
          </div>
          <div className="checkout-items">
            {cart.map(item => (
              <article className="checkout-item" key={item.slug}>
                <Link to={`/products/${item.slug}`} className="checkout-item-image">
                  <ProductImage product={item} />
                </Link>
                <div className="checkout-item-copy">
                  <Link to={`/products/${item.slug}`}><h3>{item.name}</h3></Link>
                  <p>{item.price == null ? 'Request pricing' : `${money(item.price)} each`}</p>
                  <div className="checkout-quantity">
                    <button type="button" disabled={saving} aria-label={`Decrease ${item.name}`} onClick={() => update(item.slug, -1)}>
                      <Minus size={15} aria-hidden="true" />
                    </button>
                    <span aria-live="polite">{item.qty}</span>
                    <button type="button" disabled={saving || item.qty >= 99} aria-label={`Increase ${item.name}`} onClick={() => update(item.slug, 1)}>
                      <Plus size={15} aria-hidden="true" />
                    </button>
                    <button type="button" disabled={saving} className="checkout-remove" aria-label={`Remove ${item.name}`} onClick={() => remove(item.slug)}>
                      <Trash2 size={16} aria-hidden="true" />
                    </button>
                  </div>
                </div>
                <strong>{money(item.price == null ? null : item.price * item.qty)}</strong>
              </article>
            ))}
          </div>
        </section>

        <aside className="checkout-summary" aria-labelledby="checkout-summary-title">
          <h2 id="checkout-summary-title">Order summary</h2>
          <dl>
            <div className="checkout-total">
              <dt>Product subtotal</dt>
              <dd>{money(subtotal)}</dd>
            </div>
          </dl>
          {hasUnpricedItems && <p>Items marked “Request pricing” will be quoted in chat.</p>}
          {status === 'loading' && <p role="status">Checking your account…</p>}
          {status === 'unavailable' && <p role="alert">The account service is unavailable. Refresh this page to try again.</p>}
          {status === 'signed-out' && (
            <Link className="button checkout-whatsapp" to="/login" state={{ from: '/checkout' }}>Sign in to place order</Link>
          )}
          {user && (
            <button type="button" className="button checkout-whatsapp" disabled={saving} onClick={placeOrder}>
              <MessageCircle size={18} aria-hidden="true" /> {saving ? 'Saving order…' : 'Place order & open WhatsApp'}
            </button>
          )}
          {error && <p role="alert">{error}</p>}
          <p>Follow delivery updates from My orders. Availability, shipping and payment are confirmed in WhatsApp.</p>
          <Link to="/shipping" className="checkout-terms-link">Shipping &amp; returns policy</Link>
        </aside>
      </div>
    </section>
  );
}
