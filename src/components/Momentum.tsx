import { motion } from 'motion/react'
import { useEffect, useMemo, useState } from 'react'
import { useCategories } from '../lib/categories'
import { greeting } from '../lib/deck'
import { tasteOf } from '../lib/personal'
import { DAILY_GOAL, dayKey, getState, streakOf, useStore } from '../lib/store'
import { toast } from '../lib/toast'
import { useAllQuotes, useQuoteMap } from '../lib/useQuotes'
import type { CatInfo } from '../lib/categories'
import type { Quote } from '../data/quotes'
import { BoltIcon, FlameIcon, ShareIcon } from './Icons'
import { Sheet } from './Sheet'

/** Akışın sağ üstündeki sayaç: bugünkü güç / günlük hedef ve seri. */
export function MomentumChip() {
  const days = useStore((s) => s.days)
  const today = days[dayKey()] ?? 0
  const streak = streakOf(days)
  const [open, setOpen] = useState(false)
  const [pops, setPops] = useState<number[]>([])

  useEffect(() => {
    const onPower = () => {
      const id = Date.now() + Math.random()
      setPops((p) => [...p.slice(-3), id])
      setTimeout(() => setPops((p) => p.filter((x) => x !== id)), 800)
    }
    window.addEventListener('momentum:power', onPower)
    return () => window.removeEventListener('momentum:power', onPower)
  }, [])

  const done = today >= DAILY_GOAL
  const r = 8
  const c = 2 * Math.PI * r
  const progress = Math.min(today / DAILY_GOAL, 1)

  return (
    <>
      <button className={`mchip${done ? ' done' : ''}`} onClick={() => setOpen(true)} aria-label={`Bugün ${today} güç, ${streak} günlük seri`}>
        <span className="mchip-ring" aria-hidden>
          <svg width="22" height="22" viewBox="0 0 22 22">
            <circle cx="11" cy="11" r={r} className="ring-bg" />
            <motion.circle
              cx="11"
              cy="11"
              r={r}
              className="ring-fg"
              strokeDasharray={c}
              animate={{ strokeDashoffset: c * (1 - progress) }}
              transition={{ type: 'spring', stiffness: 200, damping: 26 }}
            />
          </svg>
          <BoltIcon width={12} height={12} filled strokeWidth={1.4} />
        </span>
        <motion.span key={today} className="mchip-num" initial={{ scale: 1.35 }} animate={{ scale: 1 }}>
          {today}
          <small>/{DAILY_GOAL}</small>
        </motion.span>
        {streak > 0 && (
          <span className="mchip-streak">
            <FlameIcon width={14} height={14} filled /> {streak}
          </span>
        )}
        {pops.map((id) => (
          <span key={id} className="mchip-pop" aria-hidden>
            +1 ⚡
          </span>
        ))}
      </button>
      <MomentumSheet open={open} onClose={() => setOpen(false)} />
    </>
  )
}

const WEEKDAYS = ['Paz', 'Pzt', 'Sal', 'Çar', 'Per', 'Cum', 'Cmt']

