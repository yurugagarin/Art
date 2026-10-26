import { AnimatePresence, motion } from 'motion/react'
import { useSyncExternalStore } from 'react'
import { HeartIcon } from './Icons'

interface Burst {
  id: number
  x: number
  y: number
}

let bursts: Burst[] = []
const listeners = new Set<() => void>()
const emit = () => listeners.forEach((l) => l())

/** Ekranın verilen noktasında kalp patlaması gösterir. */
export function burstHeart(x: number, y: number) {
  const id = Date.now() + Math.random()
  bursts = [...bursts, { id, x, y }]
  emit()
  setTimeout(() => {
    bursts = bursts.filter((b) => b.id !== id)
    emit()
  }, 900)
}

const PARTICLES = Array.from({ length: 8 }, (_, i) => (i / 8) * Math.PI * 2)

export function HeartBurstLayer() {
  const list = useSyncExternalStore(
    (l) => {
      listeners.add(l)
      return () => listeners.delete(l)
    },
    () => bursts,
  )
  return (
    <div className="burst-layer" aria-hidden>
      <AnimatePresence>
        {list.map((b) => (
          <motion.div key={b.id} className="burst" style={{ left: b.x, top: b.y }} exit={{ opacity: 0 }}>
            <motion.div
              className="burst-heart"
              initial={{ scale: 0, rotate: -15, opacity: 0 }}
              animate={{ scale: [0, 1.25, 1], rotate: [-15, 6, 0], opacity: [0, 1, 1] }}
              transition={{ duration: 0.45, ease: 'easeOut' }}
            >
              <HeartIcon filled width={96} height={96} strokeWidth={0} />
            </motion.div>
            {PARTICLES.map((a, i) => (
              <motion.span
                key={i}
                className="burst-dot"
                initial={{ x: 0, y: 0, scale: 1, opacity: 1 }}
                animate={{ x: Math.cos(a) * 78, y: Math.sin(a) * 78, scale: 0, opacity: 0 }}
                transition={{ duration: 0.65, ease: 'easeOut', delay: 0.08 }}
              />
            ))}
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  )
}
