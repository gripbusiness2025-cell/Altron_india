import { Link } from 'react-router-dom'
import { usePageSeo } from '../seo/usePageSeo'

export function NotFoundPage() {
  usePageSeo({
    title: 'Page Not Found',
    description: 'The page you requested could not be found. Explore ALTRON products and services.',
    path: '/404',
    noindex: true,
  })

  return (
    <main className="corporate-page products-page">
      <article className="corporate-content">
        <h1 className="corporate-title">404 — Page not found</h1>
        <p className="corporate-prose">
          We could not find that page. Try the links below or{' '}
          <Link to="/contact">contact us</Link> for help.
        </p>
        <ul className="product-category-grid" style={{ marginTop: 24 }}>
          <li>
            <Link to="/" className="product-category-card">
              <span className="product-category-card-title">Home</span>
            </Link>
          </li>
          <li>
            <Link to="/products" className="product-category-card">
              <span className="product-category-card-title">Products</span>
            </Link>
          </li>
          <li>
            <Link to="/contact" className="product-category-card">
              <span className="product-category-card-title">Contact</span>
            </Link>
          </li>
        </ul>
      </article>
    </main>
  )
}
