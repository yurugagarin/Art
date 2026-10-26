import { useSyncExternalStore } from 'react'
import type { Quote } from '../data/quotes'
import { idbDelete, idbGetAll, idbPut } from './idb'

// Tüm kişisel veriler bu telefonda/tarayıcıda saklanır (localStorage + IndexedDB).

export interface CustomCategory {
  id: string
  label: string
  emoji: string
  createdAt: number
}

interface State {
  /** Favori söz id'leri, en yeni başta. */
  favs: string[]
  /** Kullanıcının kendi sözleri. */
  mine: Quote[]
  /** Kullanıcının oluşturduğu kategoriler. */
  cats: CustomCategory[]
  /** Sola kaydırılıp akıştan çıkarılan sözler: sözId -> zaman damgası. */
  hidden: Record<string, number>
  /** Kullanıcının bir söz için seçtiği fotoğraf: sözId -> fotoğrafId. */
  photoFor: Record<string, string>
  /** Yüklenemeyen fotoğraflar: fotoğrafId -> zaman damgası. */
  broken: Record<string, number>
  /** Kaydırma ipuçları gösterildi mi? */
  seenTips: boolean
  /** Kullanıcının yüklediği fotoğraflar: id -> objectURL. */
  ownPhotos: { id: string; url: string; createdAt: number }[]
}

const KEY = 'momentum:v1'
/** Uygulamanın eski adıyla (Kıvılcım) kaydedilmiş veriler; ilk açılışta taşınır. */
const LEGACY_KEY = 'kivilcim:v1'
const BROKEN_RETRY_MS = 7 * 24 * 60 * 60 * 1000

function load(): State {
  const base: State = { favs: [], mine: [], cats: [], hidden: {}, photoFor: {}, broken: {}, seenTips: false, ownPhotos: [] }
  try {
    const raw = localStorage.getItem(KEY) ?? localStorage.getItem(LEGACY_KEY)
    if (!raw) return base
    const saved = JSON.parse(raw) as Partial<State>
    const now = Date.now()
    const broken = Object.fromEntries(
      Object.entries(saved.broken ?? {}).filter(([, t]) => now - t < BROKEN_RETRY_MS),
    )
    return { ...base, ...saved, broken, ownPhotos: [] }
  } catch {
    return base
  }
}

let state: State = load()
const listeners = new Set<() => void>()

function persist() {
  try {
    const { ownPhotos: _, ...rest } = state
    localStorage.setItem(KEY, JSON.stringify(rest))
  } catch {
    /* depolama dolu ya da kapalı olabilir; uygulama yine çalışır */
  }
}

function set(patch: Partial<State>) {
  state = { ...state, ...patch }
  persist()
  listeners.forEach((l) => l())
}

export function useStore<T>(select: (s: State) => T): T {
  return useSyncExternalStore(
    (l) => {
      listeners.add(l)
      return () => listeners.delete(l)
    },
    () => select(state),
  )
}

export const getState = () => state

export function markTipsSeen() {
  if (!state.seenTips) set({ seenTips: true })
}

// ——— Favoriler ———
export function isFav(id: string) {
  return state.favs.includes(id)
}

export function toggleFav(id: string): boolean {
  const on = !isFav(id)
  set({ favs: on ? [id, ...state.favs] : state.favs.filter((f) => f !== id) })
  return on
}

export function addFav(id: string) {
  if (!isFav(id)) set({ favs: [id, ...state.favs] })
}

// ——— Akıştan çıkarılanlar (sola kaydırma) ———
export function hideQuote(id: string) {
  set({ hidden: { ...state.hidden, [id]: Date.now() } })
}

export function unhideQuote(id: string) {
  if (!state.hidden[id]) return
  const hidden = { ...state.hidden }
  delete hidden[id]
  set({ hidden })
}

export function unhideMany(ids: string[]) {
  const hidden = { ...state.hidden }
  ids.forEach((id) => delete hidden[id])
  set({ hidden })
}

// ——— Kendi sözlerim ———
export function addMine(q: Omit<Quote, 'id' | 'mine' | 'createdAt'>): Quote {
  const quote: Quote = { ...q, id: `m-${Date.now().toString(36)}`, mine: true, createdAt: Date.now() }
  set({ mine: [quote, ...state.mine] })
  return quote
}

export function updateMine(id: string, patch: Partial<Quote>) {
  set({ mine: state.mine.map((q) => (q.id === id ? { ...q, ...patch } : q)) })
}

export function removeMine(id: string) {
  const hidden = { ...state.hidden }
  delete hidden[id]
  set({
    mine: state.mine.filter((q) => q.id !== id),
    favs: state.favs.filter((f) => f !== id),
    hidden,
  })
}

// ——— Kendi kategorilerim ———
export function addCategory(label: string, emoji: string): CustomCategory {
  const cat: CustomCategory = { id: `c-${Date.now().toString(36)}`, label, emoji, createdAt: Date.now() }
  set({ cats: [...state.cats, cat] })
  return cat
}

