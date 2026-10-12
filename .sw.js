// Arcade Hub Service Worker - offline-capable, but always fresh hub pages.
// v4: adds the game boot-launcher page (.boot-launch.html) so every game launch
// plays the 2s boot. Hub HTML is network-first so edits show immediately; static
// assets are stale-while-revalidate. Bumping CACHE_NAME purges the old cache.
const CACHE_NAME = 'arcade-hub-v4';
const ASSETS = [
  './PRESSHERETOSTART.html',
  './.hub/.library1.html',
  './.hub/.settings.html',
  './.hub/.stats.html',
  './.hub/.notes.html',
  './.hub/.secrets.html',
  './.hub/.shortcuts.html',
  './.hub/.snake.html',
  './.hub/.soundboard.html',
  './.hub/.konami.html',
  './.hub/.login.html',
  './.hub/.calculator.html',
  './.hub/.keybinds.html',
  './.hub/.boot-launch.html',
  './.hub/.boot-transition.js',
  './.hub/.shared-features.js',
  './.hub/.arcade-features.js',
  './.manifest.json'
];

// Install - cache core assets
self.addEventListener('install', (e) => {
  e.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(ASSETS)).catch(() => {})
  );
  self.skipWaiting();
});

// Activate - clean old caches
self.addEventListener('activate', (e) => {
  e.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(keys.filter(k => k !== CACHE_NAME).map(k => caches.delete(k)))
    )
  );
  self.clients.claim();
});

// Fetch
self.addEventListener('fetch', (e) => {
  const req = e.request;
  if (req.method !== 'GET') return;

  const url = new URL(req.url);
  const isHtml = req.mode === 'navigate' || url.pathname.toLowerCase().endsWith('.html');

  // Hub pages / navigations: NETWORK-FIRST so edits show immediately.
  // Falls back to the cached copy when offline.
  if (isHtml) {
    e.respondWith(
      fetch(req)
        .then((res) => {
          const copy = res.clone();
          caches.open(CACHE_NAME).then((c) => c.put(req, copy)).catch(() => {});
          return res;
        })
        .catch(() => caches.match(req))
    );
    return;
  }

  // Everything else: cache-first, refreshed in the background (stale-while-revalidate).
  e.respondWith(
    caches.match(req).then((cached) => {
      const network = fetch(req)
        .then((res) => {
          const copy = res.clone();
          caches.open(CACHE_NAME).then((c) => c.put(req, copy)).catch(() => {});
          return res;
        })
        .catch(() => cached);
      return cached || network;
    })
  );
});

// Message handler for manual cache updates
self.addEventListener('message', (e) => {
  if (e.data === 'skipWaiting') self.skipWaiting();
  if (e.data === 'cacheGames' && e.data.urls) cacheGames(e.data.urls);
});

async function cacheGames(urls) {
  const cache = await caches.open(CACHE_NAME + '-games');
  await cache.addAll(urls);
}
