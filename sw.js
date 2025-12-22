/**
 * thIAguinho Arcade - Service Worker
 * Garante performance offline e cacheamento
 */

const CACHE_NAME = 'thiaguinho-arcade-v2';
const ASSETS = [
    './',
    './index.html',
    './jogos.html',
    './js/app.js',
    './manifest.json',
    './assets/mascote_perfil.jpg',
    'https://cdn.tailwindcss.com',
    'https://cdn.jsdelivr.net/npm/boxicons@2.1.4/css/boxicons.min.css',
    'https://cdn.jsdelivr.net/npm/three@0.146.0/build/three.min.js',
    'https://cdn.jsdelivr.net/npm/@mediapipe/pose/pose.js'
];

self.addEventListener('install', (event) => {
    event.waitUntil(
        caches.open(CACHE_NAME).then((cache) => {
            return cache.addAll(ASSETS);
        })
    );
});

self.addEventListener('fetch', (event) => {
    event.respondWith(
        caches.match(event.request).then((response) => {
            return response || fetch(event.request);
        })
    );
});