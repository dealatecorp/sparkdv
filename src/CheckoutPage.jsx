import { Link } from 'react-router-dom';
import { ArrowLeft, MessageCircle, Minus, Plus, ShoppingBag, Trash2 } from 'lucide-react';
import { ProductImage, productImageSrc } from './Editorial';
import { money, products } from './data';
import { whatsappDraft } from './lib/enquiry';

export default function CheckoutPage({ cart, update, remove }) {
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
  // Local previews need an image host that the WhatsApp recipient can reach.
  const photoOrigin = import.meta.env.DEV || ['localhost', '127.0.0.1', '[::1]'].includes(window.location.hostname)
    ? 'https://sparkdv.vercel.app'
    : window.location.origin;

  const draftItems = cart.map(item => {
    const photo = products.find(product => product.slug === item.slug)?.shareImage ?? productImageSrc(item);
    const description = [item.name, item.variant].filter(Boolean).join(' · ');
    const pricing = item.price == null
      ? 'Request pricing'
      : `${money(item.price)} each · ${money(item.price * item.qty)}`;
    return `${description}\nQuantity: ${item.qty} · ${pricing}\nPhoto: ${new URL(photo, photoOrigin).href}`;
  });
  const draft = whatsappDraft([
    'Hello SPARK-DV, I’d like to order:',
    ...draftItems,
    `Product subtotal: ${money(subtotal)}`,
    'Please confirm availability, shipping, and payment details.',
  ].join('\n\n'));

  return (
    <section className="checkout-shell wrap">
      <Link className="checkout-return" to="/cart">
        <ArrowLeft size={16} aria-hidden="true" /> Back to cart
      </Link>
      <div className="checkout-title">
        <h1>Checkout</h1>
        <span>{count} {count === 1 ? 'item' : 'items'} in your order</span>
      </div>
      <p className="checkout-notice">Review your items, then open your order draft in WhatsApp.</p>

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
                    <button type="button" aria-label={`Decrease ${item.name}`} onClick={() => update(item.slug, -1)}>
                      <Minus size={15} aria-hidden="true" />
                    </button>
                    <span aria-live="polite">{item.qty}</span>
                    <button type="button" aria-label={`Increase ${item.name}`} onClick={() => update(item.slug, 1)}>
                      <Plus size={15} aria-hidden="true" />
                    </button>
                    <button type="button" className="checkout-remove" aria-label={`Remove ${item.name}`} onClick={() => remove(item.slug)}>
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
          <a className="button checkout-whatsapp" href={draft} target="_blank" rel="noopener noreferrer">
            <MessageCircle size={18} aria-hidden="true" /> Open WhatsApp draft
          </a>
          <p>Review and send the draft in WhatsApp. Our team will confirm availability, shipping, and payment there.</p>
          <Link to="/shipping" className="checkout-terms-link">Shipping &amp; returns policy</Link>
        </aside>
      </div>
    </section>
  );
}
