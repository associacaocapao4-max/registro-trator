
const cacheName = "registro-trator-v2";

const arquivosParaCache = [
  "./",
  "./index.html",
  "./manifest.json",
  "./APPMCV.png",
  "./APPMCV_192x192.png",
  "./APPMCV_512x512.png"
];

self.addEventListener("install", event => {
  event.waitUntil(
    caches.open(cacheName).then(cache => {
      return cache.addAll(arquivosParaCache);
    })
  );

  self.skipWaiting();
  console.log("✅ Service Worker instalado");
});

self.addEventListener("activate", event => {
  event.waitUntil(
    caches.keys().then(chaves =>
      Promise.all(
        chaves
          .filter(chave =>
            chave.startsWith("registro-trator-") &&
            chave !== cacheName
          )
          .map(chave => caches.delete(chave))
      )
    ).then(() => self.clients.claim())
  );
});

self.addEventListener("fetch", event => {
  if (event.request.method !== "GET") return;

  event.respondWith(
    caches.match(event.request).then(response => {
      return response || fetch(event.request);
    })
  );
});