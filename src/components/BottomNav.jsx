import { NavLink } from 'react-router-dom'
import { ROUTES } from '../constants/routes'
import './BottomNav.css'

function HomeIcon({ active }) {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        d="M4 10.5L12 4l8 6.5V20a1 1 0 01-1 1h-5v-6H10v6H5a1 1 0 01-1-1v-9.5z"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinejoin="round"
        fill={active ? 'currentColor' : 'none'}
        fillOpacity={active ? 0.15 : 0}
      />
    </svg>
  )
}

function PassIcon({ active }) {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden>
      <rect
        x="4"
        y="5"
        width="16"
        height="14"
        rx="2"
        stroke="currentColor"
        strokeWidth="1.8"
        fill={active ? 'currentColor' : 'none'}
        fillOpacity={active ? 0.15 : 0}
      />
      <path
        d="M8 10h8M8 14h5"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
      />
    </svg>
  )
}

function MyIcon({ active }) {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden>
      <circle
        cx="12"
        cy="9"
        r="4"
        stroke="currentColor"
        strokeWidth="1.8"
        fill={active ? 'currentColor' : 'none'}
        fillOpacity={active ? 0.2 : 0}
      />
      <path
        d="M5 20c0-3.3 2.7-6 7-6s7 2.7 7 6"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
      />
    </svg>
  )
}

export default function BottomNav() {
  return (
    <nav className="bottom-nav safe-bottom" aria-label="메인 메뉴">
      <NavLink to={ROUTES.HOME} end className="bottom-nav__item">
        {({ isActive }) => (
          <>
            <HomeIcon active={isActive} />
            <span>홈</span>
          </>
        )}
      </NavLink>
      <NavLink to={ROUTES.PASSES} className="bottom-nav__item">
        {({ isActive }) => (
          <>
            <PassIcon active={isActive} />
            <span>패스</span>
          </>
        )}
      </NavLink>
      <NavLink to={ROUTES.MYPAGE} className="bottom-nav__item">
        {({ isActive }) => (
          <>
            <MyIcon active={isActive} />
            <span>마이</span>
          </>
        )}
      </NavLink>
    </nav>
  )
}
