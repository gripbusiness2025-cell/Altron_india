import { Link } from 'react-router-dom'
import { useProductCatalog } from '../context/ProductCatalogContext'

export function ProductsIndexPage() {
  const { tree } = useProductCatalog()

  return (
    <main className="corporate-page products-page">
      <article className="corporate-content">
        <header className="corporate-content-header">
          <h1 className="corporate-title">Products</h1>
        </header>
        <p className="corporate-prose" style={{ marginBottom: 20 }}>
          Browse ALTRON electronic security solutions by category.
        </p>
        <ul className="product-category-grid">
          {tree.map((cat) => (
            <li key={cat.slug}>
              <Link to={`/products/${cat.slug}`} className="product-category-card">
                <span className="product-category-card-title">{cat.label}</span>
                {cat.children?.length ? (
                  <span className="product-category-card-meta">{cat.children.length} subcategories</span>
                ) : null}
              </Link>
            </li>
          ))}
        </ul>
      </article>
    </main>
  )
}
