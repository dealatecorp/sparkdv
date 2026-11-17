import { useEffect, useState, type FormEvent } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, ArrowRight, ArrowUpRight, Check, MessageCircle, Package, RefreshCw, Truck } from 'lucide-react';
import { money } from '../data';
import { nextOrderCheckpoint, orderCheckpoints, orderReference } from '../lib/order-status';
import { orderRequest, whatsappOrderDraft, type Order, type OrderStatus, type OrderSummary } from '../lib/orders';
import './orders-page.css';

const dateFormat = new Intl.DateTimeFormat('en-IN', { dateStyle: 'medium', timeStyle: 'short' });

function OrderBadge({ status }: { status: OrderStatus }) {
  return <span className="order-status" data-status={status}>{orderCheckpoints[status].label}</span>;
}

function OrderDate({ value }: { value: string }) {
  return <time dateTime={value}>{dateFormat.format(new Date(value))}</time>;
}

function StaffCheckpointForm({ order, onOrder }: { order: Order; onOrder: (order: Order) => void }) {
  const next = nextOrderCheckpoint(order.status) as OrderStatus | null;
  const [status, setStatus] = useState('');
  const [pending, setPending] = useState(false);
  const [error, setError] = useState('');

  async function save(body: object) {
    setPending(true);
    setError('');
    try {
      const result = await orderRequest<{ order: Order }>({ staff: '1' }, body);
      onOrder(result.order);
      setStatus('');
    } catch (failure) {
      setError(failure instanceof Error ? failure.message : 'The checkpoint couldn’t be saved.');
    } finally {
      setPending(false);
    }
  }

  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const shipping = Object.fromEntries(new FormData(event.currentTarget));
    void save({ action: 'checkpoint', id: order.id, expected: order.status, status, ...shipping });
  }

  return (
    <section className="order-panel" aria-labelledby="manage-checkpoint">
      <h2 id="manage-checkpoint">Update order</h2>
      {next ? (
        <form className="order-staff-form" onSubmit={submit}>
          <label>Checkpoint
            <select value={status} onChange={event => setStatus(event.target.value)} required disabled={pending}>
              <option value="">Choose a checkpoint</option>
              <option value={next}>{orderCheckpoints[next].label}</option>
              <option value="cancelled">Order cancelled</option>
            </select>
          </label>
          {status === 'dispatched' && (
            <>
              <label>Courier <input name="carrier" maxLength={100} /></label>
              <label>Tracking number <input name="trackingNumber" maxLength={100} /></label>
              <label>Courier tracking link <input name="trackingUrl" type="url" placeholder="https://" maxLength={500} /></label>
            </>
          )}
          <button className="button button-dark" disabled={pending || !status}>{pending ? 'Saving…' : 'Save and notify customer'}</button>
        </form>
      ) : <p>This order is complete.</p>}
      {error && <p className="order-error" role="alert">{error}</p>}
      {order.events.some(event => event.email_status === 'failed') && (
        <div className="order-email-retries">
          <h3>Emails that need attention</h3>
          {order.events.filter(event => event.email_status === 'failed').map(event => (
            <button
              type="button"
              className="button button-outline"
              key={event.seq}
              disabled={pending || Date.now() - Date.parse(event.created_at) >= 23 * 60 * 60 * 1000}
              onClick={() => void save({ action: 'retry-email', id: order.id, status: event.status })}
            >
              Retry email · {orderCheckpoints[event.status].label}
            </button>
          ))}
        </div>
      )}
    </section>
  );
}

function OrderTracking({ order, staff, onOrder }: { order: Order; staff: boolean; onOrder: (order: Order) => void }) {
  const checkpoints = (Object.keys(orderCheckpoints) as OrderStatus[]).filter(status =>
    order.status === 'cancelled' ? order.events.some(event => event.status === status) : status !== 'cancelled'
  );
  const dispatch = order.events.find(event => event.status === 'dispatched');
  return (
    <div className="order-detail-layout">
      <div className="order-detail-main">
        <section className="order-panel" aria-labelledby="order-progress">
          <h2 id="order-progress">Order progress</h2>
          <ol className="order-timeline">
            {checkpoints.map(status => {
              const event = order.events.find(item => item.status === status);
              const checkpoint = orderCheckpoints[status];
              return (
                <li key={status} data-completed={Boolean(event)} data-current={order.status === status} aria-current={order.status === status ? 'step' : undefined}>
                  <span className="order-timeline-icon" aria-hidden="true">{event && <Check size={14} />}</span>
                  <div>
                    <h3>{checkpoint.label}</h3>
                    {event && (
                      <>
                        <OrderDate value={event.created_at} />
                        <p>{checkpoint.message}</p>
                        {staff && <small>{event.email_status === 'sent' ? 'Email submitted' : event.email_status === 'failed' ? 'Email failed' : 'Email not submitted'}</small>}
                      </>
                    )}
                  </div>
                </li>
              );
            })}
          </ol>
          {!staff && order.status === 'placed' && (
            <a className="button checkout-whatsapp" href={whatsappOrderDraft(order)} target="_blank" rel="noopener noreferrer">
              <MessageCircle size={18} aria-hidden="true" /> Open WhatsApp draft
            </a>
          )}
        </section>
        {staff && <StaffCheckpointForm key={order.status} order={order} onOrder={onOrder} />}
      </div>
      <div className="order-detail-side">
        {dispatch && (dispatch.carrier || dispatch.tracking_number || dispatch.tracking_url) && (
          <section className="order-panel" aria-labelledby="courier-details">
            <h2 id="courier-details"><Truck size={20} aria-hidden="true" /> Courier details</h2>
            {dispatch.carrier && <p>{dispatch.carrier}</p>}
            {dispatch.tracking_number && <p>Tracking number <strong>{dispatch.tracking_number}</strong></p>}
            {dispatch.tracking_url && <a className="profile-inline-link" href={dispatch.tracking_url} target="_blank" rel="noopener noreferrer">Track with courier <ArrowUpRight size={15} aria-hidden="true" /></a>}
          </section>
        )}
        <section className="order-panel" aria-labelledby="ordered-items">
          <h2 id="ordered-items">Items in this order</h2>
          <ul className="order-items-list">
            {order.items.map(item => (
              <li key={item.slug}>
                <img src={item.img} alt="" width={56} height={56} loading="lazy" />
                <div><Link to={`/products/${item.slug}`}>{item.name}</Link><small>Quantity {item.qty}</small></div>
                <strong>{money(item.price == null ? null : item.price * item.qty)}</strong>
              </li>
            ))}
          </ul>
          <dl className="order-subtotal"><dt>Product subtotal</dt><dd>{money(order.subtotal)}</dd></dl>
        </section>
        {staff && order.customer && (
          <section className="order-panel" aria-labelledby="order-customer">
            <h2 id="order-customer">Customer</h2>
            <strong>{order.customer.name}</strong>
            <p>{order.customer.email}</p>
            {order.customer.mobile && <p>{order.customer.mobile}</p>}
          </section>
        )}
      </div>
    </div>
  );
}

