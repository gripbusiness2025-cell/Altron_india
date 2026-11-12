import type { ProductLink } from '../content/productCategories'

export type ResolvedCategory = {
  node: ProductLink
  path: string
  crumbs: Array<{ label: string; path: string }>
  parentPath: string | null
}

/** Resolve `/products/a/b/c` segments against a category tree. */
export function resolveCategoryPath(tree: ProductLink[], segments: string[]): ResolvedCategory | null {
  if (!segments.length) return null

  let nodes = tree
  let node: ProductLink | undefined
  const crumbs: Array<{ label: string; path: string }> = []
  const parts: string[] = []

  for (const slug of segments) {
    node = nodes.find((n) => n.slug === slug)
    if (!node) return null
    parts.push(node.slug)
    crumbs.push({ label: node.label, path: `/products/${parts.join('/')}` })
    nodes = node.children || []
  }

  if (!node) return null

  return {
    node,
    path: `/products/${parts.join('/')}`,
    crumbs,
    parentPath: parts.length > 1 ? `/products/${parts.slice(0, -1).join('/')}` : '/products',
  }
}
