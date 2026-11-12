import { useLocation } from 'react-router-dom'
import { STATIC_PAGE_META } from '../seo/pageMeta'
import { usePageSeo, type SeoInput } from '../seo/usePageSeo'

/** Applies SEO for static routes; dynamic product routes set their own meta in-page. */
export function RouteSeo() {
  const { pathname } = useLocation()

  let input: SeoInput | null = null

  if (!pathname.startsWith('/product/') && !pathname.startsWith('/products/')) {
    const meta = STATIC_PAGE_META[pathname]
    if (meta) {
      input = {
        title: meta.title,
        description: meta.description,
        path: meta.path,
        noindex: meta.noindex,
      }
    } else if (pathname === '/404') {
      input = {
        title: 'Page Not Found',
        description: 'The page you requested could not be found on ALTRON Security Engineering.',
        path: '/404',
        noindex: true,
      }
    }
  }

  usePageSeo(input)
  return null
}
