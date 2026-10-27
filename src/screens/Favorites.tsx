import { AnimatePresence, motion } from 'motion/react'
import { useMemo, useState } from 'react'
import { CardDeck } from '../components/CardDeck'
import { CloseIcon, EyeIcon, HeartIcon, MomentumMark, RepeatIcon } from '../components/Icons'
import { PhotoBg } from '../components/PhotoBg'
import { Sheet } from '../components/Sheet'
import type { Quote } from '../data/quotes'
import { assignPhotos, hash, usePhotos } from '../lib/photos'
import { todayKey } from '../lib/deck'
import { toggleFav, unhideMany, unhideQuote, useStore } from '../lib/store'
import { toast } from '../lib/toast'
import { useQuoteMap } from '../lib/useQuotes'

const RATIOS = ['3 / 4', '4 / 5', '2 / 3', '4 / 5', '1 / 1', '3 / 4']

export function Favorites({ onExplore }: { onExplore: () => void }) {
  const favIds = useStore((s) => s.favs)
  const hiddenMap = useStore((s) => s.hidden)
  const photoFor = useStore((s) => s.photoFor)
  const map = useQuoteMap()
  const photos = usePhotos()
  const favs = useMemo(() => favIds.map((id) => map.get(id)).filter((q): q is Quote => !!q), [favIds, map])
  const hidden = useMemo(
    () =>
      Object.entries(hiddenMap)
        .sort((a, b) => b[1] - a[1])
        .map(([id]) => map.get(id))
        .filter((q): q is Quote => !!q && !q.legacy),
    [hiddenMap, map],
  )
  // Izgara ile tam ekran görüntüleyici aynı fotoğrafları göstersin.
  const tilePhotos = useMemo(() => assignPhotos(favs, photos, photoFor, todayKey()), [favs, photos, photoFor])
  const [openId, setOpenId] = useState<string | null>(null)
  const [showHidden, setShowHidden] = useState(false)
  // Görüntüleyici açıkken liste değişirse (favoriden çıkarma) kartlar yerinde kalsın.
  const [frozen, setFrozen] = useState(favs)

  const remove = (q: Quote) => {
    toggleFav(q)
    toast('Favorilerden çıkarıldı', { label: 'Geri al', run: () => toggleFav(q) })
  }

  return (
    <section className="screen favs">
      <header className="page-head">
        <p className="eyebrow">Koleksiyonun</p>
        <h1 className="page-title">Favorilerim</h1>
        {favs.length > 0 && <p className="page-sub">{favs.length} söz seni bekliyor</p>}
      </header>

      {favs.length === 0 ? (
        <div className="empty">
          <div className="empty-art">
            <HeartIcon filled width={40} height={40} />
          </div>
          <p className="empty-title">Henüz favorin yok</p>
          <p>Sevdiğin bir söze iki kez dokun ya da kalbe bas; burada birikmeye başlasın.</p>
          <button className="btn-primary" onClick={onExplore}>
            <MomentumMark /> Sözlere göz at
          </button>
        </div>
      ) : (
        <div className="masonry">
          {favs.map((q, i) => (
            <motion.article
              key={q.id}
              className="tile"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: Math.min(i * 0.04, 0.4) }}
              onClick={() => {
                setFrozen(favs)
                setOpenId(q.id)
              }}
              style={{ aspectRatio: RATIOS[hash(q.id) % RATIOS.length] }}
            >
              <PhotoBg photo={tilePhotos.get(q.id)!} thumb />
              <div className="tile-shade" />
              <div className="tile-text">
                <p className="tile-quote">{q.text}</p>
                {q.author && <p className="tile-author">{q.author}</p>}
              </div>
              <button
                className="tile-heart"
                aria-label="Favorilerden çıkar"
                onClick={(e) => {
                  e.stopPropagation()
                  remove(q)
                }}
              >
                <HeartIcon filled width={18} height={18} />
              </button>
            </motion.article>
          ))}
        </div>
      )}

      {hidden.length > 0 && (
        <button className="hidden-link" onClick={() => setShowHidden(true)}>
          <EyeIcon width={20} height={20} />
          <span>
            Akıştan çıkardığın sözler <b>{hidden.length}</b>
          </span>
        </button>
      )}

      <Sheet open={showHidden} title="Akıştan çıkardıkların" onClose={() => setShowHidden(false)}>
        <p className="sheet-note">Sola kaydırdığın sözler burada. Geri getirdiklerin akışta yeniden karşına çıkar.</p>
        <ul className="hidden-list">
          {hidden.map((q) => (
            <li key={q.id}>
              <p>{q.text}</p>
              <button className="mini-chip" onClick={() => unhideQuote(q.id)}>
                <RepeatIcon width={14} height={14} /> Geri getir
              </button>
            </li>
          ))}
        </ul>
        {hidden.length > 1 && (
          <button
            className="btn-ghost wide"
            onClick={() => {
              unhideMany(hidden.map((q) => q.id))
              setShowHidden(false)
              toast('Hepsi akışa geri döndü')
            }}
          >
            Hepsini geri getir
          </button>
        )}
      </Sheet>

      <AnimatePresence>
        {openId !== null && frozen.length > 0 && (
          <motion.div
            className="viewer"
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.96 }}
            transition={{ duration: 0.25 }}
          >
            <CardDeck quotes={frozen} currentId={openId} onCurrent={setOpenId} mode="browse" keyboard />
            <button className="viewer-close icon-btn glass" onClick={() => setOpenId(null)} aria-label="Kapat">
              <CloseIcon />
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
}
