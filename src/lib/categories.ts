import { useMemo } from 'react'
import { CATEGORIES, type Quote } from '../data/quotes'
import { useStore } from './store'

export interface CatInfo {
  id: Quote['cat']
  label: string
  emoji: string
  custom?: boolean
}

/** Önce kullanıcının kendi kategorileri, sonra hazır kategoriler. */
export function useCategories(): CatInfo[] {
  const cats = useStore((s) => s.cats)
  return useMemo(
    () => [...cats.map((c) => ({ id: c.id as Quote['cat'], label: c.label, emoji: c.emoji, custom: true })), ...CATEGORIES],
    [cats],
  )
}

export function useCategoryOf(q: Quote): CatInfo {
  const all = useCategories()
  const found = all.find((c) => c.id === q.cat)
  if (found?.custom) return found
  if (q.mine) return { id: q.cat, emoji: '✍️', label: 'Benim sözüm' }
  return found ?? { id: q.cat, emoji: '✦', label: '' }
}
