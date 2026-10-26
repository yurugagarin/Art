import { useState } from 'react'
import { THEME_GRADIENTS, type Photo } from '../data/photos'
import { markBroken } from '../lib/store'

const loadedSrcs = new Set<string>()

interface Props {
  photo: Photo
  /** Yavaş yakınlaşma (Ken Burns) efekti. */
  moving?: boolean
  thumb?: boolean
}

export function PhotoBg({ photo, moving, thumb }: Props) {
  const src = thumb ? photo.thumb : photo.src
  const [loaded, setLoaded] = useState(() => loadedSrcs.has(src))
  const instant = loadedSrcs.has(src)

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
            if (img?.complete && img.naturalWidth > 0 && !loaded) {
              loadedSrcs.add(src)
              setLoaded(true)
            }
          }}
          onLoad={() => {
            loadedSrcs.add(src)
            setLoaded(true)
          }}
          onError={() => markBroken(photo.id)}
        />
      )}
      <div className="grain" />
    </div>
  )
}
