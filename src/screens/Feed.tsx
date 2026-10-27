import { AnimatePresence, motion } from 'motion/react'
import { useEffect, useMemo, useState } from 'react'
import { createPortal } from 'react-dom'
import { CardDeck } from '../components/CardDeck'
import { BoltIcon, CloseIcon, MomentumMark, PenIcon, RepeatIcon, UndoIcon } from '../components/Icons'
import type { Quote } from '../data/quotes'
import { useCategories } from '../lib/categories'
import { todayKey } from '../lib/deck'
import { buildSosDeck, personalOrder, spreadCategories, tasteOf, type SosDeck } from '../lib/personal'
import { getState, markTipsSeen, unhideMany, useStore } from '../lib/store'
import { MomentumChip } from '../components/Momentum'
import { useAllQuotes, useQuoteMap } from '../lib/useQuotes'

export type Filter = 'all' | 'mine' | 'sos' | Quote['cat']

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
  const byId = useQuoteMap()
  // "Motivasyonum düştü" destesi: girildiği an bir kez hazırlanır, sonra sırası değişmez.
  const [sos, setSos] = useState<SosDeck | null>(null)
  const [beforeSos, setBeforeSos] = useState<Filter>('all')

  const enterSos = () => {
    const st = getState()
    const d = buildSosDeck(byId, st.mine, st.favs, st.power, st.hidden)
    navigator.vibrate?.(15)
    setBeforeSos(filter === 'sos' ? beforeSos : filter)
    setSos(d)
    setFilter('sos')
    setCurrentId(d.list[0]?.id)
  }
  const exitSos = () => {
    setFilter(beforeSos)
    setCurrentId(undefined)
  }

  // Seçili kategorideki tüm sözler (gizlenenler dahil), sana göre sıralanmış.
  // Sıra oturum boyunca sabit kalır; her kaydırmada yeniden karışmaz.
  const pool = useMemo(() => {
    if (filter === 'sos') return sos?.list ?? []
    if (filter === 'mine') return all.filter((q) => q.mine)
    const { power, lastPower } = getState()
    const list = filter === 'all' ? all : all.filter((q) => q.cat === filter)
    const ordered = personalOrder(list, power, lastPower, tasteOf(power, all), todayKey())
    return filter === 'all' ? spreadCategories(ordered) : ordered
  }, [all, filter, sos])
  const deck = useMemo(() => pool.filter((q) => !hidden[q.id]), [pool, hidden])
  const hiddenHere = pool.length - deck.length

  useEffect(() => {
    try {
      // Motivasyon modu kalıcı değil: uygulama yeniden açılınca normal akış gelir.
      if (filter !== 'sos') localStorage.setItem(POS_KEY, JSON.stringify({ day: todayKey(), filter, id: currentId }))
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
  const isSos = filter === 'sos'
  const isCustom = cats.some((c) => c.custom && c.id === filter)

  return (
    <section className="screen feed">
      {deck.length > 0 ? (
        <CardDeck
          // Kategori değişince deste sıfırlanır: geri al geçmişi başka kategoriye taşmaz.
          key={filter}
          quotes={deck}
          currentId={currentId}
          onCurrent={setCurrentId}
          mode="feed"
          keyboard
          photoOrder={pool}
          hideOnLeft={!isSos}
          badgeFor={(q) => (isSos ? sos?.why.get(q.id) : q.id === firstOfDay ? 'Günün sözü' : undefined)}
        />
      ) : isSos ? (
        <div className="empty empty-feed">
          <div className="empty-art sos-art">❤️‍🔥</div>
          <p className="empty-title">Burası henüz boş</p>
          <p>Sağa kaydırdığın, favorilediğin ya da kendi yazdığın sözler burada toplanır. Motivasyonun düştüğünde tek dokunuşla hepsi karşında olur.</p>
          <div className="empty-actions">
            <button className="btn-primary" onClick={onWrite}>
              <PenIcon /> Kendine bir söz yaz
            </button>
            <button className="btn-ghost" onClick={exitSos}>
              Akışa dön
            </button>
          </div>
        </div>
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
          <MomentumChip />
        </div>
        {isSos ? (
          <div className="sos-bar">
            <span className="sos-title">
              <span aria-hidden>❤️‍🔥</span> Sana iyi gelenler
              {deck.length > 0 && <span className="sos-count">{deck.length}</span>}
            </span>
            <button className="sos-close" onClick={exitSos} aria-label="Motivasyon modundan çık">
              <CloseIcon width={16} height={16} /> Kapat
            </button>
          </div>
        ) : (
          <nav className="chips" aria-label="Kategoriler">
            <button className="chip chip-sos" onClick={enterSos}>
              ❤️‍🔥 Motivasyonum düştü
            </button>
            {chips.map((c) => (
              <button key={c.id} className={`chip${filter === c.id ? ' on' : ''}`} onClick={() => choose(c.id)}>
                {c.label}
              </button>
            ))}
          </nav>
        )}
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
              <BoltIcon width={18} height={18} />
            </span>
            <span>
              <b>Sağa kaydır:</b> bu söz sana güç verdi. Momentum’un dolar; sana iyi gelen türden sözler daha sık gelir.
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
