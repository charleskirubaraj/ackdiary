/* ACK Diary service worker: app shell works offline. API calls are never cached (financial data). */
const CACHE = "ack-diary-v5";
const SHELL = ["/", "/budget", "/diary", "/transactions", "/reports", "/savings", "/reminders", "/settings", "/login", "/manifest.webmanifest", "/i18n.js", "/ack-extras.js", "/ack-config.js", "/auth-gate.js", "/login.js", "/brand/ack-logo-full.jpg", "/brand/ack-logo-mark.jpg", "/icons/icon-192.png"];

self.addEventListener("install", (e) => {
  e.waitUntil(caches.open(CACHE).then((c) => c.addAll(SHELL).catch(() => {})).then(() => self.skipWaiting()));
});

self.addEventListener("activate", (e) => {
  e.waitUntil(
    caches.keys().then((keys) => Promise.all(keys.filter((k) => k !== CACHE).map((k) => caches.delete(k)))).then(() => self.clients.claim()),
  );
});

self.addEventListener("fetch", (e) => {
  const req = e.request;
  const url = new URL(req.url);
  if (req.method !== "GET" || url.origin !== location.origin || url.pathname.startsWith("/api/")) return;
  // Network first, fall back to cache: users always get fresh code when online.
  e.respondWith(
    fetch(req)
      .then((res) => {
        if (res.ok) { const copy = res.clone(); caches.open(CACHE).then((c) => c.put(req, copy)); }
        return res;
      })
      .catch(() => caches.match(req).then((hit) => hit || (req.mode === "navigate" ? caches.match("/") : Response.error()))),
  );
});
