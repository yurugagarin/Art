import { useRef, useState } from 'react'
import { CategorySheet } from '../components/CategorySheet'
import { PhotoGrid } from '../components/PhotoGrid'
import { CheckIcon, PenIcon, PlusIcon, TrashIcon } from '../components/Icons'
import { PhotoBg } from '../components/PhotoBg'
import { QuoteCard } from '../components/QuoteCard'
import type { Quote } from '../data/quotes'
import { useCategories } from '../lib/categories'
import { findPhoto, photoForQuote, usePhotos } from '../lib/photos'
import {
  addMine,
  exportBackup,
  importBackup,
  removeCategory,
  removeMine,
  setPhotoFor,
  updateMine,
  useStore,
  type CustomCategory,
} from '../lib/store'
import { toast } from '../lib/toast'

const WHO = ['Kendim', 'Koçum', 'Annem', 'Babam', 'Bir arkadaşım', 'Sevgilim']

interface Draft {
  text: string
  author: string
  cat: Quote['cat']
  photo?: string
}

const EMPTY: Draft = { text: '', author: '', cat: 'hatirlat' }

export function Compose({ onSaved }: { onSaved: (id: string) => void }) {
  const mine = useStore((s) => s.mine)
  const photoFor = useStore((s) => s.photoFor)
  const photos = usePhotos()
  const cats = useCategories()
  const customCats = useStore((s) => s.cats)
  const [catSheet, setCatSheet] = useState<{ editing: CustomCategory | null } | null>(null)
  const [draft, setDraft] = useState<Draft>(EMPTY)
  const [editing, setEditing] = useState<string | null>(null)
  const top = useRef<HTMLDivElement>(null)
  const fileInput = useRef<HTMLInputElement>(null)

  const preview: Quote = {
    id: editing ?? 'taslak',
    text: draft.text.trim() || 'Sana iyi gelen o cümleyi buraya yaz…',
    author: draft.author.trim() || undefined,
    cat: draft.cat,
    photo: draft.photo,
    mine: true,
  }
  const previewPhoto = findPhoto(draft.photo, photos) ?? photoForQuote(preview, photos, {})
  const canSave = draft.text.trim().length > 0

  const save = () => {
    if (!canSave) return
    const data = { text: draft.text.trim(), author: draft.author.trim() || undefined, cat: draft.cat, photo: draft.photo }
    if (editing) {
      updateMine(editing, data)
      if (draft.photo) setPhotoFor(editing, draft.photo)
      toast('Söz güncellendi ✦')
      onSaved(editing)
    } else {
      const q = addMine(data)
      toast('Sözün eklendi ✦')
      onSaved(q.id)
    }
    setDraft(EMPTY)
    setEditing(null)
  }

  const edit = (q: Quote) => {
    setEditing(q.id)
    setDraft({ text: q.text, author: q.author ?? '', cat: q.cat, photo: q.photo ?? photoFor[q.id] })
    top.current?.scrollIntoView({ behavior: 'smooth' })
  }

  const backup = async () => {
    const blob = await exportBackup()
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `momentum-yedek-${new Date().toISOString().slice(0, 10)}.json`
    a.click()
    setTimeout(() => URL.revokeObjectURL(url), 2000)
  }

  const restore = async (file?: File) => {
    if (!file) return
    try {
      const n = await importBackup(file)
      toast(`Yedek yüklendi, ${n} yeni söz eklendi`)
    } catch (e) {
      toast(e instanceof Error ? e.message : 'Yedek yüklenemedi')
    }
    if (fileInput.current) fileInput.current.value = ''
  }

  return (
    <section className="screen compose">
      <div ref={top} />
      <header className="page-head">
        <p className="eyebrow">{editing ? 'Düzenle' : 'Senin sözün'}</p>
        <h1 className="page-title">{editing ? 'Sözünü düzenle' : 'Kendine bir not yaz'}</h1>
        <p className="page-sub">Bir cümle, bir an, birinin sana söylediği bir şey. Motivasyonun düştüğünde karşına çıksın.</p>
      </header>

      <div className="compose-preview">
        <QuoteCard quote={preview} photo={previewPhoto} active />
      </div>

      <div className="form">
        <label className="field">
          <span className="field-label">Söz</span>
          <textarea
            value={draft.text}
            onChange={(e) => setDraft({ ...draft, text: e.target.value })}
            placeholder="Örn. O gömleği giydiğinde nasıl hissettiğini hatırla."
            rows={3}
            maxLength={280}
          />
          <span className="field-count">{draft.text.length}/280</span>
        </label>

        <label className="field">
          <span className="field-label">Kim söyledi? (isteğe bağlı)</span>
          <input value={draft.author} onChange={(e) => setDraft({ ...draft, author: e.target.value })} placeholder="Ben, koçum, bir arkadaşım…" maxLength={60} />
        </label>
        <div className="mini-chips">
          {WHO.map((w) => (
            <button key={w} className={`mini-chip${draft.author === w ? ' on' : ''}`} onClick={() => setDraft({ ...draft, author: draft.author === w ? '' : w })}>
              {w}
            </button>
          ))}
        </div>

        <div className="field">
          <span className="field-label">Kategori</span>
          <div className="mini-chips">
            {cats.map((c) => (
              <button key={c.id} className={`mini-chip${draft.cat === c.id ? ' on' : ''}`} onClick={() => setDraft({ ...draft, cat: c.id })}>
                {c.emoji} {c.label}
              </button>
            ))}
            <button className="mini-chip mini-chip-add" onClick={() => setCatSheet({ editing: null })}>
              <PlusIcon width={15} height={15} /> Yeni kategori
            </button>
          </div>
        </div>

        <div className="field">
          <span className="field-label">Fotoğraf</span>
          <PhotoGrid layout="strip" selected={previewPhoto.id} onSelect={(p) => setDraft({ ...draft, photo: p.id })} />
        </div>

        <div className="form-actions">
          {editing && (
            <button
              className="btn-ghost"
              onClick={() => {
                setEditing(null)
                setDraft(EMPTY)
              }}
            >
              Vazgeç
            </button>
          )}
          <button className="btn-primary grow" onClick={save} disabled={!canSave}>
            <CheckIcon /> {editing ? 'Güncelle' : 'Kaydet'}
          </button>
        </div>
      </div>

      {mine.length > 0 && (
        <div className="mine">
          <h2 className="section-title">Eklediklerim · {mine.length}</h2>
          <ul className="mine-list">
            {mine.map((q) => (
              <li key={q.id} className="mine-row">
                <div className="mine-thumb">
                  <PhotoBg photo={photoForQuote(q, photos, photoFor)} thumb />
                </div>
                <div className="mine-text">
                  <p>{q.text}</p>
                  {q.author && <span>{q.author}</span>}
                </div>
                <button className="icon-btn" aria-label="Düzenle" onClick={() => edit(q)}>
                  <PenIcon width={20} height={20} />
                </button>
                <button
                  className="icon-btn"
                  aria-label="Sil"
                  onClick={() => {
                    if (confirm('Bu sözü silmek istiyor musun?')) removeMine(q.id)
                  }}
                >
                  <TrashIcon width={20} height={20} />
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}

      {customCats.length > 0 && (
        <div className="mine">
          <h2 className="section-title">Kategorilerim · {customCats.length}</h2>
          <ul className="mine-list">
            {customCats.map((c) => {
              const count = mine.filter((q) => q.cat === c.id).length
              return (
                <li key={c.id} className="mine-row cat-row">
                  <span className="cat-emoji">{c.emoji}</span>
                  <div className="mine-text">
                    <p>{c.label}</p>
                    <span>{count ? `${count} söz` : 'Henüz söz yok'}</span>
                  </div>
                  <button className="icon-btn" aria-label="Kategoriyi düzenle" onClick={() => setCatSheet({ editing: c })}>
                    <PenIcon width={20} height={20} />
                  </button>
                  <button
                    className="icon-btn"
                    aria-label="Kategoriyi sil"
                    onClick={() => {
                      const msg = count
                        ? `"${c.label}" silinsin mi? İçindeki ${count} söz "Kendine Hatırlat"a taşınacak.`
                        : `"${c.label}" silinsin mi?`
                      if (confirm(msg)) {
                        removeCategory(c.id)
                        if (draft.cat === c.id) setDraft({ ...draft, cat: 'hatirlat' })
                      }
                    }}
                  >
                    <TrashIcon width={20} height={20} />
                  </button>
                </li>
              )
            })}
          </ul>
        </div>
      )}

      <CategorySheet
        open={!!catSheet}
        editing={catSheet?.editing}
        onClose={() => setCatSheet(null)}
        onSaved={(c) => {
          if (!catSheet?.editing) setDraft((d) => ({ ...d, cat: c.id as Quote['cat'] }))
        }}
      />

      <footer className="backup">
        <p>Sözlerin, favorilerin ve fotoğrafların yalnızca bu telefonda saklanır. Arada bir yedek almak iyi fikir.</p>
        <div className="backup-actions">
          <button className="btn-ghost" onClick={backup}>
            Yedek al
          </button>
          <button className="btn-ghost" onClick={() => fileInput.current?.click()}>
            Yedeği geri yükle
          </button>
          <input ref={fileInput} type="file" accept="application/json,.json" hidden onChange={(e) => restore(e.target.files?.[0])} />
        </div>
      </footer>
    </section>
  )
}
