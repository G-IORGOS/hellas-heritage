/*
 * HELLAS HERITAGE — Service Worker v1.0
 * Offline caching + Push Notifications
 */

const CACHE_VERSION = 'hh-v1.0';
const STATIC_CACHE  = `${CACHE_VERSION}-static`;
const DYNAMIC_CACHE = `${CACHE_VERSION}-dynamic`;
const IMG_CACHE     = `${CACHE_VERSION}-images`;

// ── Assets to pre-cache (shell) ───────────────────────────────────────────
const STATIC_ASSETS = [
  '/',
  '/index.html',
  '/regions.html',
  '/costumes.html',
  '/customs.html',
  '/map.html',
  '/viewer-3d.html',
  '/pricing.html',
  '/login.html',
  '/css/style.css',
  '/js/app.js',
  '/js/data.js',
  '/js/supabase.js',
  '/manifest.json',
  '/icons/icon-192.png',
  '/icons/icon-512.png',
  // Leaflet (cached from CDN)
  'https://unpkg.com/leaflet@1.9.4/dist/leaflet.css',
  'https://unpkg.com/leaflet@1.9.4/dist/leaflet.js',
];

// ── Install: pre-cache static assets ─────────────────────────────────────
self.addEventListener('install', event => {
  console.log('[SW] Installing Hellas Heritage v1.0...');
  event.waitUntil(
    caches.open(STATIC_CACHE)
      .then(cache => {
        console.log('[SW] Pre-caching static assets');
        return cache.addAll(STATIC_ASSETS.map(url => new Request(url, { credentials: 'same-origin' })));
      })
      .catch(err => console.warn('[SW] Pre-cache partial failure:', err))
      .then(() => self.skipWaiting())
  );
});

// ── Activate: clean old caches ────────────────────────────────────────────
self.addEventListener('activate', event => {
  console.log('[SW] Activating...');
  event.waitUntil(
    caches.keys().then(keys =>
      Promise.all(
        keys.filter(k => k !== STATIC_CACHE && k !== DYNAMIC_CACHE && k !== IMG_CACHE)
            .map(k => { console.log('[SW] Deleting old cache:', k); return caches.delete(k); })
      )
    ).then(() => self.clients.claim())
  );
});

// ── Fetch: Network-first for pages, Cache-first for assets ────────────────
self.addEventListener('fetch', event => {
  const { request } = event;
  const url = new URL(request.url);

  // Skip non-GET and Supabase API calls (always live)
  if (request.method !== 'GET') return;
  if (url.hostname.includes('supabase.co')) return;
  if (url.hostname.includes('openstreetmap.org')) {
    // Cache OSM map tiles aggressively
    event.respondWith(tileStrategy(request));
    return;
  }

  // Images: Cache-first, fallback to placeholder
  if (request.destination === 'image') {
    event.respondWith(imageStrategy(request));
    return;
  }

  // HTML pages: Network-first, fallback to cache
  if (request.destination === 'document' || url.pathname.endsWith('.html') || url.pathname === '/') {
    event.respondWith(networkFirst(request));
    return;
  }

  // CSS / JS / fonts: Stale-while-revalidate
  event.respondWith(staleWhileRevalidate(request));
});

// ── Strategy: Network-first ───────────────────────────────────────────────
async function networkFirst(request) {
  try {
    const response = await fetch(request);
    if (response.ok) {
      const cache = await caches.open(DYNAMIC_CACHE);
      cache.put(request, response.clone());
    }
    return response;
  } catch {
    const cached = await caches.match(request);
    return cached || offlineFallback(request);
  }
}

// ── Strategy: Stale-while-revalidate ─────────────────────────────────────
async function staleWhileRevalidate(request) {
  const cache  = await caches.open(STATIC_CACHE);
  const cached = await cache.match(request);

  const fetchPromise = fetch(request).then(response => {
    if (response.ok) cache.put(request, response.clone());
    return response;
  }).catch(() => null);

  return cached || fetchPromise;
}

// ── Strategy: Cache-first for images ─────────────────────────────────────
async function imageStrategy(request) {
  const cache  = await caches.open(IMG_CACHE);
  const cached = await cache.match(request);
  if (cached) return cached;

  try {
    const response = await fetch(request);
    if (response.ok) cache.put(request, response.clone());
    return response;
  } catch {
    // Return offline image placeholder (inline SVG)
    return new Response(
      `<svg xmlns="http://www.w3.org/2000/svg" width="400" height="300" viewBox="0 0 400 300">
        <rect width="400" height="300" fill="#F4F2EE"/>
        <text x="200" y="140" text-anchor="middle" font-family="serif" font-size="48">🏛</text>
        <text x="200" y="185" text-anchor="middle" font-family="serif" font-size="14" fill="#9A9893">Χωρίς σύνδεση</text>
      </svg>`,
      { headers: { 'Content-Type': 'image/svg+xml' } }
    );
  }
}

