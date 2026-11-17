self.addEventListener('push', event => {
  event.waitUntil((async () => {
    try {
      const message = event.data?.json();
      if (!message || !/^\/orders\/[a-f0-9-]{36}$/.test(message.path)) return;
      const response = await fetch('/api/auth', { cache: 'no-store' });
      const { user } = await response.json();
      if (user?.id !== message.recipient) return;
      await self.registration.showNotification(message.title, {
        body: message.body,
        icon: '/images/logo.png',
        tag: message.tag,
        data: { path: message.path },
      });
    } catch {
      // If the account can't be verified, keep the update in My orders.
    }
  })());
});

self.addEventListener('notificationclick', event => {
  event.notification.close();
  const path = event.notification.data?.path;
  if (!/^\/orders\/[a-f0-9-]{36}$/.test(path)) return;
  event.waitUntil((async () => {
    const url = new URL(path, self.location.origin).href;
    const tabs = await self.clients.matchAll({ type: 'window', includeUncontrolled: true });
    const open = tabs.find(tab => tab.url === url);
    return open ? open.focus() : self.clients.openWindow(url);
  })());
});
