import {
  animate,
  motion,
  motionValue,
  useMotionValue,
  useTransform,
  type MotionValue,
  type PanInfo,
} from 'motion/react'
import { useCallback, useEffect, useImperativeHandle, useLayoutEffect, useRef, useState, type ReactNode, type Ref } from 'react'
import { flushSync } from 'react-dom'
import { mod } from '../lib/deck'
import { BoltIcon, ChevronIcon, CloseIcon } from './Icons'

export type SwipeDir = 'left' | 'right'

export interface DeckHandle {
  swipe: (dir: SwipeDir) => void
  /**
   * Önceki kartı (`id`), gittiği yönden geri getirir. `update` içinde gösterilecek kart ayarlanır.
   * Kart hâlâ uçuyorsa olduğu yerden yakalanır.
   */
  back: (from: SwipeDir, id: string, update: () => void) => void
}

interface Props<T> {
  items: T[]
  index: number
  /** Kart bırakıldığı anda çağrılır; burada sıradaki kart seçilir. Uçuş animasyonu ayrıca sürer. */
  onSwipe: (dir: SwipeDir, item: T) => void
  onBack?: () => void
  /** role: 'top' üstteki, 'under' alttaki, 'flying' ekrandan uçup giden kart. */
  render: (item: T, role: 'top' | 'under' | 'flying') => ReactNode
  onDoubleTap?: (item: T, point: { x: number; y: number }) => void
  onTap?: () => void
  /** 'feed': sağa = tekrar gör, sola = bir daha gösterme. 'browse': iki yön de sonraki karta geçer. */
  mode: 'feed' | 'browse'
  /** Akış modunda sola kaydırmanın etiketi (varsayılan: "Bir daha gösterme"). */
  leftLabel?: string
  keyboard?: boolean
  ref?: Ref<DeckHandle>
}

/** Ekrandan uçup giden kart: kendi hareket değerleriyle, destenin geri kalanından bağımsız. */
interface Flying<T> {
  item: T
  x: MotionValue<number>
  rotate: MotionValue<number>
  stop: () => void
}

const OUT = 1.35
const SPRING = { type: 'spring', stiffness: 380, damping: 38, mass: 0.9 } as const

