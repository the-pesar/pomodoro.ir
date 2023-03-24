self.addEventListener('install', event => {
    event.waitUntil(
        caches.open('cache-v1-pwa')
            .then(cache => {
                return cache.addAll([
                    '/'
                ])
            })
            .then(() => self.skipWaiting())
    )
})
self.addEventListener('activate', event => {
    event.waitUntil(
        caches.keys()
            .then(keys => {
                return Promise.all(
                    keys.filter(key => key !== 'cache-v1-pwa')
                        .map(key => caches.delete(key))
                )
            })
            .then(() => self.clients.claim())
    )
})
self.addEventListener('fetch', event => {
    event.respondWith(
        caches.match(event.request)
            .then(response => response || fetch(event.request))
    )
})