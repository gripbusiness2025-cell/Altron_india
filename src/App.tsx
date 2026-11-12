import { lazy, Suspense } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { ProductCatalogProvider } from './context/ProductCatalogContext'
import { SiteLayout } from './layout/SiteLayout'
import { RouteFallback } from './components/RouteFallback'
import { HomePage } from './pages/HomePage'
import './App.css'

const CorporatePage = lazy(() => import('./pages/CorporatePage').then((m) => ({ default: m.CorporatePage })))
const AltronCarePage = lazy(() => import('./pages/AltronCarePage').then((m) => ({ default: m.AltronCarePage })))
const AltronECampusPage = lazy(() =>
  import('./pages/AltronECampusPage').then((m) => ({ default: m.AltronECampusPage }))
)
const FaqPage = lazy(() => import('./pages/FaqPage').then((m) => ({ default: m.FaqPage })))
const ContactPage = lazy(() => import('./pages/ContactPage').then((m) => ({ default: m.ContactPage })))
const AgbmPage = lazy(() => import('./pages/AgbmPage').then((m) => ({ default: m.AgbmPage })))
const EsteemedClientsPage = lazy(() =>
  import('./pages/EsteemedClientsPage').then((m) => ({ default: m.EsteemedClientsPage }))
)
const QssPage = lazy(() => import('./pages/QssPage').then((m) => ({ default: m.QssPage })))
const ProductsIndexPage = lazy(() =>
  import('./pages/ProductsIndexPage').then((m) => ({ default: m.ProductsIndexPage }))
)
const ProductCategoryPage = lazy(() =>
  import('./pages/ProductCategoryPage').then((m) => ({ default: m.ProductCategoryPage }))
)
const ProductDetailPage = lazy(() =>
  import('./pages/ProductDetailPage').then((m) => ({ default: m.ProductDetailPage }))
)
const NotFoundPage = lazy(() => import('./pages/NotFoundPage').then((m) => ({ default: m.NotFoundPage })))

function App() {
  return (
    <BrowserRouter>
      <ProductCatalogProvider>
        <Routes>
          <Route element={<SiteLayout />}>
            <Route path="/" element={<HomePage />} />
            <Route
              path="/corporate"
              element={
                <Suspense fallback={<RouteFallback />}>
                  <CorporatePage />
                </Suspense>
              }
            />
            <Route
              path="/products"
              element={
                <Suspense fallback={<RouteFallback />}>
                  <ProductsIndexPage />
                </Suspense>
              }
            />
            <Route
              path="/products/*"
              element={
                <Suspense fallback={<RouteFallback />}>
                  <ProductCategoryPage />
                </Suspense>
              }
            />
            <Route
              path="/product/:slug"
              element={
                <Suspense fallback={<RouteFallback />}>
                  <ProductDetailPage />
                </Suspense>
              }
            />
            <Route
              path="/qss"
              element={
                <Suspense fallback={<RouteFallback />}>
                  <QssPage />
                </Suspense>
              }
            />
            <Route
              path="/altron-care"
              element={
                <Suspense fallback={<RouteFallback />}>
                  <AltronCarePage />
                </Suspense>
              }
            />
            <Route
              path="/e-campus"
              element={
                <Suspense fallback={<RouteFallback />}>
                  <AltronECampusPage />
                </Suspense>
              }
            />
            <Route
              path="/agbm"
              element={
                <Suspense fallback={<RouteFallback />}>
                  <AgbmPage />
                </Suspense>
              }
            />
            <Route
              path="/esteemed-clients"
              element={
                <Suspense fallback={<RouteFallback />}>
                  <EsteemedClientsPage />
                </Suspense>
              }
            />
            <Route
              path="/faq"
              element={
                <Suspense fallback={<RouteFallback />}>
                  <FaqPage />
                </Suspense>
              }
            />
            <Route
              path="/contact"
              element={
                <Suspense fallback={<RouteFallback />}>
                  <ContactPage />
                </Suspense>
              }
            />
            <Route
              path="*"
              element={
                <Suspense fallback={<RouteFallback />}>
                  <NotFoundPage />
                </Suspense>
              }
            />
          </Route>
        </Routes>
      </ProductCatalogProvider>
    </BrowserRouter>
  )
}

export default App
