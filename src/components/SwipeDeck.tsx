import { animate, motion, useMotionValue, useMotionValueEvent, useTransform, type PanInfo } from 'motion/react'
import { useCallback, useEffect, useRef, useState, type ReactNode } from 'react'
import { flushSync } from 'react-dom'
import { mod } from '../lib/deck'
import { ChevronIcon } from './Icons'

interface Props<T> {
  items: T[]
  index: number
  onIndex: (i: number) => void
  render: (item: T, active: boolean) => ReactNode
  onDoubleTap?: (item: T, point: { x: number; y: number }) => void
  onTap?: () => void
  /** Ok tuşlarıyla gezinme. */
  keyboard?: boolean
}

const EASE = [0.32, 0.72, 0.2, 1] as const

export function SwipeDeck<T extends { id: string }>({ items, index, onIndex, render, onDoubleTap, onTap, keyboard }: Props<T>) {
  const n = items.length
  const ref = useRef<HTMLDivElement>(null)
  const x = useMotionValue(0)
  const busy = useRef(false)
  const [side, setSide] = useState<1 | -1>(1)
  const sideRef = useRef(side)
  const width = () => ref.current?.offsetWidth || window.innerWidth

  useMotionValueEvent(x, 'change', (v) => {
    const s = v < 0 ? 1 : v > 0 ? -1 : sideRef.current
    if (s !== sideRef.current) {
      sideRef.current = s
      setSide(s)
    }
  })

  const progress = useTransform(x, (v) => Math.min(Math.abs(v) / (width() * 0.85), 1))
  const rotate = useTransform(x, (v) => (v / width()) * 7)
  const underScale = useTransform(progress, [0, 1], [0.9, 1])
  const scrim = useTransform(progress, [0, 1], [0.55, 0])

  const go = useCallback(
    async (d: 1 | -1) => {
      if (busy.current || n < 2) return
      busy.current = true
      sideRef.current = d
      setSide(d)
      await animate(x, -d * width() * 1.2, { duration: 0.36, ease: EASE })
      flushSync(() => onIndex(mod(index + d, n)))
      x.jump(0)
      busy.current = false
    },
    [index, n, onIndex, x],
  )

  useEffect(() => {
    if (!keyboard) return
    const onKey = (e: KeyboardEvent) => {
      const t = e.target as HTMLElement
      if (t.closest('input, textarea, [contenteditable]')) return
      if (e.key === 'ArrowRight') go(1)
      else if (e.key === 'ArrowLeft') go(-1)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [keyboard, go])

  const lastTap = useRef(0)
  const lastDrag = useRef(0)
  const tapTimer = useRef<number | undefined>(undefined)
  useEffect(() => () => clearTimeout(tapTimer.current), [])

  if (n === 0) return null
  const cur = items[mod(index, n)]
  const under = items[mod(index + side, n)]

  const onDragEnd = (_: unknown, info: PanInfo) => {
    lastDrag.current = performance.now()
    const w = width()
    if (info.offset.x < -w * 0.2 || info.velocity.x < -500) go(1)
    else if (info.offset.x > w * 0.2 || info.velocity.x > 500) go(-1)
    else animate(x, 0, { type: 'spring', stiffness: 420, damping: 32 })
  }

  const onTapCard = (e: PointerEvent, point: { x: number; y: number }) => {
    if ((e.target as HTMLElement).closest('button, a, input')) return
    const now = performance.now()
    if (now - lastDrag.current < 200) return
    if (now - lastTap.current < 300) {
      clearTimeout(tapTimer.current)
      lastTap.current = 0
      onDoubleTap?.(cur, point)
    } else {
      lastTap.current = now
      tapTimer.current = window.setTimeout(() => onTap?.(), 300)
    }
  }

  return (
    <div className="deck" ref={ref}>
      {n > 1 && (
        <motion.div className="deck-card deck-under" key={`u-${under.id}`} style={{ scale: underScale }}>
          {render(under, false)}
          <motion.div className="deck-scrim" style={{ opacity: scrim }} />
        </motion.div>
      )}
      <motion.div
        key={cur.id}
        className="deck-card deck-top"
        drag={n > 1 ? 'x' : false}
        dragMomentum={false}
        style={{ x, rotate }}
        onDrag={() => (lastDrag.current = performance.now())}
        onDragEnd={onDragEnd}
        onTap={(e, info) => onTapCard(e as PointerEvent, info.point)}
      >
        {render(cur, true)}
      </motion.div>

      {n > 1 && (
        <>
          <button className="deck-nav deck-prev" onClick={() => go(-1)} aria-label="Önceki söz">
            <ChevronIcon dir="left" />
          </button>
          <button className="deck-nav deck-next" onClick={() => go(1)} aria-label="Sonraki söz">
            <ChevronIcon />
          </button>
        </>
      )}
    </div>
  )
}
