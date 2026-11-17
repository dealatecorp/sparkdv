import { useEffect, useState } from 'react';
import { Bell, BellOff } from 'lucide-react';
import { orderRequest } from '../lib/orders';
import { BrandWordmark } from './ui/brand-wordmark';

const preference = 'sparkdv-order-alerts-account';
const supported = typeof window !== 'undefined' &&
  'serviceWorker' in navigator && 'PushManager' in window && 'Notification' in window;

function decodeKey(key: string) {
  return Uint8Array.from(atob(key.replace(/-/g, '+').replace(/_/g, '/')), letter => letter.charCodeAt(0)).buffer;
}

export default function OrderAlerts({ userId, pushKey }: { userId: string; pushKey: string }) {
  const [registration, setRegistration] = useState<ServiceWorkerRegistration | null>(null);
  const [enabled, setEnabled] = useState(false);
  const [pending, setPending] = useState(false);
  const [message, setMessage] = useState('');

  useEffect(() => {
    if (!supported) return;
    let current = true;
    async function prepare() {
      try {
        await navigator.serviceWorker.register('/order-alerts.js');
        const worker = await navigator.serviceWorker.ready;
        const subscription = await worker.pushManager.getSubscription();
        let savedAccount;
        try { savedAccount = localStorage.getItem(preference); } catch { /* Storage may be blocked. */ }
        if (current) {
          setRegistration(worker);
          setEnabled(Boolean(subscription && savedAccount === userId && Notification.permission === 'granted'));
        }
      } catch {
        if (current) setMessage('Browser alerts couldn’t start. You can still read updates here.');
      }
    }
    void prepare();
    return () => { current = false; };
  }, [userId]);

  async function toggle() {
    if (!registration || pending) return;
    setPending(true);
    setMessage('');
    try {
      if (enabled) {
        const subscription = await registration.pushManager.getSubscription();
        if (subscription) {
          await orderRequest({}, { action: 'disable-alerts', endpoint: subscription.endpoint });
          await subscription.unsubscribe().catch(() => false);
        }
        setEnabled(false);
        try { localStorage.removeItem(preference); } catch { /* The server already removed the subscription. */ }
        return;
      }
      if (await Notification.requestPermission() !== 'granted') {
        setMessage('Allow notifications for this site in your browser settings and try again.');
        return;
      }
      const subscription = await registration.pushManager.getSubscription() ??
        await registration.pushManager.subscribe({ userVisibleOnly: true, applicationServerKey: decodeKey(pushKey) });
      await orderRequest({}, { action: 'enable-alerts', subscription: subscription.toJSON() });
      try { localStorage.setItem(preference, userId); } catch { /* The server already saved the subscription. */ }
      setEnabled(true);
    } catch (failure) {
      setMessage(failure instanceof Error && failure.name === 'Error'
        ? failure.message : 'This browser couldn’t enable alerts. You can still read updates here.');
    } finally {
      setPending(false);
    }
  }

  return (
    <section className="order-alert-controls" aria-label="Order alerts">
      <div>
        <strong>Browser alerts</strong>
        <p>{supported
          ? enabled ? 'Order updates are enabled on this device.' : 'Get a notification when an order reaches a new checkpoint.'
          : <>Browser alerts require a supported browser. On iPhone or iPad, open <BrandWordmark /> from your Home Screen.</>}</p>
        {message && <p role="status">{message}</p>}
      </div>
      {supported && (
        <button className="button button-outline" type="button" disabled={pending || !registration} onClick={toggle}>
          {enabled ? <BellOff size={16} aria-hidden="true" /> : <Bell size={16} aria-hidden="true" />}
          {pending ? 'Saving…' : enabled ? 'Turn off alerts' : 'Enable browser alerts'}
        </button>
      )}
    </section>
  );
}
