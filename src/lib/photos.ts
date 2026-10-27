import { useMemo } from 'react'
import { PHOTOS, type Photo, type PhotoTheme } from '../data/photos'
import type { Category, Quote } from '../data/quotes'
import { useStore } from './store'

const DEFAULT_THEMES: PhotoTheme[] = ['yaz', 'arkadas', 'deniz', 'gunbatimi']

const THEMES_FOR: Record<Category, PhotoTheme[]> = {
  spor: ['spor', 'deniz', 'gunbatimi'],
  disiplin: ['doga', 'gunbatimi', 'spor'],
  basari: ['gunbatimi', 'doga', 'spor', 'yaz'],
  cesaret: ['doga', 'deniz', 'spor', 'gunbatimi'],
  hatirlat: ['yaz', 'arkadas', 'deniz', 'gunbatimi'],
  yaz: ['yaz', 'arkadas', 'deniz'],
  bilgelik: ['doga', 'gunbatimi', 'deniz'],
}

export function hash(s: string): number {
  let h = 2166136261
  for (let i = 0; i < s.length; i++) {
    h ^= s.charCodeAt(i)
    h = Math.imul(h, 16777619)
  }
  // Son karıştırma (murmur3 fmix32): benzer kimlikler ("s1", "s2"…) birbirinden bağımsız
  // sayılara dağılsın; yoksa aynı harfle başlayan sözler sıralamada yan yana toplanıyordu.
  h ^= h >>> 16
  h = Math.imul(h, 0x85ebca6b)
  h ^= h >>> 13
  h = Math.imul(h, 0xc2b2ae35)
  h ^= h >>> 16
  return h >>> 0
}

/** Kullanılabilir tüm fotoğraflar: kullanıcının kendi fotoğrafları + yüklenebilen hazır fotoğraflar. */
export function usePhotos(): Photo[] {
  const own = useStore((s) => s.ownPhotos)
  const broken = useStore((s) => s.broken)
  return useMemo(() => {
    const ownPhotos: Photo[] = own.map((p) => ({ id: p.id, theme: 'yaz', src: p.url, thumb: p.url, own: true }))
    return [...ownPhotos, ...PHOTOS.filter((p) => !broken[p.id])]
  }, [own, broken])
}

export function findPhoto(id: string | undefined, photos: Photo[]): Photo | undefined {
  return id ? photos.find((p) => p.id === id) : undefined
}

/** Bir söz için gösterilecek fotoğraf: kullanıcı seçimi > sözün kendi fotoğrafı > temaya göre otomatik. */
export function photoForQuote(q: Quote, photos: Photo[], photoFor: Record<string, string>): Photo {
  const chosen = findPhoto(photoFor[q.id], photos) ?? findPhoto(q.photo, photos)
  if (chosen) return chosen
  const builtIn = photos.filter((p) => !p.own)
  const themes = THEMES_FOR[q.cat as Category] ?? DEFAULT_THEMES
  const pool = builtIn.filter((p) => themes.includes(p.theme))
  const list = pool.length ? pool : builtIn.length ? builtIn : photos
  // Her söz için fotoğraflara sabit bir öncelik sırası verilir ve listedeki en üstteki seçilir.
  // Böylece bir fotoğraf yüklenemeyip listeden çıktığında yalnızca o fotoğrafı kullanan
  // sözler değişir; diğer kartların fotoğrafları yerinde kalır.
  let best: Photo | undefined
  let bestScore = -1
  for (const p of list) {
    const score = hash(`${q.id}|${p.id}`)
    if (score > bestScore) {
      bestScore = score
      best = p
    }
  }
  return best ?? FALLBACK
}

const FALLBACK: Photo = { id: 'none', theme: 'gunbatimi', src: '', thumb: '' }

/**
 * Bir söz listesinin (akış sırasıyla) fotoğraflarını belirler:
 * - Kullanıcının seçtiği fotoğraf her zaman önce gelir.
 * - Art arda gelen kartlarda aynı fotoğraf tekrar etmez.
 * - Atama her gün değişir; aynı söz başka günlerde başka fotoğrafla gelir.
 * Sıralı ve açgözlü çalışır: bir kartın fotoğrafı yalnızca kendinden önceki kartlara
 * bağlıdır, bu yüzden ileride bir fotoğraf bozulursa ekrandaki kartlar değişmez.
 */
export function assignPhotos(
  quotes: Quote[],
  photos: Photo[],
  photoFor: Record<string, string>,
  seed: string,
): Map<string, Photo> {
  const out = new Map<string, Photo>()
  const builtIn = photos.filter((p) => !p.own)
  const windowSize = Math.min(16, Math.max(0, builtIn.length - 1))
  const recent: string[] = []
  for (const q of quotes) {
    let chosen = findPhoto(photoFor[q.id], photos) ?? findPhoto(q.photo, photos)
    if (!chosen) {
      const themes = THEMES_FOR[q.cat as Category] ?? DEFAULT_THEMES
      const pool = builtIn.filter((p) => themes.includes(p.theme))
      const list = pool.length >= 4 ? pool : builtIn.length ? builtIn : photos
      let best: Photo | undefined
      let bestScore = -1
      let any: Photo | undefined
      let anyScore = -1
      for (const p of list) {
        const score = hash(`${seed}|${q.id}|${p.id}`)
        if (score > anyScore) {
          anyScore = score
          any = p
        }
        if (score > bestScore && !recent.includes(p.id)) {
          bestScore = score
          best = p
        }
      }
      chosen = best ?? any ?? FALLBACK
    }
    out.set(q.id, chosen)
    recent.push(chosen.id)
    if (recent.length > windowSize) recent.shift()
  }
  return out
}

/** Fotoğrafı telefonda saklamadan önce küçültür ve JPEG'e çevirir. */
export async function compressImage(file: File, maxSide = 1440): Promise<Blob> {
  const bitmap = await createImageBitmap(file)
  const scale = Math.min(1, maxSide / Math.max(bitmap.width, bitmap.height))
  const w = Math.round(bitmap.width * scale)
  const h = Math.round(bitmap.height * scale)
  const canvas = document.createElement('canvas')
  canvas.width = w
  canvas.height = h
  canvas.getContext('2d')!.drawImage(bitmap, 0, 0, w, h)
  bitmap.close()
  return new Promise((resolve, reject) =>
    canvas.toBlob((b) => (b ? resolve(b) : reject(new Error('Fotoğraf işlenemedi'))), 'image/jpeg', 0.85),
  )
}
