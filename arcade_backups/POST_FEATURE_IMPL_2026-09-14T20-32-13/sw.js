// Arcade Hub Service Worker - Offline-first caching
const CACHE_NAME = 'arcade-hub-v1';
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
  './manifest.json'
];

// Install - cache core assets
self.addEventListener('install', (e) => {
  e.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(ASSETS))
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

// Fetch - cache-first for known assets, network-first for games
self.addEventListener('fetch', (e) => {
  const url = new URL(e.request.url);
  
  // Skip non-GET
  if (e.request.method !== 'GET') return;
  
  // Cache-first for hub assets
  if (ASSETS.some(a => url.pathname.endsWith(a.replace('./', '')))) {
    e.respondWith(
      caches.match(e.request).then((res) => res || fetch(e.request))
    );
    return;
  }
  
  // Network-first for game files (large, may not be cached)
  if (url.pathname.includes('/offline/') || url.pathname.includes('.library2/')) {
    e.respondWith(
      fetch(e.request).catch(() => caches.match(e.request))
    );
    return;
  }
  
  // Default: network-first
  e.respondWith(
    fetch(e.request).catch(() => caches.match(e.request))
  );
});

// Message handler for manual cache updates
self.addEventListener('message', (e) => {
  if (e.data === 'skipWaiting') self.skipWaiting();
  if (e.data === 'cacheGames') cacheGames(e.data.urls);
});

async function cacheGames(urls) {
  const cache = await caches.open(CACHE_NAME + '-games');
  await cache.addAll(urls);
}