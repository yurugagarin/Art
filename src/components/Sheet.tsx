import { AnimatePresence, motion } from 'motion/react'
import type { ReactNode } from 'react'
import { createPortal } from 'react-dom'
import { CloseIcon } from './Icons'

interface Props {
  open: boolean
  title: string
  onClose: () => void
  children: ReactNode
}

export function Sheet({ open, title, onClose, children }: Props) {
  // Gövdeye taşınır; böylece sabit konumlu ekranların ve sekme çubuğunun üstünde açılır.
  return createPortal(
    <AnimatePresence>
      {open && (
        <motion.div className="sheet-root" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
          <div className="sheet-backdrop" onClick={onClose} />
          <motion.div
            className="sheet"
            role="dialog"
            aria-label={title}
            initial={{ y: '100%' }}
            animate={{ y: 0 }}
            exit={{ y: '100%' }}
            transition={{ type: 'spring', stiffness: 380, damping: 38 }}
            drag="y"
            dragConstraints={{ top: 0, bottom: 0 }}
            dragElastic={{ top: 0, bottom: 0.6 }}
            onDragEnd={(_, info) => {
              if (info.offset.y > 110 || info.velocity.y > 600) onClose()
            }}
          >
            <div className="sheet-grip" />
            <header className="sheet-head">
              <h2>{title}</h2>
              <button className="icon-btn" onClick={onClose} aria-label="Kapat">
                <CloseIcon />
              </button>
            </header>
            <div className="sheet-content">{children}</div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body,
  )
}
