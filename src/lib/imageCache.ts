// Fotoğrafların kaydırınca "şak" diye gelmesi için: sıradaki kartların görselleri
// önceden indirilip çözülür (decode) ve bellekte tutulur.

const loaded = new Set<string>()
const keep = new Map<string, HTMLImageElement>()
// Az sayıda tutmak, telefonun belleği dolup çözülmüş fotoğrafları atmasını önler.
const MAX_KEEP = 8

export const isLoaded = (src: string) => loaded.has(src)

export function markLoaded(src: string) {
  loaded.add(src)
}

export function preload(src: string, onError?: () => void) {
  if (!src) return
  if (keep.has(src)) {
    // En son kullanılanı sona taşı ki bellekten ilk o atılmasın.
    const img = keep.get(src)!
    keep.delete(src)
    keep.set(src, img)
    return
  }
  const img = new Image()
  img.decoding = 'async'
  img.onerror = () => {
    keep.delete(src)
    onError?.()
  }
  img.src = src
  keep.set(src, img)
  img
    .decode()
    .then(() => loaded.add(src))
    .catch(() => {})
  while (keep.size > MAX_KEEP) {
    const oldest = keep.keys().next().value
    if (oldest === undefined) break
    keep.delete(oldest)
  }
}
