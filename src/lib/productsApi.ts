import { apiBase } from './apiBase'

export type CatalogProduct = {
  id: string | number
  slug: string
  title: string
  excerptHtml: string
  imageUrl: string | null
  catalogueUrl: string | null
  catalogueLabel: string
}

export type CatalogProductDetail = CatalogProduct & {
  contentHtml: string
}

const WP =
  typeof window !== 'undefined' && window.location.hostname === 'localhost'
    ? '/wp-api'
    : 'https://altronindia.com/wp-json'

type StoreProduct = {
  id: number
  name?: string
  slug: string
  short_description?: string
  description?: string
  images?: Array<{ src?: string; thumbnail?: string }>
  add_to_cart?: { text?: string; description?: string; url?: string }
}

type WpProduct = {
  id: number
  slug: string
  title?: { rendered?: string }
  excerpt?: { rendered?: string }
  content?: { rendered?: string }
  _embedded?: {
    'wp:featuredmedia'?: Array<{
      source_url?: string
      media_details?: { sizes?: Record<string, { source_url?: string }> }
    }>
  }
}

function normalizeCatalogueUrl(url?: string | null) {
  if (!url?.trim()) return null
  return url.replace('/demo/wp-content/', '/wp-content/')
}

function mapStoreProduct(p: StoreProduct): CatalogProduct {
  const image = p.images?.[0]
  return {
    id: p.id,
    slug: p.slug,
    title: p.name || p.slug,
    excerptHtml: p.short_description || '',
    imageUrl: image?.src || image?.thumbnail || null,
    catalogueUrl: normalizeCatalogueUrl(p.add_to_cart?.url),
    catalogueLabel: p.add_to_cart?.text || 'Download Catalogue',
  }
}

function mediaUrl(p: WpProduct): string | null {
  const media = p._embedded?.['wp:featuredmedia']?.[0]
  if (!media) return null
  return (
    media.media_details?.sizes?.medium?.source_url ||
    media.media_details?.sizes?.woocommerce_thumbnail?.source_url ||
    media.source_url ||
    null
  )
}

async function fetchProductsFromMongo(categoryMongoId: string): Promise<CatalogProduct[] | null> {
  try {
    const res = await fetch(`${apiBase()}/products?categoryId=${encodeURIComponent(categoryMongoId)}`)
    if (!res.ok) return null
    return (await res.json()) as CatalogProduct[]
  } catch {
    return null
  }
}

async function fetchProductFromMongo(slug: string): Promise<CatalogProductDetail | null> {
  try {
    const res = await fetch(`${apiBase()}/products/${encodeURIComponent(slug)}`)
    if (res.status === 404) return null
    if (!res.ok) return null
    return (await res.json()) as CatalogProductDetail
  } catch {
    return null
  }
}

export async function fetchProductsByCategory(
  categoryMongoId: string | undefined,
  legacyWcCategoryId?: number
): Promise<CatalogProduct[]> {
  if (categoryMongoId) {
    const rows = await fetchProductsFromMongo(categoryMongoId)
    if (rows !== null && rows.length > 0) return rows
  }

  if (legacyWcCategoryId == null) {
    throw new Error('No products source for this category (set MongoDB or legacy category id)')
  }

  const url = `${WP}/wc/store/v1/products?category=${legacyWcCategoryId}&per_page=100`
  const res = await fetch(url)
  if (!res.ok) throw new Error(`Failed to load products (${res.status})`)
  const data = (await res.json()) as StoreProduct[]
  return data.map(mapStoreProduct)
}

export async function fetchProductBySlug(slug: string): Promise<CatalogProductDetail | null> {
  const fromMongo = await fetchProductFromMongo(slug)
  if (fromMongo) return fromMongo

  const storeUrl = `${WP}/wc/store/v1/products?slug=${encodeURIComponent(slug)}`
  const storeRes = await fetch(storeUrl)
  if (storeRes.ok) {
    const storeRows = (await storeRes.json()) as StoreProduct[]
    const row = storeRows[0]
    if (row) {
      const mapped = mapStoreProduct(row)
      return {
        ...mapped,
        contentHtml: row.description || row.short_description || '',
      }
    }
  }

  const url = `${WP}/wp/v2/product?slug=${encodeURIComponent(slug)}&_embed=1`
  const res = await fetch(url)
  if (!res.ok) throw new Error(`Failed to load product (${res.status})`)
  const data = (await res.json()) as WpProduct[]
  const p = data[0]
  if (!p) return null
  return {
    id: p.id,
    slug: p.slug,
    title: p.title?.rendered || p.slug,
    excerptHtml: p.excerpt?.rendered || '',
    imageUrl: mediaUrl(p),
    catalogueUrl: null,
    catalogueLabel: 'Download Catalogue',
    contentHtml: p.content?.rendered || p.excerpt?.rendered || '',
  }
}
