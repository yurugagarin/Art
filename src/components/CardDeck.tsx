import { useEffect, useState } from 'react'
import type { Quote } from '../data/quotes'
import { mod, shareQuote } from '../lib/deck'
import { photoForQuote, preload, usePhotos } from '../lib/photos'
import { addFav, setPhotoFor, toggleFav, useStore } from '../lib/store'
import { toast } from '../lib/toast'
import { burstHeart } from './HeartBurst'
import { PhotoGrid } from './PhotoGrid'
import { QuoteCard } from './QuoteCard'
import { Sheet } from './Sheet'
import { SwipeDeck } from './SwipeDeck'

interface Props {
  quotes: Quote[]
  index: number
  onIndex: (i: number) => void
  keyboard?: boolean
  badgeFor?: (q: Quote, i: number) => string | undefined
}

/** Kaydırmalı söz kartları + favori, paylaş ve fotoğraf değiştir eylemleri. */
export function CardDeck({ quotes, index, onIndex, keyboard, badgeFor }: Props) {
  const photos = usePhotos()
  const photoFor = useStore((s) => s.photoFor)
  const favs = useStore((s) => s.favs)
  const [zen, setZen] = useState(false)
  const [picking, setPicking] = useState<Quote | null>(null)

  // Tek dokunuş: sadece fotoğraf ve söz kalsın (sade görünüm).
  useEffect(() => {
    document.documentElement.classList.toggle('zen', zen)
    return () => document.documentElement.classList.remove('zen')
  }, [zen])

  // Komşu kartların fotoğraflarını önceden yükle.
  useEffect(() => {
    const n = quotes.length
    if (!n) return
    for (const d of [1, 2, -1]) preload(photoForQuote(quotes[mod(index + d, n)], photos, photoFor).src)
  }, [index, quotes, photos, photoFor])

  const fav = (q: Quote) => {
    const on = toggleFav(q.id)
    if (on) navigator.vibrate?.(12)
    toast(on ? 'Favorilere eklendi ♥' : 'Favorilerden çıkarıldı')
  }

  const share = async (q: Quote) => {
    const r = await shareQuote(q)
    if (r === 'copied') toast('Söz panoya kopyalandı')
    if (r === 'failed') toast('Paylaşılamadı')
  }

  return (
    <>
      <SwipeDeck
        items={quotes}
        index={index}
        onIndex={onIndex}
        keyboard={keyboard && !picking}
        onTap={() => setZen((z) => !z)}
        onDoubleTap={(q, p) => {
          burstHeart(p.x, p.y)
          navigator.vibrate?.(12)
          addFav(q.id)
        }}
        render={(q, active) => (
          <QuoteCard
            quote={q}
            photo={photoForQuote(q, photos, photoFor)}
            active={active}
            fav={favs.includes(q.id)}
            badge={badgeFor?.(q, quotes.indexOf(q))}
            onFav={() => fav(q)}
            onShare={() => share(q)}
            onPhoto={() => setPicking(q)}
          />
        )}
      />
      <Sheet open={!!picking} title="Bu söze bir fotoğraf seç" onClose={() => setPicking(null)}>
        {picking && (
          <PhotoGrid
            selected={photoForQuote(picking, photos, photoFor).id}
            onSelect={(p) => {
              setPhotoFor(picking.id, p.id)
              setPicking(null)
            }}
          />
        )}
      </Sheet>
    </>
  )
}
