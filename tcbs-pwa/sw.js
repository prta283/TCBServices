// Self-destructing SW — clears ALL old caches then unregisters itself
// This ensures users always get fresh files from network
self.addEventListener('install', () => self.skipWaiting());
self.addEventListener('activate', async () => {
  const keys = await caches.keys();
  await Promise.all(keys.map(k => caches.delete(k)));
  await self.registration.unregister();
  self.clients.matchAll().then(clients => clients.forEach(c => c.navigate(c.url)));
});
self.addEventListener('fetch', e => e.respondWith(fetch(e.request).catch(() => caches.match(e.request))));
