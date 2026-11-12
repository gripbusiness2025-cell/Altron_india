export type QuickLinkIconName = 'education' | 'enquiry' | 'confirm' | 'calm'

const svgProps = {
  width: 28,
  height: 28,
  viewBox: '0 0 24 24',
  fill: 'none',
  xmlns: 'http://www.w3.org/2000/svg',
  'aria-hidden': true as const,
}

export function QuickLinkIcon({ name }: { name: QuickLinkIconName }) {
  switch (name) {
    case 'education':
      return (
        <svg {...svgProps}>
          <path
            d="M12 3 2 8l10 5 9-4.5M4 10v6c0 2.2 3.6 4 8 4s8-1.8 8-4v-6"
            stroke="currentColor"
            strokeWidth="1.75"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M22 8v8"
            stroke="currentColor"
            strokeWidth="1.75"
            strokeLinecap="round"
          />
        </svg>
      )
    case 'enquiry':
      return (
        <svg {...svgProps}>
          <path
            d="M21 15a4 4 0 0 1-4 4H8l-5 3V7a4 4 0 0 1 4-4h10a4 4 0 0 1 4 4v8Z"
            stroke="currentColor"
            strokeWidth="1.75"
            strokeLinejoin="round"
          />
          <path
            d="M8 9h8M8 13h5"
            stroke="currentColor"
            strokeWidth="1.75"
            strokeLinecap="round"
          />
        </svg>
      )
    case 'confirm':
      return (
        <svg {...svgProps}>
          <path
            d="M9 12 11 14 15 10"
            stroke="currentColor"
            strokeWidth="1.75"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10Z"
            stroke="currentColor"
            strokeWidth="1.75"
          />
        </svg>
      )
    case 'calm':
      return (
        <svg {...svgProps}>
          <path
            d="M12 22s7-4.5 7-11V6l-7-3-7 3v5c0 6.5 7 11 7 11Z"
            stroke="currentColor"
            strokeWidth="1.75"
            strokeLinejoin="round"
          />
          <path
            d="M9 12h6"
            stroke="currentColor"
            strokeWidth="1.75"
            strokeLinecap="round"
          />
        </svg>
      )
    default:
      return null
  }
}
