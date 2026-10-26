// Kendi yüklenen fotoğraflar için çok küçük bir IndexedDB sarmalayıcısı.

export interface PhotoRow {
  id: string
  blob: Blob
  createdAt: number
}

const DB = 'kivilcim'
const STORE = 'photos'

function open(): Promise<IDBDatabase> {
  return new Promise((resolve, reject) => {
    const req = indexedDB.open(DB, 1)
    req.onupgradeneeded = () => req.result.createObjectStore(STORE, { keyPath: 'id' })
    req.onsuccess = () => resolve(req.result)
    req.onerror = () => reject(req.error)
  })
}

async function tx<T>(mode: IDBTransactionMode, run: (s: IDBObjectStore) => IDBRequest<T>): Promise<T> {
  const db = await open()
  return new Promise((resolve, reject) => {
    const req = run(db.transaction(STORE, mode).objectStore(STORE))
    req.onsuccess = () => resolve(req.result)
    req.onerror = () => reject(req.error)
  })
}

export const idbGetAll = () => tx<PhotoRow[]>('readonly', (s) => s.getAll())
export const idbPut = (row: PhotoRow) => tx('readwrite', (s) => s.put(row))
export const idbDelete = (id: string) => tx('readwrite', (s) => s.delete(id))
