import { apiBase } from './apiBase'
import type { ProductLink } from '../content/productCategories'

export async function fetchCatalogHealth(): Promise<boolean> {
  try {
    const res = await fetch(`${apiBase()}/catalog/health`)
    if (!res.ok) return false
    const data = (await res.json()) as { ok?: boolean }
    return Boolean(data.ok)
  } catch {
    return false
  }
}

export async function fetchCategoryTree(): Promise<ProductLink[]> {
  const res = await fetch(`${apiBase()}/catalog/tree`)
  if (!res.ok) throw new Error(`Failed to load categories (${res.status})`)
  return (await res.json()) as ProductLink[]
}
