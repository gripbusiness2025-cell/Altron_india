import { useState } from 'react'
import { Link, NavLink } from 'react-router-dom'
import type { ProductLink } from '../content/productCategories'
import { useProductCatalog } from '../context/ProductCatalogContext'

const navItems: { label: string; to: string; end?: boolean }[] = [
  { label: 'Home', to: '/', end: true },
  { label: 'Corporate', to: '/corporate' },
  { label: 'QSS', to: '/qss' },
  { label: 'Esteemed Clients', to: '/esteemed-clients' },
  { label: 'Altron Care', to: '/altron-care' },
  { label: 'Altron e-Campus', to: '/e-campus' },
  { label: 'AGBM', to: '/agbm' },
  { label: 'FAQ', to: '/faq' },
  { label: 'Contact', to: '/contact' },
]

function NavRouteLink({
  to,
  end,
  children,
}: {
  to: string
  end?: boolean
  children: string
}) {
  return (
    <NavLink to={to} end={end} className={({ isActive }) => (isActive ? 'is-active' : undefined)}>
      {children}
    </NavLink>
  )
}

function ProductMenuItem({ item, pathPrefix }: { item: ProductLink; pathPrefix: string }) {
  const hasChildren = Boolean(item.children?.length)
  const to = `${pathPrefix}/${item.slug}`

  return (
    <li className={hasChildren ? 'main-nav-flyout' : undefined}>
      <Link to={to}>{item.label}</Link>
      {hasChildren && (
        <ul className="main-nav-flyout-panel" aria-label={`${item.label} subcategories`}>
          {item.children!.map((child) => (
            <ProductMenuItem key={`${to}/${child.slug}`} item={child} pathPrefix={to} />
          ))}
        </ul>
      )}
    </li>
  )
}

export function NavBar() {
  const { tree } = useProductCatalog()
  const [searchOpen, setSearchOpen] = useState(false)

  return (
    <nav
      className={`main-nav${searchOpen ? ' is-search-open' : ''}`}
      aria-label="Main navigation"
    >
      <div className="main-nav-inner">
        <ul className="main-nav-list">
          <li>
            <NavRouteLink to="/" end>
              Home
            </NavRouteLink>
          </li>
          <li>
            <NavRouteLink to="/corporate">Corporate</NavRouteLink>
          </li>
          <li className="main-nav-item--has-submenu">
            <Link to="/products" className="main-nav-parent" aria-haspopup="true">
              Products
            </Link>
            <ul className="main-nav-dropdown" aria-label="Product categories">
              {tree.map((cat) => (
                <ProductMenuItem key={cat.slug} item={cat} pathPrefix="/products" />
              ))}
            </ul>
          </li>
          {navItems
            .filter((item) => item.label !== 'Home' && item.label !== 'Corporate')
            .map((item) => (
              <li key={item.label}>
                <NavRouteLink to={item.to} end={item.end}>
                  {item.label}
                </NavRouteLink>
              </li>
            ))}
        </ul>
        <div className="main-nav-search">
          <form
            className="main-nav-search-form"
            role="search"
            action="https://altronindia.com/"
            method="get"
            onSubmit={() => setSearchOpen(false)}
          >
            <label className="sr-only" htmlFor="nav-search">
              Search for:
            </label>
            <input id="nav-search" type="search" name="s" placeholder="Search" />
          </form>
          <button
            type="button"
            className="main-nav-search-btn"
            aria-label="Open search"
            aria-expanded={searchOpen}
            onClick={() => setSearchOpen(true)}
          >
            <svg viewBox="0 0 24 24" aria-hidden="true">
              <path d="M15.5 14h-.79l-.28-.27A6.471 6.471 0 0 0 16 9.5 6.5 6.5 0 1 0 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z" />
            </svg>
          </button>
        </div>
      </div>
    </nav>
  )
}
