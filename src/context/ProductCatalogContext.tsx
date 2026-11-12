import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from 'react'
import { productCategories } from '../content/productCategories'
import { fetchCatalogHealth, fetchCategoryTree } from '../lib/catalogApi'
import { shouldLoadRemoteCatalog } from '../lib/catalogConfig'
import type { ProductLink } from '../content/productCategories'

type CatalogContextValue = {
  tree: ProductLink[]
  loading: boolean
  source: 'mongodb' | 'static'
}

const ProductCatalogContext = createContext<CatalogContextValue>({
  tree: productCategories,
  loading: true,
  source: 'static',
})

export function ProductCatalogProvider({ children }: { children: ReactNode }) {
  const [tree, setTree] = useState<ProductLink[]>(productCategories)
  const [loading, setLoading] = useState(() => shouldLoadRemoteCatalog())
  const [source, setSource] = useState<'mongodb' | 'static'>('static')

  useEffect(() => {
    let cancelled = false

    if (!shouldLoadRemoteCatalog()) {
      setLoading(false)
      return
    }

    const loadRemoteCatalog = async () => {
      const healthy = await fetchCatalogHealth()
      if (!healthy) {
        if (!cancelled) setLoading(false)
        return
      }

      try {
        const fromDb = await fetchCategoryTree()
        if (!cancelled) {
          setTree(fromDb)
          setSource('mongodb')
        }
      } catch {
        /* keep static fallback */
      } finally {
        if (!cancelled) setLoading(false)
      }
    }

    let usedIdleCallback = false
    let idleHandle: number | ReturnType<typeof setTimeout>
    if (typeof requestIdleCallback !== 'undefined') {
      usedIdleCallback = true
      idleHandle = requestIdleCallback(() => void loadRemoteCatalog(), { timeout: 2500 })
    } else {
      idleHandle = setTimeout(() => void loadRemoteCatalog(), 1)
    }

    return () => {
      cancelled = true
      if (usedIdleCallback && typeof cancelIdleCallback !== 'undefined') {
        cancelIdleCallback(idleHandle as number)
      } else {
        clearTimeout(idleHandle as ReturnType<typeof setTimeout>)
      }
    }
  }, [])

  const value = useMemo(() => ({ tree, loading, source }), [tree, loading, source])

  return <ProductCatalogContext.Provider value={value}>{children}</ProductCatalogContext.Provider>
}

export function useProductCatalog() {
  return useContext(ProductCatalogContext)
}
