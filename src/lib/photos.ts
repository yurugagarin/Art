import { useMemo } from 'react'
import { PHOTOS, type Photo, type PhotoTheme } from '../data/photos'
import type { Category, Quote } from '../data/quotes'
import { useStore } from './store'

const DEFAULT_THEMES: PhotoTheme[] = ['yaz', 'arkadas', 'deniz', 'gunbatimi']

const THEMES_FOR: Record<Category, PhotoTheme[]> = {
  spor: ['spor', 'deniz', 'gunbatimi'],
  disiplin: ['doga', 'gunbatimi', 'spor'],
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
  return list[hash(q.id) % list.length] ?? FALLBACK
}

const FALLBACK: Photo = { id: 'none', theme: 'gunbatimi', src: '', thumb: '' }

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
