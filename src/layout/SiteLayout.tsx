import { Outlet } from 'react-router-dom'
import { Header } from '../components/Header'
import { NavBar } from '../components/NavBar'
import { RouteSeo } from '../components/RouteSeo'
import { FloatingActions } from '../components/FloatingActions'
import { SiteFooter } from '../components/SiteFooter'
import { GlobalJsonLd } from '../seo/JsonLd'

export function SiteLayout() {
  return (
    <div className="site">
      <RouteSeo />
      <GlobalJsonLd />
      <Header />
      <NavBar />
      <Outlet />
      <SiteFooter />
      <FloatingActions />
    </div>
  )
}
