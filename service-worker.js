
const CACHE_NAME = "aprende-multiplica-v1";

const ARCHIVOS = [
    "./",
    "./index.html",
    "./manifest.webmanifest",
    "./css/estilos.css",
    "./js/app.js",
    "./js/aprendizaje.js",
    "./icons/icon-192.png",
    "./icons/icon-512.png"
];

// Instalar y guardar los archivos principales.
self.addEventListener("install", (event) => {
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then((cache) => cache.addAll(ARCHIVOS))
            .then(() => self.skipWaiting())
    );
});

// Activar y limpiar versiones anteriores.
self.addEventListener("activate", (event) => {
    event.waitUntil(
        caches.keys()
            .then((nombres) => Promise.all(
                nombres
                    .filter((nombre) => nombre !== CACHE_NAME)
                    .map((nombre) => caches.delete(nombre))
            ))
            .then(() => self.clients.claim())
    );
});

// Entregar recursos guardados cuando no haya conexión.
self.addEventListener("fetch", (event) => {
    if (event.request.method !== "GET") return;

    const url = new URL(event.request.url);

    if (url.origin !== self.location.origin) return;

    event.respondWith(
        caches.match(event.request)
            .then((respuesta) => {
                if (respuesta) return respuesta;

                return fetch(event.request);
            })
            .catch(() => {
                if (event.request.mode === "navigate") {
                    return caches.match("./index.html");
                }
            })
    );
});