// ── Strategy: OSM map tiles ───────────────────────────────────────────────
async function tileStrategy(request) {
  const cache  = await caches.open(IMG_CACHE);
  const cached = await cache.match(request);
  if (cached) return cached;
  try {
    const response = await fetch(request);
    if (response.ok) cache.put(request, response.clone());
    return response;
  } catch {
    return new Response('', { status: 503 });
  }
}

// ── Offline fallback page ─────────────────────────────────────────────────
function offlineFallback() {
  return new Response(`
<!DOCTYPE html>
<html lang="el">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>Hellas Heritage — Εκτός σύνδεσης</title>
  <style>
    * { margin:0; padding:0; box-sizing:border-box; }
    body {
      min-height: 100vh;
      display: flex; flex-direction: column; align-items: center; justify-content: center;
      background: #FAF6EE; font-family: Georgia, serif; color: #0B1D35;
      text-align: center; padding: 2rem;
    }
    .logo { font-size: 3rem; margin-bottom: 1rem; }
    h1 { font-size: 1.8rem; margin-bottom: .75rem; }
    p  { color: #58574F; font-size: 1rem; line-height: 1.6; max-width: 400px; margin-bottom: 2rem; }
    .btn {
      display: inline-block; padding: .75rem 2rem;
      background: linear-gradient(135deg, #C9A030, #A87B10);
      color: white; border-radius: 50px; font-size: .95rem; font-weight: 700;
      text-decoration: none; cursor: pointer; border: none;
    }
    .tagline { margin-top: 2rem; font-size: .8rem; color: #9A9893; letter-spacing: 1px; text-transform: uppercase; }
  </style>
</head>
<body>
  <div class="logo">🏛</div>
  <h1>Hellas Heritage</h1>
  <p>Φαίνεται ότι δεν υπάρχει σύνδεση στο διαδίκτυο. Οι σελίδες που επισκέφθηκες πρόσφατα είναι διαθέσιμες εκτός σύνδεσης.</p>
  <button class="btn" onclick="window.location.reload()">↻ Δοκίμασε ξανά</button>
  <p class="tagline">Η ελληνική παράδοση σε κάθε γωνιά</p>
</body>
</html>`, { headers: { 'Content-Type': 'text/html; charset=utf-8' } });
}

// ══════════════════════════════════════════════════════════════════════════
//  PUSH NOTIFICATIONS
// ══════════════════════════════════════════════════════════════════════════

self.addEventListener('push', event => {
  let data = { title: 'Hellas Heritage', body: 'Νέο περιεχόμενο διαθέσιμο!', icon: '/icons/icon-192.png', badge: '/icons/icon-96.png', url: '/' };

  if (event.data) {
    try { Object.assign(data, event.data.json()); }
    catch { data.body = event.data.text(); }
  }

  const options = {
    body:    data.body,
    icon:    data.icon    || '/icons/icon-192.png',
    badge:   data.badge   || '/icons/icon-96.png',
    image:   data.image,
    tag:     data.tag     || 'hh-notification',
    data:    { url: data.url || '/' },
    actions: data.actions || [
      { action: 'open',    title: 'Άνοιγμα' },
      { action: 'dismiss', title: 'Απόρριψη' },
    ],
    vibrate: [100, 50, 100],
    requireInteraction: false,
  };

  event.waitUntil(
    self.registration.showNotification(data.title, options)
  );
});

self.addEventListener('notificationclick', event => {
  event.notification.close();

  if (event.action === 'dismiss') return;

  const targetUrl = event.notification.data?.url || '/';

  event.waitUntil(
    clients.matchAll({ type: 'window', includeUncontrolled: true }).then(clientList => {
      for (const client of clientList) {
        if (client.url.includes(self.registration.scope) && 'focus' in client) {
          client.navigate(targetUrl);
          return client.focus();
        }
      }
      if (clients.openWindow) return clients.openWindow(targetUrl);
    })
  );
});

// ── Background Sync (for offline form submissions) ────────────────────────
self.addEventListener('sync', event => {
  if (event.tag === 'hh-sync-favorites') {
    event.waitUntil(syncFavorites());
  }
});

async function syncFavorites() {
  // Placeholder: sync pending favorites when back online
  console.log('[SW] Syncing pending favorites...');
}

// ── Periodic Background Sync (new content check) ─────────────────────────
self.addEventListener('periodicsync', event => {
  if (event.tag === 'hh-content-update') {
    event.waitUntil(checkForNewContent());
  }
});

async function checkForNewContent() {
  try {
    const response = await fetch('/js/data.js', { cache: 'no-store' });
    if (response.ok) {
      const cache = await caches.open(STATIC_CACHE);
      await cache.put('/js/data.js', response);
      console.log('[SW] Data updated via periodic sync');
    }
  } catch (e) {
    console.log('[SW] Periodic sync failed:', e);
  }
}
