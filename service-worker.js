const cacheName = "registro-trator-v1";
const arquivosParaCache = [
  "./",
  "./registro_trator.html",
  "./manifest.json",
  "./icone.png"
];

self.addEventListener("install", event => {
  event.waitUntil(
    caches.open(cacheName).then(cache => {
      return cache.addAll(arquivosParaCache);
    })
  );
  console.log("✅ Service Worker instalado");
});

self.addEventListener("fetch", event => {
  event.respondWith(
    caches.match(event.request).then(response => {
      // Se tiver no cache, usa; senão, busca na rede
      return response || fetch(event.request);
    })
  );
});
