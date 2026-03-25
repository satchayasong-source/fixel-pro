const CACHE_NAME = 'fixel-pro-v12.8.1'; // เปลี่ยนเลขเวอร์ชันเพื่อ Force Update
const ASSETS = [
  'index.html',
  'gemini-svg.svg', // เพิ่มชื่อไฟล์ไอคอนใหม่เข้าไปที่นี่
  'manifest.json'
];

// ติดตั้ง Service Worker และเก็บไฟล์ลง Cache
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(ASSETS);
    })
  );
  self.skipWaiting();
});

// ลบ Cache เก่าที่ไม่ใช้แล้ว
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) => {
      return Promise.all(
        keys.filter((key) => key !== CACHE_NAME).map((key) => caches.delete(key))
      );
    })
  );
});

// ดึงข้อมูลจาก Cache ถ้าไม่มีให้ดึงจาก Network
self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      return response || fetch(event.request);
    })
  );
});