self.addEventListener("install", e=>{
  e.waitUntil(
    caches.open("motion-game").then(cache=>{
      return cache.addAll([
        "./",
        "./index.html",
        "./jogos.html",
        "./js/app.js"
      ]);
    })
  );
});

self.addEventListener("fetch", e=>{
  e.respondWith(
    caches.match(e.request).then(r=>r||fetch(e.request))
  );
});