function MomentumSheet({ open, onClose }: { open: boolean; onClose: () => void }) {
  const days = useStore((s) => s.days)
  const power = useStore((s) => s.power)
  const all = useAllQuotes()
  const byId = useQuoteMap()
  const cats = useCategories()
  const today = days[dayKey()] ?? 0
  const streak = streakOf(days)
  const total = Object.values(days).reduce((a, b) => a + b, 0)

  const week = useMemo(() => {
    const out: { label: string; n: number; today: boolean }[] = []
    for (let i = 6; i >= 0; i--) {
      const d = new Date()
      d.setDate(d.getDate() - i)
      out.push({ label: WEEKDAYS[d.getDay()], n: days[dayKey(d)] ?? 0, today: i === 0 })
    }
    return out
  }, [days])
  const weekMax = Math.max(DAILY_GOAL, ...week.map((w) => w.n))

  const taste = useMemo(() => tasteOf(power, all), [power, all])
  const topCats = Object.entries(taste.cat)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 4)
    .map(([id, n]) => ({ n, cat: cats.find((c) => c.id === id) }))
    .filter((x) => x.cat)
  const catMax = Math.max(1, ...topCats.map((x) => x.n))
  const topAuthors = Object.entries(taste.author)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 5)
  const topQuotes = useMemo(() => {
    const byId = new Map(all.map((q) => [q.id, q]))
    return Object.entries(power)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 5)
      .map(([id, n]) => ({ q: byId.get(id), n }))
      .filter((x) => x.q)
  }, [power, all])

  return (
    <Sheet open={open} title={`${greeting()} ✦`} onClose={onClose}>
      <div className="mstats">
        <div className="mhero">
          <div className="mhero-item">
            <span className="mhero-num">
              <FlameIcon width={26} height={26} filled /> {streak}
            </span>
            <span className="mhero-label">günlük seri</span>
          </div>
          <div className="mhero-item">
            <span className="mhero-num">
              <BoltIcon width={24} height={24} filled /> {today}/{DAILY_GOAL}
            </span>
            <span className="mhero-label">bugünkü doz</span>
          </div>
          <div className="mhero-item">
            <span className="mhero-num">{total}</span>
            <span className="mhero-label">toplam güç</span>
          </div>
        </div>
        <p className="sheet-note">
          Sağa kaydırdığın her söz sana ⚡ kazandırır. Günde {DAILY_GOAL} söze ulaşınca günün dozu tamamlanır ve serin devam eder. Akışın da buna göre
          şekillenir: sana güç veren kategoriler ve yazarlar daha sık karşına çıkar.
        </p>

        <h3 className="mstats-title">Son 7 gün</h3>
        <div className="mweek">
          {week.map((w, i) => (
            <div key={i} className={`mweek-day${w.today ? ' today' : ''}${w.n >= DAILY_GOAL ? ' hit' : ''}`}>
              <div className="mweek-bar">
                <span style={{ height: `${Math.max(4, (w.n / weekMax) * 100)}%` }} />
              </div>
              <span className="mweek-n">{w.n}</span>
              <span className="mweek-label">{w.label}</span>
            </div>
          ))}
        </div>

        {topCats.length > 0 && (
          <>
            <h3 className="mstats-title">Sana en çok güç veren</h3>
            <ul className="mbars">
              {topCats.map(({ cat, n }) => (
                <li key={cat!.id}>
                  <span className="mbars-label">
                    {cat!.emoji} {cat!.label}
                  </span>
                  <span className="mbars-track">
                    <span style={{ width: `${(n / catMax) * 100}%` }} />
                  </span>
                  <span className="mbars-n">{n}</span>
                </li>
              ))}
            </ul>
          </>
        )}

        {topAuthors.length > 0 && (
          <>
            <h3 className="mstats-title">Sesini en çok duyduğun isimler</h3>
            <div className="mini-chips">
              {topAuthors.map(([a, n]) => (
                <span key={a} className="mini-chip">
                  {a} · {n}
                </span>
              ))}
            </div>
          </>
        )}

        {topQuotes.length > 0 && (
          <>
            <h3 className="mstats-title">En çok güç aldığın sözler</h3>
            <ul className="hidden-list">
              {topQuotes.map(({ q, n }) => (
                <li key={q!.id}>
                  <p>{q!.text}</p>
                  <span className="mtop-n">
                    <BoltIcon width={14} height={14} filled /> {n}
                  </span>
                </li>
              ))}
            </ul>
          </>
        )}

        {total === 0 && <p className="sheet-note">Henüz güç toplamadın. Sana iyi gelen ilk sözü sağa kaydır.</p>}

        <ShareTaste byId={byId} cats={cats} />
      </div>
    </Sheet>
  )
}

const line = (q: Quote) => `"${q.text}"${q.author ? ` — ${q.author}` : ''}`

/** Sağa ve sola kaydırılanları düz metin olarak paylaşır (ör. yeni sözler istemek için). */
function ShareTaste({ byId, cats }: { byId: Map<string, Quote>; cats: CatInfo[] }) {
  const share = async () => {
    const { power, hidden, mine } = getState()
    const quotes = [...byId.values(), ...mine]
    const taste = tasteOf(power, quotes)
    const catName = (id: string) => cats.find((c) => c.id === id)?.label ?? id
    const liked = Object.entries(power)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 80)
      .map(([id, n]) => ({ q: byId.get(id), n }))
      .filter((x) => x.q)
    const dropped = Object.entries(hidden)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 80)
      .map(([id]) => byId.get(id))
      .filter((q): q is Quote => !!q)
    const text = [
      'Momentum — zevk özetim',
      '',
      `Sağa kaydırdığım (güç aldığım) söz: ${Object.keys(power).length}`,
      `Sola kaydırıp kaldırdığım söz: ${Object.keys(hidden).length}`,
      '',
      'En çok güç veren kategoriler: ' +
        Object.entries(taste.cat)
          .sort((a, b) => b[1] - a[1])
          .map(([c, n]) => `${catName(c)} (${n})`)
          .join(', '),
      'En sevdiğim isimler: ' +
        Object.entries(taste.author)
          .sort((a, b) => b[1] - a[1])
          .slice(0, 15)
          .map(([a, n]) => `${a} (${n})`)
          .join(', '),
      '',
      'SAĞA KAYDIRDIKLARIM:',
      ...liked.map(({ q, n }) => `+ ${line(q!)}${n > 1 ? ` (×${n})` : ''}`),
      '',
      'SOLA KAYDIRDIKLARIM:',
      ...dropped.map((q) => `- ${line(q)}`),
    ].join('\n')
    try {
      if (navigator.share) await navigator.share({ text })
      else {
        await navigator.clipboard.writeText(text)
        toast('Kopyalandı; istediğin yere yapıştırabilirsin')
      }
    } catch (e) {
      if (!(e instanceof DOMException && e.name === 'AbortError')) toast('Paylaşılamadı')
    }
  }
  return (
    <div className="mshare">
      <button className="btn-ghost wide" onClick={share}>
        <ShareIcon width={18} height={18} /> Zevkimi paylaş
      </button>
      <p className="sheet-note">Sağa ve sola kaydırdıklarını metin olarak paylaşır. Claude’a gönderirsen tam senin zevkine göre yeni sözler ekleyebilir.</p>
    </div>
  )
}
