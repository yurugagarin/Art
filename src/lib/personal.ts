import type { Quote } from '../data/quotes'
import { hash } from './photos'

export interface Taste {
  /** Kategori -> toplam güç */
  cat: Record<string, number>
  /** Yazar -> toplam güç */
  author: Record<string, number>
}

/** Sağa kaydırmalardan zevk profili çıkarır. */
export function tasteOf(power: Record<string, number>, quotes: Quote[]): Taste {
  const byId = new Map(quotes.map((q) => [q.id, q]))
  const cat: Record<string, number> = {}
  const author: Record<string, number> = {}
  for (const [id, n] of Object.entries(power)) {
    const q = byId.get(id)
    if (!q) continue
    cat[q.cat] = (cat[q.cat] ?? 0) + n
    if (q.author) author[q.author] = (author[q.author] ?? 0) + n
  }
  return { cat, author }
}

const DAY = 24 * 60 * 60 * 1000

/**
 * Kişisel akış sırası (her gün farklı):
 * - Sana güç veren kategoriler ve yazarlar daha sık ve daha önde gelir.
 * - Hiç görmediğin sözler hafifçe öne çıkar; akış hep taze kalır.
 * - Son 3 günde güç aldığın söz geriye itilir (tekrar etmesin); daha eskiyse yeniden öne çıkar.
 */
export function personalOrder(
  list: Quote[],
  power: Record<string, number>,
  lastPower: Record<string, number>,
  taste: Taste,
  seed: string,
  now = Date.now(),
): Quote[] {
  const maxCat = Math.max(1, ...Object.values(taste.cat))
  const maxAuthor = Math.max(1, ...Object.values(taste.author))
  return list
    .map((q) => {
      let w = 1 + 1.4 * ((taste.cat[q.cat] ?? 0) / maxCat)
      if (q.author) w *= 1 + 0.8 * ((taste.author[q.author] ?? 0) / maxAuthor)
      const p = power[q.id] ?? 0
      if (!p) w *= 1.2
      else if (now - (lastPower[q.id] ?? 0) < 3 * DAY) w *= 0.45
      else w *= 1 + 0.35 * Math.min(p, 3)
      // Ağırlıklı rastgele sıralama (Efraimidis–Spirakis): ağır olan öne gelme eğiliminde.
      const u = (hash(`${seed}|${q.id}`) + 1) / 4294967297
      return { q, k: Math.log(u) / w }
    })
    .sort((a, b) => b.k - a.k)
    .map((x) => x.q)
}

/** Aynı kategoriden üst üste en fazla iki söz gelsin; akış çeşitli kalsın. */
export function spreadCategories(list: Quote[], maxRun = 2, lookahead = 12): Quote[] {
  const out = [...list]
  for (let i = maxRun; i < out.length; i++) {
    const run = out.slice(i - maxRun, i).every((q) => q.cat === out[i].cat)
    if (!run) continue
    for (let j = i + 1; j < Math.min(out.length, i + lookahead); j++) {
      if (out[j].cat !== out[i].cat) {
        const [x] = out.splice(j, 1)
        out.splice(i, 0, x)
        break
      }
    }
  }
  return out
}
