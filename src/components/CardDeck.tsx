import { useCallback, useEffect, useRef, useState } from 'react'
import type { Quote } from '../data/quotes'
import { mod, shareQuote } from '../lib/deck'
import { preload } from '../lib/imageCache'
import { photoForQuote, usePhotos } from '../lib/photos'
import { addFav, hideQuote, markBroken, setPhotoFor, toggleFav, unhideQuote, useStore } from '../lib/store'
import { toast } from '../lib/toast'
import { burstHeart } from './HeartBurst'
import { PhotoGrid } from './PhotoGrid'
import { QuoteCard } from './QuoteCard'
import { Sheet } from './Sheet'
import { SwipeDeck, type DeckHandle, type SwipeDir } from './SwipeDeck'

interface Props {
  quotes: Quote[]
  currentId?: string
  onCurrent: (id: string) => void
  /** 'feed': sağa = tekrar gör, sola = akıştan çıkar. 'browse': sadece gezinme (favoriler). */
  mode: 'feed' | 'browse'
  keyboard?: boolean
  badgeFor?: (q: Quote) => string | undefined
}

/** Kaydırmalı söz kartları + favori, paylaş, geri al ve fotoğraf değiştir eylemleri. */
export function CardDeck({ quotes, currentId, onCurrent, mode, keyboard, badgeFor }: Props) {
  const photos = usePhotos()
  const photoFor = useStore((s) => s.photoFor)
  const favs = useStore((s) => s.favs)
  const [zen, setZen] = useState(false)
  const [picking, setPicking] = useState<Quote | null>(null)
  const deck = useRef<DeckHandle>(null)
  const history = useRef<{ id: string; dir: SwipeDir }[]>([])
  const [historyLen, setHistoryLen] = useState(0)

  const n = quotes.length
  const index = Math.max(0, quotes.findIndex((q) => q.id === currentId))

  // Tek dokunuş: sadece fotoğraf ve söz kalsın (sade görünüm).
  useEffect(() => {
    document.documentElement.classList.toggle('zen', zen)
    return () => document.documentElement.classList.remove('zen')
  }, [zen])

  // Sıradaki kartların fotoğraflarını şimdiden indirip hazırla.
  useEffect(() => {
    if (!n) return
    for (const d of [1, 2, 3, 4, -1]) {
      const p = photoForQuote(quotes[mod(index + d, n)], photos, photoFor)
      // Yüklenemeyen fotoğraf, kart daha ekrana gelmeden değiştirilir.
      if (!p.own) preload(p.src, () => markBroken(p.id))
    }
  }, [index, n, quotes, photos, photoFor])

  const push = (entry: { id: string; dir: SwipeDir }) => {
    history.current = [...history.current.slice(-49), entry]
    setHistoryLen(history.current.length)
  }

  const goBack = useCallback(() => {
    const last = history.current.pop()
    setHistoryLen(history.current.length)
    if (last) {
      deck.current?.back(last.dir, last.id, () => {
        if (mode === 'feed' && last.dir === 'left') unhideQuote(last.id)
        onCurrent(last.id)
      })
    } else if (mode === 'browse' && n > 1) {
      const prev = quotes[mod(index - 1, n)]
      deck.current?.back('left', prev.id, () => onCurrent(prev.id))
    }
  }, [mode, n, quotes, index, onCurrent])

  const onSwipe = (dir: SwipeDir, q: Quote) => {
    const next = quotes[mod(index + 1, n)]
    push({ id: q.id, dir })
    // Bildirim yok: yanlışlıkla atılan söz, kartın sağındaki geri okuyla geri gelir.
    if (mode === 'feed' && dir === 'left') hideQuote(q.id)
    if (next && next.id !== q.id) onCurrent(next.id)
  }

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

  const canBack = mode === 'browse' ? n > 1 : historyLen > 0

  return (
    <>
      <SwipeDeck
        ref={deck}
        items={quotes}
        index={index}
        mode={mode}
        onSwipe={onSwipe}
        onBack={goBack}
        keyboard={keyboard && !picking}
        onTap={() => setZen((z) => !z)}
        onDoubleTap={(q, p) => {
          burstHeart(p.x, p.y)
          navigator.vibrate?.(12)
          addFav(q.id)
        }}
        render={(q, role) => (
          <QuoteCard
            quote={q}
            photo={photoForQuote(q, photos, photoFor)}
            active={role === 'top'}
            // Yavaş yakınlaşma sadece üstteki kartta çalışır.
            moving={role === 'top'}
            fav={favs.includes(q.id)}
            badge={badgeFor?.(q)}
            canBack={role === 'top' && canBack}
            onBack={goBack}
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
