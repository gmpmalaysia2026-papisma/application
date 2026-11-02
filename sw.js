/* Service worker — Aplikasi GMP
 * Tukar VERSI setiap kali fail aplikasi dikemas kini supaya telefon AJK menerima versi baharu.
 */
const VERSI = 'gmp-v2.1.1';
const ASET = [
  './',
  './index.html',
  './manifest.webmanifest',
  './icons/logo.png',
  './icons/icon-192.png',
  './icons/icon-512.png',
  './icons/maskable-512.png',
  './icons/apple-touch-icon.png',
  './icons/favicon-32.png'
];
const FON = 'gmp-fon';

self.addEventListener('install', e => {
  // Simpan setiap fail berasingan: satu fail yang tiada tidak menggagalkan pemasangan
  e.waitUntil(caches.open(VERSI).then(c => Promise.all(ASET.map(u => c.add(u).catch(() => null)))));
});

self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys()
      .then(k => Promise.all(k.filter(n => n !== VERSI && n !== FON).map(n => caches.delete(n))))
      .then(() => self.clients.claim())
  );
});

self.addEventListener('message', e => {
  if (e.data === 'LANGKAU_TUNGGU') self.skipWaiting();
});

self.addEventListener('fetch', e => {
  const req = e.request;
  if (req.method !== 'GET') return;                 // API Apps Script (POST) tidak disentuh
  const url = new URL(req.url);

  // Fon Google: guna salinan simpanan, kemas kini di belakang tabir
  if (url.hostname === 'fonts.googleapis.com' || url.hostname === 'fonts.gstatic.com') {
    e.respondWith(caches.open(FON).then(c => c.match(req).then(ada => {
      const ambil = fetch(req).then(r => { if (r.ok || r.type === 'opaque') c.put(req, r.clone()); return r; }).catch(() => ada);
      return ada || ambil;
    })));
    return;
  }
  if (url.origin !== self.location.origin) return;

  // Navigasi halaman: sentiasa buka cangkerang aplikasi dari simpanan (berfungsi luar talian)
  if (req.mode === 'navigate') {
    e.respondWith(caches.match('./index.html').then(r => r || fetch(req)));
    return;
  }
  // Aset lain: simpanan dahulu, rangkaian sebagai sandaran
  e.respondWith(caches.match(req).then(r => r || fetch(req).then(res => {
    if (res.ok) { const salin = res.clone(); caches.open(VERSI).then(c => c.put(req, salin)); }
    return res;
  })));
});
