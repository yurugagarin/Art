import type { SVGProps } from 'react'

type P = SVGProps<SVGSVGElement> & { filled?: boolean }

const base = (p: P) => ({
  width: 24,
  height: 24,
  viewBox: '0 0 24 24',
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 1.9,
  strokeLinecap: 'round' as const,
  strokeLinejoin: 'round' as const,
  'aria-hidden': true,
  ...p,
})

export const HeartIcon = ({ filled, ...p }: P) => (
  <svg {...base(p)} fill={filled ? 'currentColor' : 'none'}>
    <path d="M12 20.5s-7.5-4.6-9.3-9.4C1.4 7.6 3.6 4 7.2 4c2 0 3.6 1.1 4.8 2.8C13.2 5.1 14.8 4 16.8 4c3.6 0 5.8 3.6 4.5 7.1-1.8 4.8-9.3 9.4-9.3 9.4z" />
  </svg>
)

export const PenIcon = (p: P) => (
  <svg {...base(p)}>
    <path d="M4 20h4L19 9a2.8 2.8 0 0 0-4-4L4 16v4z" />
    <path d="M13.5 6.5l4 4" />
  </svg>
)

export const ShareIcon = (p: P) => (
  <svg {...base(p)}>
    <path d="M12 3v12" />
    <path d="M7.5 7.5L12 3l4.5 4.5" />
    <path d="M5 12v6.5A2.5 2.5 0 0 0 7.5 21h9a2.5 2.5 0 0 0 2.5-2.5V12" />
  </svg>
)

export const ImageIcon = (p: P) => (
  <svg {...base(p)}>
    <rect x="3" y="4" width="18" height="16" rx="3" />
    <circle cx="9" cy="10" r="1.8" />
    <path d="M21 16l-5-5-9 9" />
  </svg>
)

export const CloseIcon = (p: P) => (
  <svg {...base(p)}>
    <path d="M6 6l12 12M18 6L6 18" />
  </svg>
)

export const ChevronIcon = ({ dir = 'right', ...p }: P & { dir?: 'left' | 'right' }) => (
  <svg {...base(p)} style={{ transform: dir === 'left' ? 'scaleX(-1)' : undefined, ...p.style }}>
    <path d="M9 5l7 7-7 7" />
  </svg>
)

export const PlusIcon = (p: P) => (
  <svg {...base(p)}>
    <path d="M12 5v14M5 12h14" />
  </svg>
)

export const TrashIcon = (p: P) => (
  <svg {...base(p)}>
    <path d="M4 7h16M10 11v6M14 11v6M6 7l1 12.5A1.5 1.5 0 0 0 8.5 21h7a1.5 1.5 0 0 0 1.5-1.5L18 7M9 7V4.5A1.5 1.5 0 0 1 10.5 3h3A1.5 1.5 0 0 1 15 4.5V7" />
  </svg>
)

export const CheckIcon = (p: P) => (
  <svg {...base(p)}>
    <path d="M5 12.5l4.5 4.5L19 7.5" />
  </svg>
)

export const RepeatIcon = (p: P) => (
  <svg {...base(p)}>
    <path d="M17 2.5l3 3-3 3" />
    <path d="M4 11.5v-1a5 5 0 0 1 5-5h11" />
    <path d="M7 21.5l-3-3 3-3" />
    <path d="M20 12.5v1a5 5 0 0 1-5 5H4" />
  </svg>
)

export const UndoIcon = (p: P) => (
  <svg {...base(p)}>
    <path d="M9 14L4 9l5-5" />
    <path d="M4 9h10.5a5.5 5.5 0 0 1 0 11H11" />
  </svg>
)

/** Momentum işareti: hız çizgileriyle ileri atılan bir M (logo ile aynı). */
export const MomentumMark = ({ filled, ...p }: P) => (
  <svg {...base(p)} viewBox="40 150 408 236" strokeWidth={undefined}>
    {filled && (
      <defs>
        <linearGradient id="mm-ink" x1="0" y1="1" x2="1" y2="0">
          <stop offset="0" stopColor="#ffd8a0" />
          <stop offset="0.5" stopColor="#ff9f86" />
          <stop offset="1" stopColor="#ff6f91" />
        </linearGradient>
      </defs>
    )}
    <g stroke={filled ? 'url(#mm-ink)' : 'currentColor'} transform="translate(22 -14)">
      <path d="M168 372V214c0-26 30-38 48-20l72 86 76-108c17-24 52-12 52 16v184" strokeWidth={50} />
      <path d="M70 236h52M50 296h72M78 356h44" strokeWidth={26} />
    </g>
  </svg>
)

export const EyeIcon = (p: P) => (
  <svg {...base(p)}>
    <path d="M2.5 12s3.5-6.5 9.5-6.5S21.5 12 21.5 12 18 18.5 12 18.5 2.5 12 2.5 12z" />
    <circle cx="12" cy="12" r="2.8" />
  </svg>
)