export default function OrdersPage({ id, staff = false }: { id?: string; staff?: boolean }) {
  const [page, setPage] = useState(1);
  const [revision, setRevision] = useState(0);
  const [order, setOrder] = useState<Order | null>(null);
  const [orders, setOrders] = useState<OrderSummary[]>([]);
  const [hasMore, setHasMore] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);
  const base = staff ? '/manage/orders' : '/orders';

  useEffect(() => {
    const controller = new AbortController();
    function reload() {
      const params = { ...(staff && { staff: '1' }), ...(id ? { id } : { page: String(page) }) };
      setError('');
      orderRequest<{ order?: Order; orders?: OrderSummary[]; hasMore?: boolean }>(params, undefined, controller.signal)
        .then(result => {
          if (controller.signal.aborted) return;
          setOrder(result.order ?? null);
          setOrders(result.orders ?? []);
          setHasMore(Boolean(result.hasMore));
        })
        .catch(failure => { if (!controller.signal.aborted) setError(failure.message); })
        .finally(() => { if (!controller.signal.aborted) setLoading(false); });
    }
    reload();
    function visible() {
      if (!staff && document.visibilityState === 'visible') reload();
    }
    document.addEventListener('visibilitychange', visible);
    return () => {
      controller.abort();
      document.removeEventListener('visibilitychange', visible);
    };
  }, [id, page, revision, staff]);

  function showPage(number: number) {
    setLoading(true);
    setPage(number);
  }

  return (
    <section className="orders-shell wrap" aria-labelledby="orders-title">
      <Link className="orders-back" to={id ? base : '/profile'}><ArrowLeft size={16} aria-hidden="true" /> {id ? (staff ? 'Manage orders' : 'My orders') : 'Profile'}</Link>
      <header className="orders-heading">
        <div>
          <h1 id="orders-title">{id ? (staff ? 'Order details' : 'Track order') : (staff ? 'Manage orders' : 'My orders')}</h1>
          {order && <p><strong>{orderReference(order.id)}</strong> · <OrderDate value={order.created_at} /></p>}
          {!id && <p>{staff ? 'Review orders and record delivery checkpoints.' : 'Track your orders and read delivery updates.'}</p>}
        </div>
        <button className="button button-outline order-refresh" type="button" onClick={() => setRevision(value => value + 1)} disabled={loading}>
          <RefreshCw size={16} aria-hidden="true" /> Refresh
        </button>
      </header>
      {loading && <p role="status">Loading orders…</p>}
      {error && <p className="order-error" role="alert">{error}</p>}
      {order && <OrderTracking order={order} staff={staff} onOrder={setOrder} />}
      {!id && !loading && !error && (
        orders.length ? (
          <>
            <ul className="orders-list">
              {orders.map(item => (
                <li key={item.id}>
                  <Link className="order-list-card" to={`${base}/${item.id}`}>
                    <img src={item.items[0].img} alt="" width={64} height={64} loading="lazy" />
                    <span className="order-list-description">
                      <strong>{orderReference(item.id)}</strong>
                      <span>{item.customer ? item.customer.name : item.items[0].name}{item.items.length > 1 && !item.customer ? ` + ${item.items.length - 1} more` : ''}</span>
                      <OrderDate value={item.created_at} />
                    </span>
                    <span className="order-list-status"><OrderBadge status={item.status} /><strong>{money(item.subtotal)}</strong></span>
                    <span className="order-list-action">{staff ? 'View order' : 'Track order'} <ArrowRight size={16} aria-hidden="true" /></span>
                  </Link>
                </li>
              ))}
            </ul>
            {(page > 1 || hasMore) && <nav className="order-pagination" aria-label="Order pages">
              <button type="button" className="button button-outline" disabled={page === 1} onClick={() => showPage(page - 1)}>Previous</button>
              <span>Page {page}</span>
              <button type="button" className="button button-outline" disabled={!hasMore} onClick={() => showPage(page + 1)}>Next</button>
            </nav>}
          </>
        ) : (
          <div className="order-panel orders-empty">
            <Package size={32} aria-hidden="true" />
            <h2>No orders yet</h2>
            <p>{staff ? 'New orders will appear here.' : 'Orders you place through the website will appear here.'}</p>
            {!staff && <Link className="button button-dark" to="/products">Shop products <ArrowRight size={16} aria-hidden="true" /></Link>}
          </div>
        )
      )}
    </section>
  );
}
