const CACHE_NAME = 'fixel-pro-v1';
const ASSETS_TO_CACHE = [
  './index.html',
  './manifest.json',
  'https://cdnjs.cloudflare.com/ajax/libs/heic2any/0.0.4/heic2any.min.js'
];

// ติดตั้ง Service Worker และเก็บ Cache
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(ASSETS_TO_CACHE);
    })
  );
});

// เรียกใช้งานไฟล์จาก Cache เพื่อความเร็ว
self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      return response || fetch(event.request);
    })
  );
});