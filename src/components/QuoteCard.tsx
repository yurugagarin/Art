import type { Photo } from '../data/photos'
import type { Quote } from '../data/quotes'
import { useCategoryOf } from '../lib/categories'
import { sizeClass } from '../lib/deck'
import { Highlight } from '../lib/text'
import { HeartIcon, ImageIcon, ShareIcon, UndoIcon } from './Icons'
import { PhotoBg } from './PhotoBg'

interface Props {
  quote: Quote
  photo: Photo
  active?: boolean
  /** Fotoğrafta yavaş yakınlaşma efekti. */
  moving?: boolean
  fav?: boolean
  badge?: string
  canBack?: boolean
  onBack?: () => void
  onFav?: () => void
  onShare?: () => void
  onPhoto?: () => void
}

export function QuoteCard({ quote, photo, moving = true, fav, badge, canBack, onBack, onFav, onShare, onPhoto }: Props) {
  const cat = useCategoryOf(quote)
  return (
    <article className="card">
      <PhotoBg key={photo.id} photo={photo} moving={moving} />
      <div className="card-shade" />

      <div className="card-body">
        <div className="card-meta">
          {badge && <span className="badge">{badge}</span>}
          <span className="cat-pill">
            <span aria-hidden>{cat.emoji}</span> {cat.label}
          </span>
        </div>
        <span className="qmark" aria-hidden>
          “
        </span>
        <blockquote className={`quote ${sizeClass(quote)}`}>
          <Highlight text={quote.text} />
        </blockquote>
        {quote.tr && (
          <p className="quote-tr">
            <Highlight text={quote.tr} />
          </p>
        )}
        {quote.author && (
          <p className="quote-author">
            <span className="dash" aria-hidden />
            {/* Büyük harfe çevirme dil kuralına göre: İngilizce sözlerde "RICHARD", Türkçe sözlerde "HİKMET". */}
            <span lang={quote.tr ? 'en' : 'tr'}>{quote.author}</span>
            {quote.note && <span className="quote-note">{quote.note}</span>}
          </p>
        )}
        {!quote.author && quote.note && <p className="quote-fact">{quote.note}</p>}
      </div>

      <div className="card-actions">
        <button className={`act act-small${canBack ? '' : ' act-hidden'}`} onClick={onBack} aria-label="Geri al" tabIndex={canBack ? 0 : -1}>
          <UndoIcon width={20} height={20} />
        </button>
        <button className={`act${fav ? ' act-fav' : ''}`} onClick={onFav} aria-label={fav ? 'Favorilerden çıkar' : 'Favorilere ekle'}>
          <HeartIcon filled={fav} />
        </button>
        <button className="act" onClick={onShare} aria-label="Paylaş">
          <ShareIcon />
        </button>
        <button className="act" onClick={onPhoto} aria-label="Fotoğrafı değiştir">
          <ImageIcon />
        </button>
      </div>
    </article>
  )
}
