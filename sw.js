// かんじ れんしゅうちょう — オフライン用 Service Worker
const VERSION = 'kk-32122da0';
const SHELL = ["./", "./index.html", "./manifest.webmanifest", "./icon-180.png", "./icon-192.png", "./icon-512.png", "./data/k10.json", "./data/k9.json", "./data/k8.json", "./data/k7.json", "./data/k6.json", "./data/k5.json", "./data/k4.json", "./data/k3.json", "./zoo/zoo.json", "./zoo/pens/mizube-flamingo-atlas.png", "./zoo/pens/mizube-flamingo-bg.png", "./zoo/pens/mizube-kaba-atlas.png", "./zoo/pens/mizube-kaba-bg.png", "./zoo/pens/mizube-kamo-atlas.png", "./zoo/pens/mizube-kamo-bg.png", "./zoo/pens/mizube-kamonohashi-atlas.png", "./zoo/pens/mizube-kamonohashi-bg.png", "./zoo/pens/mizube-kawauso-atlas.png", "./zoo/pens/mizube-kawauso-bg.png", "./zoo/pens/mizube-wani-atlas.png", "./zoo/pens/mizube-wani-bg.png", "./zoo/pens/mori-gorilla-atlas.png", "./zoo/pens/mori-gorilla-bg.png", "./zoo/pens/mori-kitsune-atlas.png", "./zoo/pens/mori-kitsune-bg.png", "./zoo/pens/mori-namakemono-atlas.png", "./zoo/pens/mori-namakemono-bg.png", "./zoo/pens/mori-risu-atlas.png", "./zoo/pens/mori-risu-bg.png", "./zoo/pens/mori-shika-atlas.png", "./zoo/pens/mori-shika-bg.png", "./zoo/pens/mori-usagi-atlas.png", "./zoo/pens/mori-usagi-bg.png", "./zoo/pens/savanna-dachou-atlas.png", "./zoo/pens/savanna-dachou-bg.png", "./zoo/pens/savanna-kirin-atlas.png", "./zoo/pens/savanna-kirin-bg.png", "./zoo/pens/savanna-meerkat-atlas.png", "./zoo/pens/savanna-meerkat-bg.png", "./zoo/pens/savanna-raion-atlas.png", "./zoo/pens/savanna-raion-bg.png", "./zoo/pens/savanna-shimauma-atlas.png", "./zoo/pens/savanna-shimauma-bg.png", "./zoo/pens/savanna-zou-atlas.png", "./zoo/pens/savanna-zou-bg.png", "./zoo/views/minis.png", "./zoo/views/mizube.png", "./zoo/views/mori.png", "./zoo/views/overview.png", "./zoo/views/savanna.png"];

self.addEventListener('install', e => {
  e.waitUntil(caches.open(VERSION).then(c => c.addAll(SHELL)).then(() => self.skipWaiting()));
});

self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys().then(keys => Promise.all(keys.filter(k => k !== VERSION).map(k => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', e => {
  const req = e.request;
  if (req.method !== 'GET') return;
  const url = new URL(req.url);

  // フォント（Google Fonts）は一度読んだらキャッシュから使う
  if (url.hostname === 'fonts.googleapis.com' || url.hostname === 'fonts.gstatic.com') {
    e.respondWith(
      caches.open(VERSION).then(async c => {
        const hit = await c.match(req);
        if (hit) return hit;
        try { const res = await fetch(req); c.put(req, res.clone()); return res; }
        catch (_) { return hit || Response.error(); }
      })
    );
    return;
  }

  // アプリ本体：ネットにつながれば最新、だめならキャッシュ
  if (url.origin === location.origin) {
    e.respondWith(
      fetch(req).then(res => {
        const copy = res.clone();
        caches.open(VERSION).then(c => c.put(req, copy));
        return res;
      }).catch(() => caches.match(req).then(r => r || caches.match('./index.html')))
    );
  }
});
