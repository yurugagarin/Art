import { useMemo } from 'react'
import { LEGACY_QUOTES } from '../data/legacyQuotes'
import { QUOTES, type Quote } from '../data/quotes'
import { useStore } from './store'

/** Hazır sözler + kullanıcının kendi sözleri (akışta gösterilenler). */
export function useAllQuotes(): Quote[] {
  const mine = useStore((s) => s.mine)
  return useMemo(() => [...mine, ...QUOTES], [mine])
}

/**
 * Kimliğe göre söz bulma. Listeden çıkarılmış eski sözler ve favorilerin kopyaları da
 * dahildir; böylece bir zamanlar favorilenen hiçbir söz Favoriler'den kaybolmaz.
 */
export function useQuoteMap(): Map<string, Quote> {
  const all = useAllQuotes()
  const snaps = useStore((s) => s.favQuotes)
  return useMemo(() => {
    const map = new Map<string, Quote>()
    for (const q of LEGACY_QUOTES) map.set(q.id, q)
    for (const q of Object.values(snaps)) map.set(q.id, { ...q, legacy: !QUOTES.some((x) => x.id === q.id) })
    for (const q of all) map.set(q.id, q)
    return map
  }, [all, snaps])
}
