self.addEventListener('install', event => {
    event.waitUntil(
        caches.open('cache-pomodoro.ir-v1-pwa')
            .then(cache => {
                return cache.addAll([
                    '/',
                ])
            })
            .then(() => self.skipWaiting()),
        self.registration.periodicSync.register('pomodoro-sync', {
            minInterval: 24 * 60 * 60 * 1000,
        }),
    )
})
self.addEventListener('periodicsync', event => {
    if (event.tag === 'pomodoro-sync') {
        event.waitUntil(
            fetch('/api/data')
                .then(response => response.json())
                .then(data => {
                    caches.open('cache-pomodoro.ir-v1-pwa')
                        .then(cache => {
                            cache.put('/api/data', new Response(JSON.stringify(data)))
                        })
                })
        )
    }
})
self.addEventListener('activate', event => {
    event.waitUntil(
        caches.keys()
            .then(keys => {
                return Promise.all(
                    keys.filter(key => key !== 'cache-pomodoro.ir-v1-pwa')
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