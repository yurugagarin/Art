import { useEffect, useMemo, useState } from 'react'
import { CATEGORIES, type Category } from '../data/quotes'
import { CardDeck } from '../components/CardDeck'
import { PenIcon } from '../components/Icons'
import { dailyShuffle, greeting, todayKey } from '../lib/deck'
import { useAllQuotes } from '../lib/useQuotes'

export type Filter = 'all' | Category | 'mine'

const POS_KEY = 'kivilcim:pos'

function loadPos(): { day: string; filter: Filter; id?: string } {
  try {
    const p = JSON.parse(localStorage.getItem(POS_KEY) ?? '')
    if (p.day === todayKey()) return p
  } catch {
    /* ilk açılış */
  }
  return { day: todayKey(), filter: 'all' }
}

interface Props {
  /** Yeni yazılan söz: akış açılınca doğrudan ona gidilir. */
  focusId?: string
  onFocused: () => void
  onWrite: () => void
}

export function Feed({ focusId, onFocused, onWrite }: Props) {
  const all = useAllQuotes()
  const [saved] = useState(() => (focusId ? { day: todayKey(), filter: 'mine' as Filter, id: focusId } : loadPos()))
  const [filter, setFilter] = useState<Filter>(saved.filter)
  const hasMine = all.some((q) => q.mine)

  const deck = useMemo(() => {
    if (filter === 'mine') return all.filter((q) => q.mine)
    const list = filter === 'all' ? all : all.filter((q) => !q.mine && q.cat === filter)
    return dailyShuffle(list)
  }, [all, filter])

  const [index, setIndex] = useState(() => Math.max(0, deck.findIndex((q) => q.id === saved.id)))
  const current = deck[index]

  useEffect(() => {
    try {
      localStorage.setItem(POS_KEY, JSON.stringify({ day: todayKey(), filter, id: current?.id }))
    } catch {
      /* önemli değil */
    }
  }, [filter, current?.id])

  useEffect(() => {
    if (focusId) onFocused()
  }, [focusId, onFocused])

  const choose = (f: Filter) => {
    setFilter(f)
    setIndex(0)
  }

  const chips: { id: Filter; label: string }[] = [
    { id: 'all', label: 'Hepsi' },
    ...(hasMine ? [{ id: 'mine' as Filter, label: '✍️ Benim' }] : []),
    ...CATEGORIES.map((c) => ({ id: c.id as Filter, label: `${c.emoji} ${c.label}` })),
  ]

  const firstOfDay = filter === 'all' ? deck[0]?.id : undefined

  return (
    <section className="screen feed">
      {deck.length > 0 ? (
        <CardDeck
          quotes={deck}
          index={index}
          onIndex={setIndex}
          keyboard
          badgeFor={(q) => (q.id === firstOfDay ? 'Günün sözü' : undefined)}
        />
      ) : (
        <div className="empty empty-feed">
          <p className="empty-title">Henüz kendi sözün yok</p>
          <p>Sana iyi gelen bir cümleyi yaz, burada seni beklesin.</p>
          <button className="btn-primary" onClick={onWrite}>
            <PenIcon /> Söz yaz
          </button>
        </div>
      )}

      <header className="feed-top">
        <div className="brand-row">
          <h1 className="brand">
            kıvılcım<span className="brand-dot">✦</span>
          </h1>
          <span className="greet">{greeting()}</span>
        </div>
        <nav className="chips" aria-label="Kategoriler">
          {chips.map((c) => (
            <button key={c.id} className={`chip${filter === c.id ? ' on' : ''}`} onClick={() => choose(c.id)}>
              {c.label}
            </button>
          ))}
        </nav>
      </header>
    </section>
  )
}
