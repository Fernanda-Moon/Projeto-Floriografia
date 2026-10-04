const CACHE_NAME = "floriografia-v1";
const ASSETS = ["/", "/index.html", "/css/style.css", "/js/app.js",
"/js/api.js"];
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
 caches.keys().then((keys) =>
 Promise.all(keys.filter((k) => k !== CACHE_NAME).map((k) =>
caches.delete(k)))
 ).then(() => self.clients.claim())
 );
});
self.addEventListener("fetch", (e) => {
 const url = e.request.url;
 // Não intercepta APIs
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