/** Public site URL (no trailing slash). Set `VITE_SITE_URL` in production. */
export const SITE_URL = (import.meta.env.VITE_SITE_URL as string | undefined)?.replace(/\/$/, '') ||
  'https://altronindia.com'

export const SITE_NAME = 'ALTRON Security Engineering Pvt. Ltd.'
export const DEFAULT_OG_IMAGE = `${SITE_URL}/altronlogo.png`
export const DEFAULT_DESCRIPTION =
  'ALTRON Security Engineering — ISO certified electronic security solutions provider since 2000. CCTV, fire alarm, access control and building security across India.'

export function absoluteUrl(path: string): string {
  const p = path.startsWith('/') ? path : `/${path}`
  return `${SITE_URL}${p}`
}
