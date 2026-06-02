import { Outlet, useLocation } from 'react-router-dom'
import { isPurchaseRoute } from '../constants/routes'
import Header from './Header'
import AppFooter from './AppFooter'
import BottomNav from './BottomNav'

export default function Layout() {
  const { pathname } = useLocation()
  const showNav = !isPurchaseRoute(pathname)

  return (
    <div className="app-shell">
      <div className="layout">
        <Header />
        <main
          className={`layout__main${showNav ? '' : ' layout__main--no-nav'}`}
        >
          <Outlet />
        </main>
        <AppFooter />
        {showNav && <BottomNav />}
      </div>
    </div>
  )
}
