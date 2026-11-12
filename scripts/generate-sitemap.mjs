/**
 * Writes public/sitemap.xml. Run: npm run sitemap
 * Set VITE_SITE_URL for production domain.
 */
import { writeFileSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import { dirname, join } from 'node:path'

const root = join(dirname(fileURLToPath(import.meta.url)), '..')
const siteUrl = (process.env.VITE_SITE_URL || 'https://altronindia.com').replace(/\/$/, '')

const paths = [
  '/',
  '/corporate',
  '/products',
  '/products/cctv-surveillance',
  '/products/fire-alarm-systems',
  '/products/access-control-systems',
  '/products/public-address-systems',
  '/products/smart-lighting-systems',
  '/products/smart-home-solutions-bms',
  '/products/altron-medi-range',
  '/products/solar-street-light',
  '/products/office-automation',
  '/qss',
  '/esteemed-clients',
  '/altron-care',
  '/e-campus',
  '/agbm',
  '/faq',
  '/contact',
]

const lastmod = new Date().toISOString().slice(0, 10)

const body = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${paths
  .map(
    (p) => `  <url>
    <loc>${siteUrl}${p}</loc>
    <lastmod>${lastmod}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>${p === '/' ? '1.0' : p.startsWith('/products') ? '0.8' : '0.7'}</priority>
  </url>`
  )
  .join('\n')}
</urlset>
`

writeFileSync(join(root, 'public/sitemap.xml'), body)
console.log(`Wrote public/sitemap.xml (${paths.length} URLs)`)
