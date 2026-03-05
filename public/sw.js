// Minimal Service Worker for PWA compliance and installation support
const CACHE_NAME = 'kl59-cache-v1';

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      // Basic core assets to cache
      return cache.addAll([
        '/',
        '/manifest.webmanifest',
      ]).catch(() => {
        // Fallback for failed addAll
      });
    })
  );
});

self.addEventListener('fetch', (event) => {
  // Basic fetch handler (Pass-through to network)
  event.respondWith(
    fetch(event.request).catch(() => {
      return caches.match(event.request);
    })
  );
});
