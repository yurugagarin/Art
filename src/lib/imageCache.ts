// Fotoğrafların kaydırınca "şak" diye gelmesi için: sıradaki kartların görselleri
// önceden indirilip çözülür (decode) ve bellekte tutulur.

const loaded = new Set<string>()
const keep = new Map<string, HTMLImageElement>()
const MAX_KEEP = 18

export const isLoaded = (src: string) => loaded.has(src)

export function markLoaded(src: string) {
  loaded.add(src)
}

export function preload(src: string) {
  if (!src || loaded.has(src) || keep.has(src)) return
  const img = new Image()
  img.decoding = 'async'
  img.src = src
  keep.set(src, img)
  img
    .decode()
    .then(() => loaded.add(src))
    .catch(() => keep.delete(src))
  while (keep.size > MAX_KEEP) {
    const oldest = keep.keys().next().value
    if (oldest === undefined) break
    keep.delete(oldest)
  }
}
