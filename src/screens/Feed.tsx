import { AnimatePresence, motion } from 'motion/react'
import { useEffect, useMemo, useState } from 'react'
import { createPortal } from 'react-dom'
import { CardDeck } from '../components/CardDeck'
import { CloseIcon, MomentumMark, PenIcon, RepeatIcon, UndoIcon } from '../components/Icons'
import type { Quote } from '../data/quotes'
import { useCategories } from '../lib/categories'
import { dailyShuffle, greeting, todayKey } from '../lib/deck'
import { markTipsSeen, unhideMany, useStore } from '../lib/store'
import { useAllQuotes } from '../lib/useQuotes'

export type Filter = 'all' | 'mine' | Quote['cat']

const POS_KEY = 'momentum:pos'

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
  const cats = useCategories()
  const hidden = useStore((s) => s.hidden)
  const seenTips = useStore((s) => s.seenTips)
  const [saved] = useState(() => (focusId ? { day: todayKey(), filter: 'mine' as Filter, id: focusId } : loadPos()))
  const [filter, setFilter] = useState<Filter>(saved.filter)
  const [currentId, setCurrentId] = useState<string | undefined>(saved.id)
  const hasMine = all.some((q) => q.mine)

  // Seçili kategorideki tüm sözler (gizlenenler dahil) ve akışta gösterilecek olanlar.
  const pool = useMemo(() => {
    if (filter === 'mine') return all.filter((q) => q.mine)
    if (filter === 'all') return dailyShuffle(all)
    return dailyShuffle(all.filter((q) => q.cat === filter))
  }, [all, filter])
  const deck = useMemo(() => pool.filter((q) => !hidden[q.id]), [pool, hidden])
  const hiddenHere = pool.length - deck.length

  useEffect(() => {
    try {
      localStorage.setItem(POS_KEY, JSON.stringify({ day: todayKey(), filter, id: currentId }))
    } catch {
      /* önemli değil */
    }
  }, [filter, currentId])

  useEffect(() => {
    if (focusId) onFocused()
  }, [focusId, onFocused])

  const choose = (f: Filter) => {
    setFilter(f)
    setCurrentId(undefined)
  }

  const chips: { id: Filter; label: string }[] = [
    { id: 'all', label: 'Hepsi' },
    ...(hasMine ? [{ id: 'mine' as Filter, label: '✍️ Benim' }] : []),
    ...cats.map((c) => ({ id: c.id as Filter, label: `${c.emoji} ${c.label}` })),
  ]

  const firstOfDay = filter === 'all' ? deck[0]?.id : undefined
  const isCustom = cats.some((c) => c.custom && c.id === filter)

  return (
    <section className="screen feed">
      {deck.length > 0 ? (
        <CardDeck
          quotes={deck}
          currentId={currentId}
          onCurrent={setCurrentId}
          mode="feed"
          keyboard
          badgeFor={(q) => (q.id === firstOfDay ? 'Günün sözü' : undefined)}
        />
      ) : hiddenHere > 0 ? (
        <div className="empty empty-feed">
          <p className="empty-title">Hepsini gördün</p>
          <p>Bu bölümdeki sözlerin hepsini sola kaydırdın. İstersen geri getirebilirsin.</p>
          <button className="btn-primary" onClick={() => unhideMany(pool.map((q) => q.id))}>
            <RepeatIcon /> Geri getir ({hiddenHere})
          </button>
        </div>
      ) : (
        <div className="empty empty-feed">
          <p className="empty-title">{isCustom ? 'Bu kategori henüz boş' : 'Henüz kendi sözün yok'}</p>
          <p>Sana iyi gelen bir cümleyi yaz, burada seni beklesin.</p>
          <button className="btn-primary" onClick={onWrite}>
            <PenIcon /> Söz yaz
          </button>
        </div>
      )}

      <header className="feed-top">
        <div className="brand-row">
          <h1 className="brand">
            <MomentumMark filled className="brand-mark" width={30} height={22} />
            momentum
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

      {createPortal(<AnimatePresence>{!seenTips && deck.length > 0 && <Tips />}</AnimatePresence>, document.body)}
    </section>
  )
}

/** İlk açılışta kaydırmanın ne işe yaradığını anlatan kısa rehber. */
function Tips() {
  return (
    <motion.div className="tips" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
      <motion.div className="tips-card" initial={{ y: 30, scale: 0.96 }} animate={{ y: 0, scale: 1 }} transition={{ type: 'spring', stiffness: 300, damping: 28 }}>
        <p className="tips-title">Nasıl kullanılır?</p>
        <ul>
          <li>
            <span className="tips-ico keep">
              <RepeatIcon width={18} height={18} />
            </span>
            <span>
              <b>Sağa kaydır:</b> söz akışta kalır, ileride yine karşına çıkar.
            </span>
          </li>
          <li>
            <span className="tips-ico drop">
              <CloseIcon width={18} height={18} />
            </span>
            <span>
              <b>Sola kaydır:</b> bir daha gösterilmez. Favoriler sayfasından geri getirebilirsin.
            </span>
          </li>
          <li>
            <span className="tips-ico">♥</span>
            <span>
              <b>İki kez dokun:</b> favorilere ekle.
            </span>
          </li>
          <li>
            <span className="tips-ico">
              <UndoIcon width={18} height={18} />
            </span>
            <span>
              <b>Geri al:</b> yanlışlıkla mı kaydırdın? Sağdaki ok seni bir önceki söze götürür.
            </span>
          </li>
        </ul>
        <button className="btn-primary" onClick={markTipsSeen}>
          Anladım
        </button>
      </motion.div>
    </motion.div>
  )
}
