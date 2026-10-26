import type { Photo } from '../data/photos'
import type { Quote } from '../data/quotes'
import { useCategoryOf } from '../lib/categories'
import { sizeClass } from '../lib/deck'
import { HeartIcon, ImageIcon, ShareIcon, UndoIcon } from './Icons'
import { PhotoBg } from './PhotoBg'

interface Props {
  quote: Quote
  photo: Photo
  active?: boolean
  fav?: boolean
  badge?: string
  canBack?: boolean
  onBack?: () => void
  onFav?: () => void
  onShare?: () => void
  onPhoto?: () => void
}

export function QuoteCard({ quote, photo, active, fav, badge, canBack, onBack, onFav, onShare, onPhoto }: Props) {
  const cat = useCategoryOf(quote)
  return (
    <article className="card">
      <PhotoBg key={photo.id} photo={photo} moving={active} />
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
        <blockquote className={`quote ${sizeClass(quote)}`}>{quote.text}</blockquote>
        {quote.tr && <p className="quote-tr">{quote.tr}</p>}
        {quote.author && (
          <p className="quote-author">
            <span className="dash" aria-hidden />
            {quote.author}
            {quote.note && <span className="quote-note">{quote.note}</span>}
          </p>
        )}
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