export function SwipeDeck<T extends { id: string }>({
  items,
  index,
  onSwipe,
  onBack,
  render,
  onDoubleTap,
  onTap,
  mode,
  leftLabel = 'Bir daha gösterme',
  keyboard,
  ref,
}: Props<T>) {
  const n = items.length
  const box = useRef<HTMLDivElement>(null)
  const width = () => box.current?.offsetWidth || window.innerWidth

  // Üstteki kart
  const x = useMotionValue(0)
  const rotate = useTransform(x, (v) => (v / width()) * 7)
  const topScale = useMotionValue(1)
  const topScrim = useMotionValue(0)
  // Alttaki kart: üstteki kart uzaklaştıkça büyür ve aydınlanır
  const progress = useTransform(x, (v) => Math.min(Math.abs(v) / (width() * 0.85), 1))
  const underScale = useTransform(progress, [0, 1], [0.92, 1])
  const underScrim = useTransform(progress, [0, 1], [0.5, 0])
  const zero = useMotionValue(0)
  const one = useMotionValue(1)

  const [flying, setFlying] = useState<Flying<T>[]>([])
  const flyingRef = useRef(flying)
  useLayoutEffect(() => {
    flyingRef.current = flying
  }, [flying])
  /** Sadece tek kartlık destede, kart çıkıp geri gelene kadar. */
  const solo = useRef(false)

  const cur = n ? items[mod(index, n)] : undefined
  const nextRaw = n > 1 ? items[mod(index + 1, n)] : undefined
  const isFlying = (id: string) => flying.some((f) => f.item.id === id)
  const next = nextRaw && nextRaw.id !== cur?.id && !isFlying(nextRaw.id) ? nextRaw : undefined

  const swipe = useCallback(
    (dir: SwipeDir, velocity = 0) => {
      if (!cur || solo.current) return
      const w = width()
      const sign = dir === 'right' ? 1 : -1
      const v = sign * Math.max(Math.abs(velocity), 1400)

      // Destede tek kart varsa: önce çıkar, sonra aynı kart karşı taraftan geri gelsin.
      if (!nextRaw || nextRaw.id === cur.id) {
        solo.current = true
        animate(x, sign * w * OUT, { ...SPRING, velocity: v, restDelta: 40 }).then(() => {
          flushSync(() => onSwipe(dir, cur))
          x.jump(-sign * w * OUT)
          animate(x, 0, SPRING)
          solo.current = false
        })
        return
      }

      // Uçan kart kendi değerleriyle animasyonuna devam eder; deste beklemeden ilerler.
      const fx = motionValue(x.get())
      const fr = motionValue(rotate.get())
      const ax = animate(fx, sign * w * OUT, { ...SPRING, velocity: v, restDelta: 40 })
      const ar = animate(fr, sign * 14, SPRING)
      // Kart ekranın dışına çıktığı an kaldırılır; yayın durulmasını beklemeye gerek yok.
      let gone = false
      const remove = () => {
        if (gone) return
        gone = true
        ax.stop()
        ar.stop()
        unsub()
        setFlying((list) => list.filter((f) => f.x !== fx))
      }
      const unsub = fx.on('change', (val) => Math.abs(val) > w * 1.08 && remove())
      ax.then(remove)
      const entry: Flying<T> = {
        item: cur,
        x: fx,
        rotate: fr,
        stop: () => {
          ax.stop()
          ar.stop()
        },
      }

      // Alttaki kart üste geçerken boyutu ve karartması kaldığı yerden yumuşakça tamamlanır.
      topScale.jump(underScale.get())
      topScrim.jump(underScrim.get())
      flushSync(() => {
        setFlying((list) => [...list, entry])
        onSwipe(dir, cur)
      })
      x.jump(0)
      animate(topScale, 1, SPRING)
      animate(topScrim, 0, { duration: 0.22 })
    },
    [cur, nextRaw, onSwipe, x, rotate, topScale, topScrim, underScale, underScrim],
  )

  const back = useCallback(
    (from: SwipeDir, id: string, update: () => void) => {
      // Kilit yok: önceki hareket bitmemiş olsa bile kart bulunduğu yerden devam eder.
      const caught = flyingRef.current.find((f) => f.item.id === id)
      caught?.stop()
      const start = caught ? caught.x.get() : (from === 'right' ? 1 : -1) * width() * OUT
      flushSync(() => {
        if (caught) setFlying((list) => list.filter((f) => f !== caught))
        update()
      })
      x.jump(start)
      topScale.jump(1)
      topScrim.jump(0)
      animate(x, 0, SPRING)
    },
    [x, topScale, topScrim],
  )

  useImperativeHandle(ref, () => ({ swipe: (d: SwipeDir) => swipe(d), back }), [swipe, back])

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
  useEffect(() => () => flyingRef.current.forEach((f) => f.stop()), [])

  if (!cur) return null

  const onDragEnd = (_: unknown, info: PanInfo) => {
    lastDrag.current = performance.now()
    const w = width()
    if (info.offset.x < -w * 0.2 || info.velocity.x < -500) swipe('left', info.velocity.x)
    else if (info.offset.x > w * 0.2 || info.velocity.x > 500) swipe('right', info.velocity.x)
    else animate(x, 0, { type: 'spring', stiffness: 420, damping: 32, velocity: info.velocity.x })
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

  // Sıra [alttaki, üstteki, uçanlar…]: bir kartın rolü değişirken DOM'daki yeri değişmez,
  // fotoğrafı yeniden yüklenmez ve ekranda hiçbir şey yanıp sönmez.
  type Role = 'under' | 'top' | 'flying'
  const cards: { item: T; role: Role; fly?: Flying<T> }[] = [
    ...(next ? [{ item: next, role: 'under' as Role }] : []),
    ...(isFlying(cur.id) ? [] : [{ item: cur, role: 'top' as Role }]),
    ...flying.map((f) => ({ item: f.item, role: 'flying' as Role, fly: f })),
  ]

  return (
    <div className="deck" ref={box}>
      {cards.map(({ item, role, fly }) => {
        const top = role === 'top'
        const style =
          role === 'top'
            ? { x, rotate, scale: topScale, zIndex: 2 }
            : role === 'under'
              ? { x: zero, rotate: zero, scale: underScale, zIndex: 1 }
              : { x: fly!.x, rotate: fly!.rotate, scale: one, zIndex: 3 }
        return (
          <motion.div
            key={item.id}
            className={`deck-card deck-${role}`}
            style={style}
            drag={top ? 'x' : false}
            dragMomentum={false}
            onDrag={top ? () => (lastDrag.current = performance.now()) : undefined}
            onDragEnd={top ? onDragEnd : undefined}
            onTap={top ? (e, info) => onTapCard(e as PointerEvent, info.point) : undefined}
          >
            {render(item, role)}
            {role !== 'flying' && (
              <motion.div className="deck-scrim" style={{ opacity: top ? topScrim : underScrim }} />
            )}
          </motion.div>
        )
      })}

      {mode === 'feed' && <Stamps x={x} leftLabel={leftLabel} />}

      {mode === 'feed' ? (
        <>
          <button className="deck-nav deck-prev" onClick={() => swipe('left')} aria-label={leftLabel} title={`${leftLabel} (←)`}>
            <CloseIcon />
          </button>
          <button className="deck-nav deck-next" onClick={() => swipe('right')} aria-label="Güç aldım" title="Güç aldım (→)">
            <BoltIcon />
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

/** Sürüklerken beliren etiketler: sağa "Güç aldım", sola "Bir daha gösterme". */
function Stamps({ x, leftLabel }: { x: MotionValue<number>; leftLabel: string }) {
  const keep = useTransform(x, [20, 110], [0, 1])
  const drop = useTransform(x, [-110, -20], [1, 0])
  const keepScale = useTransform(x, [20, 110], [0.85, 1])
  const dropScale = useTransform(x, [-110, -20], [1, 0.85])
  return (
    <div className="stamps" aria-hidden>
      <motion.div className="stamp stamp-keep" style={{ opacity: keep, scale: keepScale, rotate: -9 }}>
        <BoltIcon width={18} height={18} filled /> Güç aldım
      </motion.div>
      <motion.div className="stamp stamp-drop" style={{ opacity: drop, scale: dropScale, rotate: 9 }}>
        <CloseIcon width={18} height={18} /> {leftLabel}
      </motion.div>
    </div>
  )
}
