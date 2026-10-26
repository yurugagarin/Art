import { AnimatePresence, motion } from 'motion/react'
import { useEffect, useState } from 'react'
import { HeartBurstLayer } from './components/HeartBurst'
import { HeartIcon, MomentumMark, PenIcon } from './components/Icons'
import { Compose } from './screens/Compose'
import { Favorites } from './screens/Favorites'
import { Feed } from './screens/Feed'
import { loadOwnPhotos, useStore } from './lib/store'
import { dismissToast, useToast } from './lib/toast'

type Tab = 'akis' | 'favoriler' | 'yaz'

const TABS: { id: Tab; label: string; Icon: typeof HeartIcon }[] = [
  { id: 'akis', label: 'Akış', Icon: MomentumMark },
  { id: 'favoriler', label: 'Favoriler', Icon: HeartIcon },
  { id: 'yaz', label: 'Yaz', Icon: PenIcon },
]

export default function App() {
  const [tab, setTab] = useState<Tab>('akis')
  const [focusId, setFocusId] = useState<string>()
  const favCount = useStore((s) => s.favs.length)
  const t = useToast()

  useEffect(() => {
    loadOwnPhotos()
  }, [])

  useEffect(() => {
    if (tab !== 'akis') window.scrollTo(0, 0)
  }, [tab])

  return (
    <div className={`app tab-${tab}`}>
      <AnimatePresence mode="wait" initial={false}>
        <motion.main
          key={tab}
          className="main"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.18 }}
        >
          {tab === 'akis' && <Feed focusId={focusId} onFocused={() => setFocusId(undefined)} onWrite={() => setTab('yaz')} />}
          {tab === 'favoriler' && <Favorites onExplore={() => setTab('akis')} />}
          {tab === 'yaz' && (
            <Compose
              onSaved={(id) => {
                setFocusId(id)
                setTab('akis')
              }}
            />
          )}
        </motion.main>
      </AnimatePresence>

      <nav className="tabbar" aria-label="Sekmeler">
        {TABS.map(({ id, label, Icon }) => (
          <button key={id} className={`tab${tab === id ? ' on' : ''}`} onClick={() => setTab(id)} aria-current={tab === id ? 'page' : undefined}>
            {tab === id && <motion.span layoutId="tab-pill" className="tab-pill" transition={{ type: 'spring', stiffness: 500, damping: 38 }} />}
            <span className="tab-inner">
              <Icon filled={tab === id && id === 'favoriler'} width={id === 'akis' ? 24 : 20} height={20} />
              <span className="tab-label">{label}</span>
              {id === 'favoriler' && favCount > 0 && tab !== id && <span className="tab-count">{favCount}</span>}
            </span>
          </button>
        ))}
      </nav>

      <AnimatePresence>
        {t && (
          <motion.div
            key={t.id}
            className="toast"
            role="status"
            initial={{ opacity: 0, y: -16, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -12, scale: 0.96 }}
          >
            <span>{t.text}</span>
            {t.action && (
              <button
                onClick={() => {
                  t.action?.run()
                  dismissToast()
                }}
              >
                {t.action.label}
              </button>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      <HeartBurstLayer />
    </div>
  )
}