export function updateCategory(id: string, patch: Partial<Pick<CustomCategory, 'label' | 'emoji'>>) {
  set({ cats: state.cats.map((c) => (c.id === id ? { ...c, ...patch } : c)) })
}

/** Kategoriyi siler; içindeki sözler "Kendine Hatırlat"a taşınır. */
export function removeCategory(id: string) {
  set({
    cats: state.cats.filter((c) => c.id !== id),
    mine: state.mine.map((q) => (q.cat === id ? { ...q, cat: 'hatirlat' } : q)),
  })
}

// ——— Fotoğraflar ———
export function setPhotoFor(quoteId: string, photoId: string) {
  set({ photoFor: { ...state.photoFor, [quoteId]: photoId } })
}

export function markBroken(photoId: string) {
  // Çevrimdışıyken her fotoğraf hata verir; bunları bozuk sayma.
  if (state.broken[photoId] || photoId.startsWith('o-') || !navigator.onLine) return
  set({ broken: { ...state.broken, [photoId]: Date.now() } })
}

export async function loadOwnPhotos() {
  try {
    const rows = await idbGetAll()
    state.ownPhotos.forEach((p) => URL.revokeObjectURL(p.url))
    const ownPhotos = rows
      .sort((a, b) => b.createdAt - a.createdAt)
      .map((r) => ({ id: r.id, url: URL.createObjectURL(r.blob), createdAt: r.createdAt }))
    set({ ownPhotos })
  } catch {
    /* IndexedDB yoksa kendi fotoğraf özelliği sessizce devre dışı kalır */
  }
}

export async function addOwnPhoto(blob: Blob): Promise<string> {
  const id = `o-${Date.now().toString(36)}`
  const createdAt = Date.now()
  await idbPut({ id, blob, createdAt })
  set({ ownPhotos: [{ id, url: URL.createObjectURL(blob), createdAt }, ...state.ownPhotos] })
  return id
}

export async function removeOwnPhoto(id: string) {
  await idbDelete(id)
  const photoFor = Object.fromEntries(Object.entries(state.photoFor).filter(([, p]) => p !== id))
  const mine = state.mine.map((q) => (q.photo === id ? { ...q, photo: undefined } : q))
  set({ ownPhotos: state.ownPhotos.filter((p) => p.id !== id), photoFor, mine })
}

// ——— Yedekleme ———
interface Backup {
  /** Eski yedekler "kivilcim" olarak işaretli; onlar da geri yüklenebilir. */
  app: 'momentum' | 'kivilcim'
  version: 1
  favs: string[]
  mine: Quote[]
  cats?: CustomCategory[]
  hidden?: Record<string, number>
  photoFor: Record<string, string>
  photos: { id: string; createdAt: number; dataUrl: string }[]
}

const blobToDataUrl = (blob: Blob) =>
  new Promise<string>((resolve, reject) => {
    const r = new FileReader()
    r.onload = () => resolve(r.result as string)
    r.onerror = () => reject(r.error)
    r.readAsDataURL(blob)
  })

export async function exportBackup(): Promise<Blob> {
  const rows = await idbGetAll().catch(() => [])
  const photos = await Promise.all(
    rows.map(async (r) => ({ id: r.id, createdAt: r.createdAt, dataUrl: await blobToDataUrl(r.blob) })),
  )
  const data: Backup = {
    app: 'momentum',
    version: 1,
    favs: state.favs,
    mine: state.mine,
    cats: state.cats,
    hidden: state.hidden,
    photoFor: state.photoFor,
    photos,
  }
  return new Blob([JSON.stringify(data)], { type: 'application/json' })
}

export async function importBackup(file: File): Promise<number> {
  const data = JSON.parse(await file.text()) as Backup
  if (data.app !== 'momentum' && data.app !== 'kivilcim') throw new Error('Bu dosya bir Momentum yedeği değil.')
  for (const p of data.photos ?? []) {
    const blob = await (await fetch(p.dataUrl)).blob()
    await idbPut({ id: p.id, blob, createdAt: p.createdAt })
  }
  const mineIds = new Set(state.mine.map((q) => q.id))
  const newMine = (data.mine ?? []).filter((q) => !mineIds.has(q.id))
  const catIds = new Set(state.cats.map((c) => c.id))
  set({
    mine: [...newMine, ...state.mine],
    cats: [...state.cats, ...(data.cats ?? []).filter((c) => !catIds.has(c.id))],
    hidden: { ...(data.hidden ?? {}), ...state.hidden },
    favs: Array.from(new Set([...state.favs, ...(data.favs ?? [])])),
    photoFor: { ...(data.photoFor ?? {}), ...state.photoFor },
  })
  await loadOwnPhotos()
  return newMine.length
}
