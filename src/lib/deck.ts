import type { Quote } from '../data/quotes'
import { hash } from './photos'

export const todayKey = () => {
  const d = new Date()
  return `${d.getFullYear()}-${d.getMonth() + 1}-${d.getDate()}`
}

/** Her gün farklı, ama gün içinde sabit kalan bir sıralama. */
export function dailyShuffle<T extends { id: string }>(items: T[], seed = todayKey()): T[] {
  return [...items].sort((a, b) => hash(seed + a.id) - hash(seed + b.id))
}

export const mod = (i: number, n: number) => ((i % n) + n) % n

export function greeting(date = new Date()) {
  const h = date.getHours()
  if (h >= 5 && h < 12) return 'Günaydın'
  if (h >= 12 && h < 17) return 'İyi günler'
  if (h >= 17 && h < 22) return 'İyi akşamlar'
  return 'İyi geceler'
}

/** Sözün uzunluğuna göre yazı boyutu sınıfı. */
export function sizeClass(q: Quote) {
  const n = q.text.length
  if (n <= 32) return 'q-xl'
  if (n <= 70) return 'q-lg'
  if (n <= 120) return 'q-md'
  return 'q-sm'
}

export async function shareQuote(q: Quote): Promise<'shared' | 'copied' | 'failed'> {
  const text = `“${q.text}”${q.tr ? `\n${q.tr}` : ''}${q.author ? `\n— ${q.author}` : ''}`
  try {
    if (navigator.share) {
      await navigator.share({ text })
      return 'shared'
    }
    await navigator.clipboard.writeText(text)
    return 'copied'
  } catch (e) {
    if (e instanceof DOMException && e.name === 'AbortError') return 'shared'
    return 'failed'
  }
}
