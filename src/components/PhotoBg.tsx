import { useState } from 'react'
import { THEME_GRADIENTS, type Photo } from '../data/photos'
import { isLoaded, markLoaded } from '../lib/imageCache'
import { markBroken } from '../lib/store'

interface Props {
  photo: Photo
  /** Yavaş yakınlaşma (Ken Burns) efekti. */
  moving?: boolean
  thumb?: boolean
}

export function PhotoBg({ photo, moving, thumb }: Props) {
  const src = thumb ? photo.thumb : photo.src
  // Önceden yüklenmiş fotoğraf geçişsiz, anında görünür.
  const [instant] = useState(() => isLoaded(src))
  const [loaded, setLoaded] = useState(instant)

  const done = () => {
    markLoaded(src)
    setLoaded(true)
  }

  return (
    <div className="photo" style={{ background: THEME_GRADIENTS[photo.theme] }}>
      {src && (
        <img
          key={src}
          src={src}
          alt=""
          draggable={false}
          decoding="async"
          className={`photo-img${loaded ? ' on' : ''}${instant ? ' instant' : ''}${moving ? ' kb' : ''}`}
          ref={(img) => {
            if (img?.complete && img.naturalWidth > 0 && !loaded) done()
          }}
          onLoad={done}
          onError={() => markBroken(photo.id)}
        />
      )}
    </div>
  )
}
