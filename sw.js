const CACHE_NAME = 'fixel-pro-v12.8-cache';
const assetsToCache = [
  './',
  'index.html',
  'manifest.json',
  'https://unpkg.com/pdf-lib/dist/pdf-lib.min.js',
  'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.4.120/pdf.min.js',
  'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.4.120/pdf.worker.min.js',
  'https://cdnjs.cloudflare.com/ajax/libs/jszip/3.10.1/jszip.min.js',
  'https://cdn.jsdelivr.net/npm/sortablejs@1.15.0/Sortable.min.js',
  'https://fonts.googleapis.com/css2?family=Kanit:wght@300;400;600;800;900&display=swap'
];

// ติดตั้ง Service Worker และเก็บไฟล์ลง Cache
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      return cache.addAll(assetsToCache);
    })
  );
});

// ตรวจสอบและดึงไฟล์จาก Cache เพื่อให้ใช้งานได้เร็ว/ออฟไลน์
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request).then(response => {
      return response || fetch(event.request);
    })
  );
});

// ล้าง Cache เก่าเมื่อมีการอัปเดตเวอร์ชัน
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(keys => {
      return Promise.all(
        keys.filter(key => key !== CACHE_NAME).map(key => caches.delete(key))
      );
    })
  );
});