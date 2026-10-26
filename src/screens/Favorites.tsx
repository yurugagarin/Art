import { AnimatePresence, motion } from 'motion/react'
import { useMemo, useState } from 'react'
import { CardDeck } from '../components/CardDeck'
import { CloseIcon, HeartIcon, SparkIcon } from '../components/Icons'
import { PhotoBg } from '../components/PhotoBg'
import { hash, photoForQuote, usePhotos } from '../lib/photos'
import { toggleFav, useStore } from '../lib/store'
import { toast } from '../lib/toast'
import { useQuoteMap } from '../lib/useQuotes'
import type { Quote } from '../data/quotes'

const RATIOS = ['3 / 4', '4 / 5', '2 / 3', '4 / 5', '1 / 1', '3 / 4']

export function Favorites({ onExplore }: { onExplore: () => void }) {
  const favIds = useStore((s) => s.favs)
  const photoFor = useStore((s) => s.photoFor)
  const map = useQuoteMap()
  const photos = usePhotos()
  const favs = useMemo(() => favIds.map((id) => map.get(id)).filter((q): q is Quote => !!q), [favIds, map])
  const [open, setOpen] = useState<number | null>(null)
  // Görüntüleyici açıkken liste değişirse (favoriden çıkarma) kartlar yerinde kalsın.
  const [frozen, setFrozen] = useState(favs)

  const remove = (id: string) => {
    toggleFav(id)
    toast('Favorilerden çıkarıldı', { label: 'Geri al', run: () => toggleFav(id) })
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
            <SparkIcon /> Sözlere göz at
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
                setOpen(i)
              }}
              style={{ aspectRatio: RATIOS[hash(q.id) % RATIOS.length] }}
            >
              <PhotoBg photo={photoForQuote(q, photos, photoFor)} thumb />
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
                  remove(q.id)
                }}
              >
                <HeartIcon filled width={18} height={18} />
              </button>
            </motion.article>
          ))}
        </div>
      )}

      <AnimatePresence>
        {open !== null && frozen.length > 0 && (
          <motion.div
            className="viewer"
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.96 }}
            transition={{ duration: 0.25 }}
          >
            <CardDeck quotes={frozen} index={open} onIndex={setOpen} keyboard />
            <button className="viewer-close icon-btn glass" onClick={() => setOpen(null)} aria-label="Kapat">
              <CloseIcon />
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
}
