import { useRef, useState } from 'react'
import type { Photo } from '../data/photos'
import { compressImage, usePhotos } from '../lib/photos'
import { addOwnPhoto, getState, removeOwnPhoto } from '../lib/store'
import { toast } from '../lib/toast'
import { CheckIcon, CloseIcon, PlusIcon } from './Icons'
import { PhotoBg } from './PhotoBg'

interface Props {
  selected?: string
  onSelect: (photo: Photo) => void
  /** Yatay şerit (yazma ekranı) ya da ızgara (alt sayfa). */
  layout?: 'strip' | 'grid'
}

export function PhotoGrid({ selected, onSelect, layout = 'grid' }: Props) {
  const photos = usePhotos()
  const input = useRef<HTMLInputElement>(null)
  const [busy, setBusy] = useState(false)

  const onFile = async (file?: File) => {
    if (!file) return
    setBusy(true)
    try {
      const blob = await compressImage(file)
      const id = await addOwnPhoto(blob)
      const url = getState().ownPhotos.find((p) => p.id === id)?.url ?? ''
      onSelect({ id, theme: 'yaz', src: url, thumb: url, own: true })
      toast('Fotoğrafın eklendi ✦')
    } catch {
      toast('Bu fotoğraf eklenemedi, başka bir tane dener misin?')
    } finally {
      setBusy(false)
      if (input.current) input.current.value = ''
    }
  }

  return (
    <div className={`pgrid pgrid-${layout}`}>
      <button className="ptile ptile-add" onClick={() => input.current?.click()} disabled={busy}>
        <PlusIcon />
        <span>{busy ? 'Ekleniyor…' : 'Kendi fotoğrafın'}</span>
        <input ref={input} type="file" accept="image/*" hidden onChange={(e) => onFile(e.target.files?.[0])} />
      </button>
      {photos.map((p) => (
        <div key={p.id} className={`ptile${selected === p.id ? ' on' : ''}`}>
          <button className="ptile-btn" onClick={() => onSelect(p)} aria-label="Bu fotoğrafı seç">
            <PhotoBg photo={p} thumb />
            {selected === p.id && (
              <span className="ptile-check">
                <CheckIcon />
              </span>
            )}
          </button>
          {p.own && (
            <button
              className="ptile-del"
              aria-label="Fotoğrafı sil"
              onClick={() => {
                if (confirm('Bu fotoğrafı silmek istiyor musun?')) removeOwnPhoto(p.id)
              }}
            >
              <CloseIcon width={14} height={14} />
            </button>
          )}
        </div>
      ))}
    </div>
  )
}
