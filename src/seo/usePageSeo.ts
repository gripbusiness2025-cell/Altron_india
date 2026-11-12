import { useEffect } from 'react'
import { DEFAULT_DESCRIPTION, DEFAULT_OG_IMAGE, SITE_NAME, absoluteUrl } from './site'

export type SeoInput = {
  title: string
  description?: string
  /** Canonical path starting with `/` */
  path?: string
  ogImage?: string
  noindex?: boolean
}

function upsertMeta(selector: string, create: () => HTMLElement, content: string) {
  let el = document.head.querySelector(selector)
  if (!el) {
    el = create()
    document.head.appendChild(el)
  }
  if (el instanceof HTMLMetaElement || el instanceof HTMLLinkElement) {
    if ('content' in el) el.content = content
    else if (el instanceof HTMLLinkElement) el.href = content
  }
}

export function applyPageSeo({
  title,
  description = DEFAULT_DESCRIPTION,
  path,
  ogImage = DEFAULT_OG_IMAGE,
  noindex = false,
}: SeoInput) {
  const fullTitle = title.includes('ALTRON') || title.includes('altron')
    ? title
    : `${title} | ${SITE_NAME}`

  document.title = fullTitle

  upsertMeta('meta[name="description"]', () => {
    const m = document.createElement('meta')
    m.name = 'description'
    return m
  }, description)

  upsertMeta('meta[name="robots"]', () => {
    const m = document.createElement('meta')
    m.name = 'robots'
    return m
  }, noindex ? 'noindex, nofollow' : 'index, follow, max-image-preview:large')

  const canonical = path ? absoluteUrl(path) : absoluteUrl(window.location.pathname)
  upsertMeta('link[rel="canonical"]', () => {
    const l = document.createElement('link')
    l.rel = 'canonical'
    return l
  }, canonical)

  const og = [
    ['meta[property="og:type"]', 'website'],
    ['meta[property="og:site_name"]', SITE_NAME],
    ['meta[property="og:title"]', fullTitle],
    ['meta[property="og:description"]', description],
    ['meta[property="og:url"]', canonical],
    ['meta[property="og:image"]', ogImage],
    ['meta[property="og:locale"]', 'en_IN'],
  ] as const

  for (const [sel, content] of og) {
    upsertMeta(sel, () => {
      const m = document.createElement('meta')
      const key = sel.match(/property="([^"]+)"/)?.[1]
      if (key) m.setAttribute('property', key)
      return m
    }, content)
  }

  upsertMeta('meta[name="twitter:card"]', () => {
    const m = document.createElement('meta')
    m.name = 'twitter:card'
    return m
  }, 'summary_large_image')

  upsertMeta('meta[name="twitter:title"]', () => {
    const m = document.createElement('meta')
    m.name = 'twitter:title'
    return m
  }, fullTitle)

  upsertMeta('meta[name="twitter:description"]', () => {
    const m = document.createElement('meta')
    m.name = 'twitter:description'
    return m
  }, description)

  upsertMeta('meta[name="twitter:image"]', () => {
    const m = document.createElement('meta')
    m.name = 'twitter:image'
    return m
  }, ogImage)
}

export function usePageSeo(input: SeoInput | null) {
  useEffect(() => {
    if (!input) return
    applyPageSeo(input)
  }, [input?.title, input?.description, input?.path, input?.ogImage, input?.noindex])
}
