import { useState } from 'react'
import { addCategory, updateCategory, type CustomCategory } from '../lib/store'
import { CheckIcon } from './Icons'
import { Sheet } from './Sheet'

const EMOJIS = ['💪', '🔥', '⚡️', '🏋️', '🥊', '🏃', '🚴', '🧘', '👕', '🪞', '🎯', '🏆', '🧠', '📈', '☀️', '🌊', '🌴', '✨', '💙', '❤️', '🙏', '🍀', '🎧', '☕️']

interface Props {
  open: boolean
  /** Düzenlenen kategori; boşsa yeni kategori oluşturulur. */
  editing?: CustomCategory | null
  onClose: () => void
  onSaved?: (cat: CustomCategory) => void
}

export function CategorySheet({ open, editing, onClose, onSaved }: Props) {
  return (
    <Sheet open={open} title={editing ? 'Kategoriyi düzenle' : 'Yeni kategori'} onClose={onClose}>
      {open && <CategoryForm key={editing?.id ?? 'yeni'} editing={editing} onClose={onClose} onSaved={onSaved} />}
    </Sheet>
  )
}

function CategoryForm({ editing, onClose, onSaved }: Omit<Props, 'open'>) {
  const [label, setLabel] = useState(editing?.label ?? '')
  const [emoji, setEmoji] = useState(editing?.emoji ?? EMOJIS[0])
  const ok = label.trim().length > 0

  const save = () => {
    if (!ok) return
    if (editing) {
      updateCategory(editing.id, { label: label.trim(), emoji })
      onSaved?.({ ...editing, label: label.trim(), emoji })
    } else {
      onSaved?.(addCategory(label.trim(), emoji))
    }
    onClose()
  }

  return (
    <div className="cat-form">
      <div className="cat-preview">
        <span className="chip on">
          {emoji} {label.trim() || 'Kategori adı'}
        </span>
      </div>
      <label className="field">
        <span className="field-label">Ad</span>
        <input
          value={label}
          onChange={(e) => setLabel(e.target.value)}
          placeholder="Örn. Sabah, Salon, Gömlek günü…"
          maxLength={24}
          autoFocus
          onKeyDown={(e) => e.key === 'Enter' && save()}
        />
      </label>
      <div className="field">
        <span className="field-label">Simge</span>
        <div className="emoji-grid">
          {EMOJIS.map((e) => (
            <button key={e} className={`emoji-btn${emoji === e ? ' on' : ''}`} onClick={() => setEmoji(e)} aria-label={`Simge ${e}`}>
              {e}
            </button>
          ))}
        </div>
      </div>
      <button className="btn-primary wide" onClick={save} disabled={!ok}>
        <CheckIcon /> {editing ? 'Kaydet' : 'Kategoriyi oluştur'}
      </button>
    </div>
  )
}
