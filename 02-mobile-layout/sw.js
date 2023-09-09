// sw.js

// Define el nombre de la caché
const CACHE_NAME = 'my-pwa-cache-v1';

// Lista de recursos que deseas cachear
const cacheUrls = [
    //   '/',
    // '/index.html',
    //   '/styles.css',
    //   '/app.js',

];

self.addEventListener('beforeunload', function (event) {
    // Cancela el evento de retroceso para evitar que la PWA se cierre
    event.preventDefault();
    // Agrega tu lógica personalizada aquí, como mostrar un mensaje al usuario
    event.returnValue = '¿Estás seguro de que deseas salir de la aplicación?';
});

// Evento de instalación del Service Worker
self.addEventListener('install', (event) => {
    event.waitUntil(
        caches.open(CACHE_NAME).then((cache) => {
            return cache.addAll(cacheUrls);
        })
    );
});

// Evento de activación del Service Worker
self.addEventListener('activate', (event) => {
    event.waitUntil(
        caches.keys().then((cacheNames) => {
            return Promise.all(
                cacheNames
                    .filter((name) => name !== CACHE_NAME)
                    .map((name) => caches.delete(name))
            );
        })
    );
});

// Evento fetch para interceptar peticiones de recursos
self.addEventListener('fetch', (event) => {
    event.respondWith(
        caches.match(event.request).then((response) => {
            // Si el recurso está en caché, lo servimos desde allí
            // if (response) {
            //     return response;
            // }

            // Si no está en caché, lo buscamos en la red
            return fetch(event.request);
        })
    );
});
