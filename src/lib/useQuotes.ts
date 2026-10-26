import { useMemo } from 'react'
import { QUOTES, type Quote } from '../data/quotes'
import { useStore } from './store'

/** Hazır sözler + kullanıcının kendi sözleri. */
export function useAllQuotes(): Quote[] {
  const mine = useStore((s) => s.mine)
  return useMemo(() => [...mine, ...QUOTES], [mine])
}

export function useQuoteMap(): Map<string, Quote> {
  const all = useAllQuotes()
  return useMemo(() => new Map(all.map((q) => [q.id, q])), [all])
}
