// Asystent dnia v30: aplikacja działa bez internetu (pliki z pamięci), nowa wersja wchodzi przy kolejnym otwarciu.
const CACHE = "asystent-dnia-v30"; const SHELL = ["./","index.html","manifest.webmanifest","icon-192.png","icon-512.png","icon-maskable-512.png","apple-touch-icon.png","favicon-32.png","atleo-v30.js","base17-v30.js","brain17-v30.js","learn-v30.js","life-data17-v30.js","life17-v30.js","local17-v30.js","onboard17-v30.js","planner-v30.js","reduce-v30.js","store-v30.js","time-v30.js","ui17-v30.js"];
self.addEventListener("install", e => { e.waitUntil(caches.open(CACHE).then(c => c.addAll(SHELL)).then(() => self.skipWaiting())); });
self.addEventListener("activate", e => { e.waitUntil(caches.keys().then(ks => Promise.all(ks.filter(k => k !== CACHE).map(k => caches.delete(k)))).then(() => self.clients.claim())); });
self.addEventListener("fetch", e => { const r = e.request; if (r.method !== "GET" || new URL(r.url).origin !== location.origin) return;
  if (r.mode === "navigate") { e.respondWith(fetch(r).then(res => { const cp = res.clone(); caches.open(CACHE).then(c => c.put("index.html", cp)); return res; }).catch(() => caches.match("index.html"))); return; }
  e.respondWith(caches.match(r).then(hit => hit || fetch(r).then(res => { if (res.ok) { const cp = res.clone(); caches.open(CACHE).then(c => c.put(r, cp)); } return res; }))); });
