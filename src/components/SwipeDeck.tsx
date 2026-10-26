import {
  animate,
  motion,
  useMotionValue,
  useTransform,
  type MotionValue,
  type PanInfo,
} from 'motion/react'
import { useCallback, useEffect, useImperativeHandle, useRef, type ReactNode, type Ref } from 'react'
import { flushSync } from 'react-dom'
import { mod } from '../lib/deck'
import { ChevronIcon, CloseIcon, RepeatIcon } from './Icons'

export type SwipeDir = 'left' | 'right'

export interface DeckHandle {
  swipe: (dir: SwipeDir) => void
  /** Bir önceki kartı, gittiği yönden geri getirir. `update` içinde gösterilecek kart ayarlanır. */
  back: (from: SwipeDir, update: () => void) => void
}

interface Props<T> {
  items: T[]
  index: number
  /** Kart ekrandan çıktıktan hemen sonra çağrılır; burada sıradaki kart seçilir. */
  onSwipe: (dir: SwipeDir, item: T) => void
  onBack?: () => void
  render: (item: T, active: boolean) => ReactNode
  onDoubleTap?: (item: T, point: { x: number; y: number }) => void
  onTap?: () => void
  /** 'feed': sağa = tekrar gör, sola = bir daha gösterme. 'browse': iki yön de sonraki karta geçer. */
  mode: 'feed' | 'browse'
  keyboard?: boolean
  ref?: Ref<DeckHandle>
}

const EASE = [0.32, 0.72, 0.2, 1] as const
const OUT = 1.25

export function SwipeDeck<T extends { id: string }>({
  items,
  index,
  onSwipe,
  onBack,
  render,
  onDoubleTap,
  onTap,
  mode,
  keyboard,
  ref,
}: Props<T>) {
  const n = items.length
  const box = useRef<HTMLDivElement>(null)
  const x = useMotionValue(0)
  const zero = useMotionValue(0)
  const one = useMotionValue(1)
  const busy = useRef(false)
  const width = () => box.current?.offsetWidth || window.innerWidth

  const progress = useTransform(x, (v) => Math.min(Math.abs(v) / (width() * 0.85), 1))
  const rotate = useTransform(x, (v) => (v / width()) * 7)
  const underScale = useTransform(progress, [0, 1], [0.92, 1])
  const scrim = useTransform(progress, [0, 1], [0.5, 0])

  const cur = n ? items[mod(index, n)] : undefined
  const next = n > 1 ? items[mod(index + 1, n)] : undefined

  const swipe = useCallback(
    async (dir: SwipeDir) => {
      if (busy.current || !cur) return
      busy.current = true
      await animate(x, (dir === 'right' ? 1 : -1) * width() * OUT, { duration: 0.32, ease: EASE })
      flushSync(() => onSwipe(dir, cur))
      x.jump(0)
      busy.current = false
    },
    [cur, onSwipe, x],
  )

  const back = useCallback(
    (from: SwipeDir, update: () => void) => {
      if (busy.current) return
      busy.current = true
      flushSync(update)
      x.jump((from === 'right' ? 1 : -1) * width() * OUT)
      animate(x, 0, { duration: 0.36, ease: EASE }).then(() => {
        busy.current = false
      })
    },
    [x],
  )

  useImperativeHandle(ref, () => ({ swipe, back }), [swipe, back])

  useEffect(() => {
    if (!keyboard) return
    const onKey = (e: KeyboardEvent) => {
      const t = e.target as HTMLElement
      if (t.closest('input, textarea, [contenteditable]')) return
      if (mode === 'feed') {
        if (e.key === 'ArrowRight') swipe('right')
        else if (e.key === 'ArrowLeft') swipe('left')
        else if (e.key === 'Backspace' || e.key === 'ArrowUp') onBack?.()
      } else {
        if (e.key === 'ArrowRight') swipe('left')
        else if (e.key === 'ArrowLeft') onBack?.()
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [keyboard, mode, swipe, onBack])

  const lastTap = useRef(0)
  const lastDrag = useRef(0)
  const tapTimer = useRef<number | undefined>(undefined)
  useEffect(() => () => clearTimeout(tapTimer.current), [])

  if (!cur) return null

  const onDragEnd = (_: unknown, info: PanInfo) => {
    lastDrag.current = performance.now()
    const w = width()
    if (info.offset.x < -w * 0.2 || info.velocity.x < -500) swipe('left')
    else if (info.offset.x > w * 0.2 || info.velocity.x > 500) swipe('right')
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

  // Sıra [alttaki, üstteki]: kart alttan üste geçerken DOM'da yerinde kalır,
  // fotoğrafı yeniden yüklenmez; kaydırınca arkadaki fotoğraf anında hazırdır.
  const cards = next && next.id !== cur.id ? [next, cur] : [cur]

  return (
    <div className="deck" ref={box}>
      {cards.map((item) => {
        const top = item.id === cur.id
        return (
          <motion.div
            key={item.id}
            className={`deck-card ${top ? 'deck-top' : 'deck-under'}`}
            style={{ x: top ? x : zero, rotate: top ? rotate : zero, scale: top ? one : underScale, zIndex: top ? 2 : 1 }}
            drag={top ? 'x' : false}
            dragMomentum={false}
            onDrag={top ? () => (lastDrag.current = performance.now()) : undefined}
            onDragEnd={top ? onDragEnd : undefined}
            onTap={top ? (e, info) => onTapCard(e as PointerEvent, info.point) : undefined}
          >
            {render(item, top)}
            {!top && <motion.div className="deck-scrim" style={{ opacity: scrim }} />}
          </motion.div>
        )
      })}

      {mode === 'feed' && <Stamps x={x} />}

      {mode === 'feed' ? (
        <>
          <button className="deck-nav deck-prev" onClick={() => swipe('left')} aria-label="Bir daha gösterme" title="Bir daha gösterme (←)">
            <CloseIcon />
          </button>
          <button className="deck-nav deck-next" onClick={() => swipe('right')} aria-label="Tekrar göster" title="Tekrar göster (→)">
            <RepeatIcon />
          </button>
        </>
      ) : (
        n > 1 && (
          <>
            <button className="deck-nav deck-prev" onClick={onBack} aria-label="Önceki söz">
              <ChevronIcon dir="left" />
            </button>
            <button className="deck-nav deck-next" onClick={() => swipe('left')} aria-label="Sonraki söz">
              <ChevronIcon />
            </button>
          </>
        )
      )}
    </div>
  )
}

/** Sürüklerken beliren etiketler: sağa "Tekrar gör", sola "Bir daha gösterme". */
function Stamps({ x }: { x: MotionValue<number> }) {
  const keep = useTransform(x, [20, 110], [0, 1])
  const drop = useTransform(x, [-110, -20], [1, 0])
  const keepScale = useTransform(x, [20, 110], [0.85, 1])
  const dropScale = useTransform(x, [-110, -20], [1, 0.85])
  return (
    <div className="stamps" aria-hidden>
      <motion.div className="stamp stamp-keep" style={{ opacity: keep, scale: keepScale, rotate: -9 }}>
        <RepeatIcon width={18} height={18} /> Tekrar gör
      </motion.div>
      <motion.div className="stamp stamp-drop" style={{ opacity: drop, scale: dropScale, rotate: 9 }}>
        <CloseIcon width={18} height={18} /> Bir daha gösterme
      </motion.div>
    </div>
  )
}
