import { Fragment } from 'react'

const MARK = /\*([^*]+)\*/g

/** "*vurgu*" işaretlerini kaldırır (paylaşma, uzunluk hesabı, küçük önizlemeler için). */
export const plain = (s: string) => s.replace(MARK, '$1')

/** "*kelime*" kısımlarını vurgulu gösterir. */
export function Highlight({ text }: { text: string }) {
  const parts = text.split(MARK)
  return (
    <>
      {parts.map((part, i) =>
        i % 2 ? (
          <span key={i} className="hl">
            {part}
          </span>
        ) : (
          <Fragment key={i}>{part}</Fragment>
        ),
      )}
    </>
  )
}
