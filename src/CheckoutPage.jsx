import React, {useState, useRef, useEffect} from 'react';
import {Link} from 'react-router-dom';
import {
  ArrowLeft, ArrowRight, Check, Minus, Plus, Trash2, ShoppingBag,
  CreditCard, Smartphone, Building2, Banknote, ShieldCheck, Lock,
  RefreshCw, CheckCircle2, XCircle, Printer
} from 'lucide-react';
import {ProductImage} from './Editorial';
import {money} from './data';

export default function CheckoutPage({cart, update, remove}) {
  const [address, setAddress] = useState({
    'Full name': 'Dr. Chaitanya V.',
    'Email': 'chaitu4766@gmail.com',
    'Phone': '+91 79814 56043',
    'PIN code': '500081',
    'Address': 'Plot 42, Hitech City Main Rd',
    'Area': 'Madhapur',
    'City': 'Hyderabad',
    'State': 'Telangana'
  });
  const [editing, setEditing] = useState(false);
  const [method, setMethod] = useState('card'); // 'card' | 'upi' | 'netbanking' | 'cod'
  const [outcome, setOutcome] = useState('success'); // 'success' | 'declined'
  const [paymentState, setPaymentState] = useState('idle'); // 'idle' | 'gateway_open' | 'processing' | 'success' | 'declined'
  const [showQr, setShowQr] = useState(false);
  const [txnId, setTxnId] = useState('');
  const [orderId, setOrderId] = useState('');

  const review = useRef(null);
  const resultRef = useRef(null);

  const subtotal = cart.reduce((sum, item) => sum + (item.price || 0) * item.qty, 0);
  const count = cart.reduce((sum, item) => sum + item.qty, 0);

  // Auto-generate transaction ID & order ID on mount
  useEffect(() => {
    setTxnId(`TXN_SPK_${Math.random().toString(36).substring(2, 9).toUpperCase()}`);
    setOrderId(`SPK-2026-${Math.floor(10000 + Math.random() * 90000)}`);
  }, []);

  // Handle simulated payment processing
  useEffect(() => {
    if (paymentState !== 'processing') return;
    const timer = setTimeout(() => {
      setPaymentState(outcome);
    }, 1800);
    return () => clearTimeout(timer);
  }, [paymentState, outcome]);

  useEffect(() => {
    if (paymentState === 'success' || paymentState === 'declined') {
      resultRef.current?.scrollIntoView({behavior: 'smooth', block: 'center'});
    }
  }, [paymentState]);

  if (!cart.length && paymentState !== 'success') {
    return (
      <section className="checkout-shell wrap">
        <h1>Checkout</h1>
        <div className="checkout-empty">
          <ShoppingBag size={40} />
          <h2>Your cart is empty</h2>
          <p>Add a product to start your order.</p>
          <Link className="button button-dark" to="/products">
            Shop products <ArrowRight size={17} />
          </Link>
        </div>
      </section>
    );
  }

  // Success / Receipt Screen
  if (paymentState === 'success') {
    return (
      <section className="checkout-shell wrap" ref={resultRef}>
        <div className="demo-payment-success-card">
          <div className="success-badge-top">
            <div className="success-icon-pulse">
              <CheckCircle2 size={54} className="text-emerald-600" />
            </div>
            <span className="demo-pill">DEMO PAYMENT GATEWAY</span>
            <h1>Payment Successful!</h1>
            <p className="success-tagline">
              Your simulated transaction of <strong>{money(subtotal)}</strong> has been processed successfully.
            </p>
          </div>

          <div className="success-receipt-grid">
            <div className="receipt-col">
              <span className="receipt-label">Order ID</span>
              <strong className="receipt-val">{orderId}</strong>
            </div>
            <div className="receipt-col">
              <span className="receipt-label">Transaction Reference</span>
              <strong className="receipt-val font-mono">{txnId}</strong>
            </div>
            <div className="receipt-col">
              <span className="receipt-label">Payment Method</span>
              <strong className="receipt-val">
                {method === 'card' && 'Demo Card (ending 4242)'}
                {method === 'upi' && 'Demo UPI (demo@sparkdv)'}
                {method === 'netbanking' && 'HDFC Net Banking (Demo)'}
                {method === 'cod' && 'Cash on Delivery (Verified)'}
              </strong>
            </div>
            <div className="receipt-col">
              <span className="receipt-label">Status</span>
              <span className="receipt-status-badge">PAID · CONFIRMED</span>
            </div>
          </div>

          <div className="receipt-shipping-summary">
            <h3>Delivery To</h3>
            <p><strong>{address['Full name']}</strong> · {address.Phone}</p>
            <p>{address.Address}{address.Area ? `, ${address.Area}` : ''}, {address.City}, {address.State} {address['PIN code']}, India</p>
            <p className="delivery-eta">Estimated delivery: <strong>3–4 business days</strong></p>
          </div>

          <div className="receipt-items-list">
            <h3>Items in this order</h3>
            <ul>
              {cart.map(item => (
                <li key={item.slug}>
                  <span>{item.name} × {item.qty}</span>
                  <strong>{money((item.price || 0) * item.qty)}</strong>
                </li>
              ))}
            </ul>
            <div className="receipt-total-row">
              <span>Total Paid</span>
              <strong>{money(subtotal)}</strong>
            </div>
          </div>

          <div className="success-actions">
            <button
              type="button"
              className="button button-outline"
              onClick={() => window.print()}
            >
              <Printer size={16} /> Print Receipt
            </button>
            <button
              type="button"
              className="button button-outline"
              onClick={() => {
                setPaymentState('idle');
                setTxnId(`TXN_SPK_${Math.random().toString(36).substring(2, 9).toUpperCase()}`);
              }}
            >
              <RefreshCw size={16} /> Test Another Payment
            </button>
            <Link to="/products" className="button button-dark">
              Continue Shopping <ArrowRight size={16} />
            </Link>
          </div>
          <small className="demo-disclaimer">
            * This was a simulated demo payment sandbox. No actual credit card or bank account was debited.
          </small>
        </div>
      </section>
    );
  }

  return (
    <section className="checkout-shell wrap">
      <Link className="checkout-return" to="/cart">
        <ArrowLeft size={16} />Back to cart
      </Link>
      <div className="checkout-title">
        <h1>Checkout</h1>
        <span>{count} {count === 1 ? 'item' : 'items'} in your order</span>
      </div>
      <p className="checkout-notice">
        Complete your delivery details and test our instant Demo Payment Gateway. Safe test environment — no real charge.
      </p>

      <div className="checkout-layout">
        <div className="checkout-steps">
          {/* Step 1: Address */}
          <section className="checkout-step">
            <div className="checkout-step-title">
              <span>{address && !editing ? <Check size={17} /> : 1}</span>
              <h2>Delivery address</h2>
              {address && !editing && <button onClick={() => setEditing(true)}>Change</button>}
            </div>
            {editing ? (
              <form
                className="checkout-address"
                onSubmit={e => {
                  e.preventDefault();
                  setAddress(Object.fromEntries(new FormData(e.currentTarget)));
                  setEditing(false);
                  requestAnimationFrame(() => review.current?.focus());
                }}
              >
                <div className="checkout-fields">
                  <label>Full name<input name="Full name" autoComplete="shipping name" required defaultValue={address?.['Full name']} /></label>
                  <label>Email<input name="Email" type="email" autoComplete="email" required defaultValue={address?.Email} /></label>
                  <label>Mobile number<input name="Phone" type="tel" inputMode="tel" autoComplete="shipping tel" pattern="[+0-9 ()-]{10,18}" required defaultValue={address?.Phone} /></label>
                  <label>PIN code<input name="PIN code" inputMode="numeric" autoComplete="shipping postal-code" pattern="[0-9]{6}" maxLength={6} title="Enter a six-digit Indian PIN code" required defaultValue={address?.['PIN code']} /></label>
                  <label className="checkout-wide">Address<input name="Address" autoComplete="shipping address-line1" placeholder="House, building and street" required defaultValue={address?.Address} /></label>
                  <label className="checkout-wide">Area / landmark (optional)<input name="Area" autoComplete="shipping address-line2" defaultValue={address?.Area} /></label>
                  <label>City<input name="City" autoComplete="shipping address-level2" required defaultValue={address?.City} /></label>
                  <label>State / union territory<input name="State" autoComplete="shipping address-level1" required defaultValue={address?.State} /></label>
                </div>
                <p className="checkout-country">Country: India</p>
                <button className="button button-dark" type="submit">Use this address <ArrowRight size={16} /></button>
              </form>
            ) : (
              <address className="checkout-address-review">
                <strong>{address['Full name']}</strong>
                <span>{address.Address}{address.Area ? `, ${address.Area}` : ''}</span>
                <span>{address.City}, {address.State} {address['PIN code']}, India</span>
                <span>{address.Phone} · {address.Email}</span>
              </address>
            )}
          </section>

          {/* Step 2: Demo Payment Gateway */}
          <section className="checkout-step">
            <div className="checkout-step-title">
              <span>2</span>
              <h2>Demo Payment Gateway</h2>
              <span className="demo-secure-pill"><Lock size={12} /> 256-Bit SSL Demo Sandbox</span>
            </div>

            <div className="demo-gateway-box">
              {/* Payment Method Selector */}
              <div className="gateway-tabs" role="tablist" aria-label="Payment methods">
                <button
                  type="button"
                  className={`gateway-tab ${method === 'card' ? 'is-active' : ''}`}
                  onClick={() => setMethod('card')}
                >
                  <CreditCard size={18} />
                  <span>Card</span>
                </button>
                <button
                  type="button"
                  className={`gateway-tab ${method === 'upi' ? 'is-active' : ''}`}
                  onClick={() => setMethod('upi')}
                >
                  <Smartphone size={18} />
                  <span>UPI / QR</span>
                </button>
                <button
                  type="button"
                  className={`gateway-tab ${method === 'netbanking' ? 'is-active' : ''}`}
                  onClick={() => setMethod('netbanking')}
                >
                  <Building2 size={18} />
                  <span>Net Banking</span>
                </button>
                <button
                  type="button"
                  className={`gateway-tab ${method === 'cod' ? 'is-active' : ''}`}
                  onClick={() => setMethod('cod')}
                >
                  <Banknote size={18} />
                  <span>Pay on Delivery</span>
                </button>
              </div>

              {/* Card Form */}
              {method === 'card' && (
                <div className="gateway-panel card-panel">
                  <div className="mock-card-visual">
                    <div className="card-top-row">
                      <span className="card-chip" />
                      <span className="card-brand-label">DEMO VISA / RUPAY</span>
                    </div>
                    <div className="card-number-display">4242 •••• •••• 4242</div>
                    <div className="card-bottom-row">
                      <div>
                        <small>CARDHOLDER</small>
                        <span>{address?.['Full name'] || 'DR. SPARK CLIENT'}</span>
                      </div>
                      <div>
                        <small>EXPIRES</small>
                        <span>12/28</span>
                      </div>
                    </div>
                  </div>

                  <div className="gateway-inputs-grid">
                    <label>
                      Card number
                      <input type="text" readOnly defaultValue="4242 •••• •••• 4242" />
                    </label>
                    <div className="card-sub-grid">
                      <label>
                        Valid Thru
                        <input type="text" readOnly defaultValue="12/28" />
                      </label>
                      <label>
                        CVV
                        <input type="password" readOnly defaultValue="123" />
                      </label>
                    </div>
                  </div>
                  <p className="gateway-hint">
                    <ShieldCheck size={14} /> Test card credentials pre-filled. No real credit card details required.
                  </p>
                </div>
              )}

              {/* UPI Form */}
              {method === 'upi' && (
                <div className="gateway-panel upi-panel">
                  <div className="upi-account-badge">
                    <Smartphone size={24} />
                    <div>
                      <strong>demo@sparkdv</strong>
                      <span>Verified Virtual Payment Address</span>
                    </div>
                  </div>
                  <div className="upi-actions">
                    <button
                      type="button"
                      className="button button-outline qr-toggle-btn"
                      onClick={() => setShowQr(!showQr)}
                    >
                      {showQr ? 'Hide QR Code' : 'Scan Demo QR Code'}
                    </button>
                    {showQr && (
                      <div className="demo-qr-box">
                        <svg className="mock-qr" viewBox="0 0 120 120" width="120" height="120">
                          <rect width="120" height="120" fill="#ffffff" />
                          <rect x="10" y="10" width="30" height="30" fill="#073763" />
                          <rect x="16" y="16" width="18" height="18" fill="#ffffff" />
                          <rect x="20" y="20" width="10" height="10" fill="#073763" />
                          <rect x="80" y="10" width="30" height="30" fill="#073763" />
                          <rect x="86" y="16" width="18" height="18" fill="#ffffff" />
                          <rect x="90" y="20" width="10" height="10" fill="#073763" />
                          <rect x="10" y="80" width="30" height="30" fill="#073763" />
                          <rect x="16" y="86" width="18" height="18" fill="#ffffff" />
                          <rect x="20" y="90" width="10" height="10" fill="#073763" />
                          <rect x="50" y="15" width="20" height="10" fill="#073763" />
                          <rect x="50" y="35" width="15" height="15" fill="#073763" />
                          <rect x="15" y="50" width="20" height="20" fill="#073763" />
                          <rect x="45" y="55" width="30" height="30" fill="#073763" />
                          <rect x="85" y="50" width="25" height="15" fill="#073763" />
                          <rect x="85" y="75" width="20" height="35" fill="#073763" />
                          <rect x="50" y="95" width="25" height="15" fill="#073763" />
                        </svg>
                        <span>Scan with any UPI app (GPay / PhonePe / Paytm)</span>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* Netbanking Form */}
              {method === 'netbanking' && (
                <div className="gateway-panel netbanking-panel">
                  <p className="gateway-sub">Choose a demo bank to simulate payment:</p>
                  <div className="bank-chips">
                    {['HDFC Bank', 'ICICI Bank', 'State Bank of India', 'Axis Bank', 'Kotak Bank'].map(bank => (
                      <span key={bank} className="bank-chip is-selected">
                        <Building2 size={14} /> {bank}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Pay on Delivery Form */}
              {method === 'cod' && (
                <div className="gateway-panel cod-panel">
                  <div className="cod-info">
                    <Banknote size={24} />
                    <div>
                      <strong>Pay on delivery available</strong>
                      <p>Pay cash or UPI scan when your SPARK-DV order arrives at your clinic or doorstep.</p>
                    </div>
                  </div>
                </div>
              )}

              {/* Simulation Outcome Controls for testing */}
              <div className="gateway-outcome-switch">
                <span className="outcome-title">Demo Gateway Test Mode:</span>
                <label className="outcome-radio">
                  <input
                    type="radio"
                    name="outcome"
                    value="success"
                    checked={outcome === 'success'}
                    onChange={() => setOutcome('success')}
                  />
                  <span>Simulate Success</span>
                </label>
                <label className="outcome-radio">
                  <input
                    type="radio"
                    name="outcome"
                    value="declined"
                    checked={outcome === 'declined'}
                    onChange={() => setOutcome('declined')}
                  />
                  <span>Simulate Bank Decline</span>
                </label>
              </div>

              {/* Declined Alert if previously failed */}
              {paymentState === 'declined' && (
                <div className="gateway-declined-alert">
                  <XCircle size={20} className="text-rose-600 flex-shrink-0" />
                  <div>
                    <strong>Simulated Payment Declined</strong>
                    <p>The test transaction was rejected by issuer bank. Select "Simulate Success" above to test the successful receipt flow.</p>
                  </div>
                </div>
              )}
            </div>
          </section>

          {/* Step 3: Review your items */}
          <section className="checkout-step">
            <div className="checkout-step-title">
              <span>3</span>
              <h2 ref={review} tabIndex={-1}>Review your items</h2>
              <Link to="/products">Add more</Link>
            </div>
            <div className="checkout-items">
              {cart.map(item => (
                <article className="checkout-item" key={item.slug}>
                  <Link to={`/products/${item.slug}`} className="checkout-item-image">
                    <ProductImage product={item} />
                  </Link>
                  <div className="checkout-item-copy">
                    <Link to={`/products/${item.slug}`}>
                      <h3>{item.name}</h3>
                    </Link>
                    <p>{money(item.price)} each</p>
                    <div className="checkout-quantity">
                      <button aria-label={`Decrease ${item.name}`} onClick={() => update(item.slug, -1)}>
                        <Minus size={15} />
                      </button>
                      <span aria-live="polite">{item.qty}</span>
                      <button aria-label={`Increase ${item.name}`} onClick={() => update(item.slug, 1)}>
                        <Plus size={15} />
                      </button>
                      <button className="checkout-remove" aria-label={`Remove ${item.name}`} onClick={() => remove(item.slug)}>
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </div>
                  <strong>{money(item.price * item.qty)}</strong>
                </article>
              ))}
            </div>
          </section>
        </div>

        {/* Sidebar Summary */}
        <aside className="checkout-summary">
          <h2>Order summary</h2>
          <dl>
            <div>
              <dt>Products ({count})</dt>
              <dd>{money(subtotal)}</dd>
            </div>
            <div>
              <dt>Delivery</dt>
              <dd className="text-emerald-700 font-medium">FREE (Demo Promo)</dd>
            </div>
            <div>
              <dt>Taxes (GST)</dt>
              <dd>Included</dd>
            </div>
            <div className="checkout-total">
              <dt>Payable amount</dt>
              <dd>{money(subtotal)}</dd>
            </div>
          </dl>

          <button
            className="button button-dark demo-pay-button"
            disabled={!address || editing || paymentState === 'processing'}
            onClick={() => setPaymentState('processing')}
          >
            {paymentState === 'processing' ? (
              <>
                <span className="payment-spinner" aria-hidden="true" />
                Connecting to Gateway…
              </>
            ) : (
              <>
                Pay {money(subtotal)} with Demo Gateway <ArrowRight size={16} />
              </>
            )}
          </button>

          {(!address || editing) && (
            <small className="checkout-address-warning">
              Complete your delivery address above to proceed.
            </small>
          )}

          <div className="sidebar-gateway-guarantee">
            <ShieldCheck size={16} />
            <span>Instant sandbox simulation. No real money or cards charged.</span>
          </div>

          <Link to="/shipping" className="checkout-terms-link">Shipping & returns policy</Link>
        </aside>
      </div>
    </section>
  );
}
