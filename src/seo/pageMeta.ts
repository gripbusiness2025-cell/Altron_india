/** Static routes: unique title + meta description for on-page SEO. */
export type PageMeta = {
  title: string
  description: string
  /** Path for canonical, e.g. `/corporate` */
  path: string
  noindex?: boolean
}

export const STATIC_PAGE_META: Record<string, PageMeta> = {
  '/': {
    path: '/',
    title: 'ALTRON — Sense the Difference | Electronic Security Solutions India',
    description:
      'ALTRON Security Engineering Pvt. Ltd. — ISO certified provider of CCTV, fire alarm, access control and smart security solutions. 24+ years experience since 2000.',
  },
  '/corporate': {
    path: '/corporate',
    title: 'Corporate | About ALTRON Security Engineering',
    description:
      'Learn about ALTRON Security Engineering Pvt. Ltd. — electronic security solutions with 23+ years in safety and security across India and overseas.',
  },
  '/products': {
    path: '/products',
    title: 'Products | Electronic Security Systems — ALTRON',
    description:
      'Browse ALTRON product categories: CCTV surveillance, fire alarm, access control, public address, smart home BMS, medi range and more.',
  },
  '/qss': {
    path: '/qss',
    title: 'QSS — Quality & Service Standards | ALTRON',
    description:
      'ALTRON Quality & Service Standards — our commitment to state-of-the-art technology, trained professionals and customer-focused security solutions.',
  },
  '/esteemed-clients': {
    path: '/esteemed-clients',
    title: 'Esteemed Clients | ALTRON Security Engineering',
    description:
      'Government, banking, manufacturing, healthcare and enterprise clients who trust ALTRON for high-end security systems in India.',
  },
  '/altron-care': {
    path: '/altron-care',
    title: 'Altron Care | CCTV Repair & Service — ALTRON',
    description:
      'ALTRON Care — professional CCTV repair and chip-level service in Chennai and Thanjavur. Fast turnaround for all major brands.',
  },
  '/e-campus': {
    path: '/e-campus',
    title: 'ALTRON e-Campus | Training & ALTROX — ALTRON',
    description:
      'ALTRON e-Campus — security training academy, ALTROX manufacturing and interior design divisions under one umbrella since 2000.',
  },
  '/agbm': {
    path: '/agbm',
    title: 'AGBM | ALTRON Security Engineering',
    description:
      'AGBM — ALTRON Security Engineering gallery and annual general body meeting information.',
  },
  '/faq': {
    path: '/faq',
    title: 'FAQ | ALTRON Security — Common Questions',
    description:
      'Frequently asked questions about ALTRON CCTV, networking, fire alarm and electronic security products and services.',
  },
  '/contact': {
    path: '/contact',
    title: 'Contact ALTRON | Chennai Security Solutions',
    description:
      'Contact ALTRON Security Engineering — phone 95512 02222, email info@altronindia.com. Chennai HQ and project support across India.',
  },
}

/** Paths included in `public/sitemap.xml` (run `npm run sitemap` after changes). */
export const SITEMAP_STATIC_PATHS = Object.keys(STATIC_PAGE_META)
