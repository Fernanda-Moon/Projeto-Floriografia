const CACHE_NAME = "floriografia-v3";   

const ASSETS = [
  "/",
  "/index.html",
  "/css/style.css",
  "/js/app.js",
  "/js/api.js",
  "/manifest.json"
];

/* ---------- INSTALL ---------- */
self.addEventListener("install", (e) => {
  e.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => cache.addAll(ASSETS).catch(() => {}))
      .then(() => self.skipWaiting())
  );
});

/* ---------- ACTIVATE ---------- */
self.addEventListener("activate", (e) => {
  e.waitUntil(
    caches.keys()
      .then((keys) =>
        Promise.all(keys.filter((k) => k !== CACHE_NAME).map((k) => caches.delete(k)))
      )
      .then(() => self.clients.claim())
  );
});

/* ---------- FETCH ---------- */
self.addEventListener("fetch", (e) => {
  const url = e.request.url;

  // 1) Nunca intercepta APIs (deixa passar direto pro backend)
  if (
    url.includes("/graphql") ||
    url.includes("/auth") ||
    url.includes("/favoritos") ||
    url.includes("/buques") ||
    url.includes("/flores") ||
    url.includes("/significados") ||
    url.includes("/ocasioes") ||
    url.includes("/usuarios") ||
    url.includes("/lembretes")
  ) {
    return;
  }

  // 2) Só lida com GET
  if (e.request.method !== "GET") return;

  // 3) HTML/JS/CSS → network-first (sempre pega a versão nova se possível)
  const isAppShell =
    url.endsWith(".html") ||
    url.endsWith(".js") ||
    url.endsWith(".css") ||
    url.endsWith("/") ||
    url.includes("/js/") ||
    url.includes("/css/");

  if (isAppShell) {
    e.respondWith(
      fetch(e.request)
        .then((res) => {
          // Guarda no cache pra fallback offline
          const clone = res.clone();
          caches.open(CACHE_NAME).then((c) => c.put(e.request, clone));
          return res;
        })
        .catch(() => caches.match(e.request))
    );
    return;
  }

  // 4) Imagens, fontes, etc. → cache-first
  e.respondWith(
    caches.match(e.request).then((cached) => {
      if (cached) return cached;
      return fetch(e.request).then((res) => {
        const clone = res.clone();
        caches.open(CACHE_NAME).then((c) => c.put(e.request, clone));
        return res;
      });
    })
  );
});
