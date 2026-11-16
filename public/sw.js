/*
 * Service worker for anishseth.xyz: makes repeat visits instant and keeps the site usable on slow,
 * flaky or no connections.
 *
 * - Build files (/_next/static, content-hashed): cache first, they never change.
 * - Images, icons and fonts: served from cache straight away, refreshed in the background.
 * - Pages: network first. If the network is slow and a saved copy exists, the saved copy is shown
 *   after a few seconds (and quietly updated). With no connection and no copy, an offline page.
 * - Anything else (the contact form API, analytics, Next's navigation data) goes straight to the
 *   network, untouched.
 *
 * To retire it: replace this file with one that calls self.registration.unregister().
 */
const VERSION = "v1";
const STATIC = `static-${VERSION}`;
const ASSETS = `assets-${VERSION}`;
const PAGES = `pages-${VERSION}`;
const OFFLINE = "/offline.html";
const SLOW_NETWORK_MS = 3500;

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches
      .open(PAGES)
      .then((cache) => cache.add(OFFLINE))
      .then(() => self.skipWaiting()),
  );
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    (async () => {
      const keep = [STATIC, ASSETS, PAGES];
      for (const key of await caches.keys()) if (!keep.includes(key)) await caches.delete(key);
      if (self.registration.navigationPreload) await self.registration.navigationPreload.enable();
      await self.clients.claim();
    })(),
  );
});

self.addEventListener("fetch", (event) => {
  const { request } = event;
  if (request.method !== "GET") return;
  const url = new URL(request.url);
  if (url.origin !== self.location.origin) return;
  if (url.pathname.startsWith("/api/") || url.pathname.startsWith("/_vercel/") || url.pathname === "/sw.js") return;
  // Next's client-side navigation data must always match the current build: leave it to the network.
  if (url.searchParams.has("_rsc") || request.headers.get("RSC") === "1") return;

  if (request.mode === "navigate") {
    event.respondWith(page(event));
  } else if (url.pathname.startsWith("/_next/static/")) {
    event.respondWith(cacheFirst(request));
  } else if (url.pathname.startsWith("/_next/image") || url.pathname.startsWith("/brand/") || /\.(?:png|jpe?g|webp|avif|svg|ico|woff2?)$/.test(url.pathname)) {
    event.respondWith(staleWhileRevalidate(event));
  }
});

/** Keep a cache from growing forever: drop the oldest entries past `max`. */
async function trim(name, max) {
  const cache = await caches.open(name);
  const keys = await cache.keys();
  for (let i = 0; i < keys.length - max; i++) await cache.delete(keys[i]);
}

async function cacheFirst(request) {
  const cache = await caches.open(STATIC);
  const hit = await cache.match(request);
  if (hit) return hit;
  const res = await fetch(request);
  if (res.ok) {
    await cache.put(request, res.clone());
    trim(STATIC, 200);
  }
  return res;
}

async function staleWhileRevalidate(event) {
  const cache = await caches.open(ASSETS);
  const hit = await cache.match(event.request);
  const refresh = fetch(event.request)
    .then(async (res) => {
      if (res.ok) {
        await cache.put(event.request, res.clone());
        trim(ASSETS, 120);
      }
      return res;
    })
    .catch(() => hit);
  if (hit) {
    event.waitUntil(refresh);
    return hit;
  }
  return refresh;
}

async function page(event) {
  const cache = await caches.open(PAGES);
  const network = (async () => {
    const res = (await event.preloadResponse) || (await fetch(event.request));
    if (res && res.ok && res.type === "basic") {
      await cache.put(event.request, res.clone());
      trim(PAGES, 40);
    }
    return res;
  })();
  event.waitUntil(network.catch(() => {}));

  const saved = await cache.match(event.request, { ignoreSearch: true });
  if (!saved) {
    // Never seen this page: wait for the network however slow it is, offline page only if it fails.
    try {
      return await network;
    } catch {
      return (await cache.match(OFFLINE)) || Response.error();
    }
  }
  // Seen before: give the network a few seconds, then show the saved copy (it still updates).
  const slow = new Promise((resolve) => setTimeout(() => resolve(null), SLOW_NETWORK_MS));
  try {
    return (await Promise.race([network, slow])) || saved;
  } catch {
    return saved;
  }
}
