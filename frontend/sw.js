/* Service Worker — Floriografia PWA */
const CACHE_NAME = "floriografia-v1";

// Escopo do SW (ex: /Projeto-Floriografia/). Usa isso para resolver os assets.
const SCOPE = self.registration.scope; // ex: "https://fernanda-moon.github.io/Projeto-Floriografia/"

const ASSETS = [
  SCOPE,
  SCOPE + "index.html",
  SCOPE + "css/style.css",
  SCOPE + "js/app.js",
  SCOPE + "js/api.js",
  SCOPE + "manifest.json"
];

self.addEventListener("install", (e) => {
  e.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => cache.addAll(ASSETS))
      .then(() => self.skipWaiting())
      .catch(() => { /* silencioso */ })
  );
});

self.addEventListener("activate", (e) => {
  e.waitUntil(
    caches.keys()
      .then((keys) => Promise.all(keys.filter((k) => k !== CACHE_NAME).map((k) => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

self.addEventListener("fetch", (e) => {
  const url = e.request.url;

  // Não intercepta requisições de API / GraphQL / auth
  if (url.includes("/graphql") || url.includes("/auth") ||
      url.includes("/favoritos") || url.includes("/buques") ||
      url.includes("/flores") || url.includes("/significados") ||
      url.includes("/ocasioes")) {
    return;
  }

  e.respondWith(
    caches.match(e.request).then((r) => r || fetch(e.request))
  );
});
