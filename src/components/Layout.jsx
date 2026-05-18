import { Outlet, useLocation } from 'react-router-dom'
import Header from './Header'
import BottomNav from './BottomNav'

function hideBottomNav(pathname) {
  return pathname.includes('/purchase')
}

export default function Layout() {
  const { pathname } = useLocation()
  const showNav = !hideBottomNav(pathname)

  return (
    <div className="app-shell">
      <div className="layout">
        <Header />
        <main
          className={`layout__main${showNav ? '' : ' layout__main--no-nav'}`}
        >
          <Outlet />
        </main>
        {showNav && <BottomNav />}
      </div>
    </div>
  )
}
