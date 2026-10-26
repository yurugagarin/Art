// Momentum service worker: uygulamayı çevrimdışı açılabilir yapar,
// görülen fotoğrafları telefonda önbelleğe alır.
const VERSION = 'v4'
const SHELL = `momentum-shell-${VERSION}`
const PHOTOS = 'momentum-photos'
const MAX_PHOTOS = 80

self.addEventListener('install', (event) => {
  event.waitUntil(caches.open(SHELL).then((c) => c.addAll(['./', './manifest.webmanifest', './icon.svg'])))
  self.skipWaiting()
})

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches
      .keys()
      .then((keys) => Promise.all(keys.filter((k) => k !== SHELL && k !== PHOTOS).map((k) => caches.delete(k))))
      .then(() => self.clients.claim()),
  )
})

async function trim(cache) {
  const keys = await cache.keys()
  for (let i = 0; i < keys.length - MAX_PHOTOS; i++) await cache.delete(keys[i])
}

self.addEventListener('fetch', (event) => {
  const req = event.request
  if (req.method !== 'GET') return
  const url = new URL(req.url)

  // Fotoğraflar: önce önbellek, yoksa ağ.
  if (url.hostname === 'images.unsplash.com') {
    event.respondWith(
      caches.open(PHOTOS).then(async (cache) => {
        const hit = await cache.match(req)
        if (hit) return hit
        const res = await fetch(req)
        if (res.ok || res.type === 'opaque') {
          cache.put(req, res.clone()).then(() => trim(cache))
        }
        return res
      }),
    )
    return
  }

  if (url.origin !== self.location.origin) return

  // Sayfa: önce ağ (güncel kalsın), çevrimdışıysa önbellek.
  if (req.mode === 'navigate') {
    event.respondWith(
      fetch(req)
        .then((res) => {
          caches.open(SHELL).then((c) => c.put('./', res.clone()))
          return res
        })
        .catch(() => caches.match('./')),
    )
    return
  }

  // JS/CSS/font/ikon: önbellekten hızlı aç, arkada güncelle.
  event.respondWith(
    caches.open(SHELL).then(async (cache) => {
      const hit = await cache.match(req)
      const net = fetch(req)
        .then((res) => {
          if (res.ok) cache.put(req, res.clone())
          return res
        })
        .catch(() => hit)
      return hit ?? net
    }),
  )
})
