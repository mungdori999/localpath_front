import { NavLink } from 'react-router-dom'
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

function CharacterIcon({ active }) {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden>
      <circle
        cx="12"
        cy="10"
        r="5"
        stroke="currentColor"
        strokeWidth="1.8"
        fill={active ? 'currentColor' : 'none'}
        fillOpacity={active ? 0.2 : 0}
      />
      <path
        d="M6 20c0-3.3 2.7-6 6-6s6 2.7 6 6"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
      />
      {active && (
        <circle cx="16" cy="7" r="1.5" fill="currentColor" />
      )}
    </svg>
  )
}

export default function BottomNav() {
  return (
    <nav className="bottom-nav safe-bottom" aria-label="메인 메뉴">
      <NavLink to="/" end className="bottom-nav__item">
        {({ isActive }) => (
          <>
            <HomeIcon active={isActive} />
            <span>홈</span>
          </>
        )}
      </NavLink>
      <NavLink to="/passes" className="bottom-nav__item">
        {({ isActive }) => (
          <>
            <PassIcon active={isActive} />
            <span>패스</span>
          </>
        )}
      </NavLink>
      <NavLink to="/character" className="bottom-nav__item">
        {({ isActive }) => (
          <>
            <CharacterIcon active={isActive} />
            <span>망둥이</span>
          </>
        )}
      </NavLink>
    </nav>
  )
}
