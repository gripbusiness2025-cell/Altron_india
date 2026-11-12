import { useEffect, useState } from 'react'
import { Link, Navigate, useParams } from 'react-router-dom'
import { buildChildPath } from '../content/productCategories'
import { useProductCatalog } from '../context/ProductCatalogContext'
import { usePageSeo } from '../seo/usePageSeo'
import { ProductGridLoader } from '../components/ProductGridLoader'
import { fetchProductsByCategory, type CatalogProduct } from '../lib/productsApi'
import { resolveCategoryPath } from '../lib/resolveCategoryPath'

export function ProductCategoryPage() {
  const { tree } = useProductCatalog()
  const { '*': splat } = useParams()
  const segments = (splat || '').split('/').filter(Boolean)
  const resolved = resolveCategoryPath(tree, segments)

  usePageSeo(
    resolved
      ? {
          title: `${resolved.node.label} | ALTRON Products`,
          description: `Explore ${resolved.node.label} from ALTRON Security Engineering — electronic security products, catalogues and solutions in India.`,
          path: resolved.path,
        }
      : null
  )

  const [products, setProducts] = useState<CatalogProduct[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    if (!resolved) return
    let cancelled = false
    setLoading(true)
    setError('')
    setProducts([])

    fetchProductsByCategory(resolved.node.id, resolved.node.categoryId)
      .then((rows) => {
        if (!cancelled) setProducts(rows)
      })
      .catch((err: unknown) => {
        if (!cancelled) setError(err instanceof Error ? err.message : 'Could not load products')
      })
      .finally(() => {
        if (!cancelled) setLoading(false)
      })

    return () => {
      cancelled = true
    }
  }, [resolved?.path, resolved?.node.id, resolved?.node.categoryId])

  if (!segments.length) return <Navigate to="/products" replace />
  if (!resolved) {
    return (
      <main className="corporate-page products-page">
        <article className="corporate-content">
          <h1 className="corporate-title">Category not found</h1>
          <p>
            <Link to="/products">Back to Products</Link>
          </p>
        </article>
      </main>
    )
  }

  const { node, path, crumbs, parentPath } = resolved
  const children = node.children || []

  return (
    <main className="corporate-page products-page">
      <article className="corporate-content">
        <nav className="product-breadcrumbs" aria-label="Breadcrumb">
          <Link to="/products">Products</Link>
          {crumbs.map((c) => (
            <span key={c.path}>
              <span className="product-breadcrumb-sep">/</span>
              {c.path === path ? <span aria-current="page">{c.label}</span> : <Link to={c.path}>{c.label}</Link>}
            </span>
          ))}
        </nav>

        <header className="corporate-content-header">
          <h1 className="corporate-title">{node.label}</h1>
        </header>

        {children.length > 0 && (
          <section className="product-subcats" aria-label="Subcategories">
            <ul className="product-category-grid">
              {children.map((child) => (
                <li key={child.slug}>
                  <Link to={buildChildPath(path, child.slug)} className="product-category-card">
                    <span className="product-category-card-title">{child.label}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </section>
        )}

        <section className="product-catalog" aria-label="Products">
          {loading && <ProductGridLoader />}
          {error && <p className="product-status product-status--error">{error}</p>}
          {!loading && !error && products.length === 0 && children.length === 0 && (
            <p className="product-status">No products listed in this category yet.</p>
          )}
          {!loading && products.length > 0 && (
            <ul className="product-grid">
              {products.map((product) => (
                <li key={product.id} className="product-card">
                  <Link to={`/product/${product.slug}`} className="product-card-link">
                    <span className="product-card-media">
                      {product.imageUrl ? (
                        <img
                          src={product.imageUrl}
                          alt=""
                          loading="lazy"
                          decoding="async"
                          width={320}
                          height={280}
                        />
                      ) : (
                        <span className="product-card-placeholder" aria-hidden="true" />
                      )}
                    </span>
                    <span className="product-card-title" dangerouslySetInnerHTML={{ __html: product.title }} />
                  </Link>
                  {product.catalogueUrl ? (
                    <a
                      className="product-catalogue-btn"
                      href={product.catalogueUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {product.catalogueLabel || 'Download Catalogue'}
                    </a>
                  ) : (
                    <span className="product-catalogue-btn is-disabled">Download Catalogue</span>
                  )}
                </li>
              ))}
            </ul>
          )}
        </section>

        {parentPath && (
          <p className="product-back">
            <Link to={parentPath}>← Back</Link>
          </p>
        )}
      </article>
    </main>
  )
}
