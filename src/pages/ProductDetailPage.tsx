import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { ProductDetailLoader } from '../components/ProductDetailLoader'
import { fetchProductBySlug, type CatalogProductDetail } from '../lib/productsApi'
import { ProductJsonLd } from '../seo/JsonLd'
import { absoluteUrl } from '../seo/site'
import { usePageSeo } from '../seo/usePageSeo'

export function ProductDetailPage() {
  const { slug = '' } = useParams()
  const [product, setProduct] = useState<CatalogProductDetail | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  const plainTitle = product?.title.replace(/<[^>]+>/g, '').trim() || ''

  usePageSeo(
    product
      ? {
          title: plainTitle,
          description:
            product.excerptHtml.replace(/<[^>]+>/g, ' ').trim().slice(0, 160) ||
            `${plainTitle} — ALTRON Security Engineering product.`,
          path: `/product/${product.slug}`,
          ogImage: product.imageUrl || undefined,
        }
      : slug
        ? {
            title: 'Product',
            description: 'ALTRON Security Engineering product details.',
            path: `/product/${slug}`,
          }
        : null
  )

  useEffect(() => {
    if (!slug) return
    let cancelled = false
    setLoading(true)
    setError('')
    setProduct(null)

    fetchProductBySlug(slug)
      .then((row) => {
        if (cancelled) return
        setProduct(row)
      })
      .catch((err: unknown) => {
        if (!cancelled) setError(err instanceof Error ? err.message : 'Could not load product')
      })
      .finally(() => {
        if (!cancelled) setLoading(false)
      })

    return () => {
      cancelled = true
    }
  }, [slug])

  return (
    <main className="corporate-page products-page">
      <article className="corporate-content">
        <p className="product-back">
          <Link to="/products">← All Products</Link>
        </p>

        {loading && <ProductDetailLoader />}
        {error && <p className="product-status product-status--error">{error}</p>}
        {!loading && !error && !product && (
          <p className="product-status">Product not found.</p>
        )}

        {product && (
          <div className="product-detail">
            <ProductJsonLd
              name={plainTitle}
              description={product.excerptHtml || product.contentHtml}
              image={product.imageUrl}
              url={absoluteUrl(`/product/${product.slug}`)}
            />
            <header className="corporate-content-header">
              <h1
                className="corporate-title"
                dangerouslySetInnerHTML={{ __html: product.title }}
              />
            </header>
            {product.imageUrl && (
              <div className="product-detail-media">
                <img src={product.imageUrl} alt="" />
              </div>
            )}
            {(product.contentHtml || product.excerptHtml) && (
              <div
                className="corporate-prose product-detail-body"
                dangerouslySetInnerHTML={{ __html: product.contentHtml || product.excerptHtml }}
              />
            )}
            {product.catalogueUrl && (
              <p className="product-detail-catalogue">
                <a
                  className="product-catalogue-btn"
                  href={product.catalogueUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {product.catalogueLabel || 'Download Catalogue'}
                </a>
              </p>
            )}
          </div>
        )}
      </article>
    </main>
  )
}
