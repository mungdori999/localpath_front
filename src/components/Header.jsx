import { Link } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth'
import UserMenu from './UserMenu'
import './Header.css'

function KakaoIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 18 18" fill="none" aria-hidden>
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M9 1.5C4.86 1.5 1.5 4.2 1.5 7.5c0 2.1 1.4 3.95 3.5 5.05L4.5 15l3.15-1.95c.45.08.93.12 1.35.12 4.14 0 7.5-2.7 7.5-6s-3.36-6-7.5-6z"
        fill="currentColor"
      />
    </svg>
  )
}

export default function Header() {
  const { user, loading, loginWithKakao, isLoggedIn } = useAuth()

  return (
    <header className="header safe-top">
      <Link to="/" className="header__logo">
        localpath
      </Link>

      <div className="header__actions">
        {isLoggedIn ? (
          <UserMenu user={user} />
        ) : (
          <button
            type="button"
            className="kakao-login-btn kakao-login-btn--compact"
            onClick={loginWithKakao}
            disabled={loading}
            aria-label="카카오 로그인"
          >
            <KakaoIcon />
            <span className="kakao-login-btn__label">
              {loading ? '…' : '로그인'}
            </span>
          </button>
        )}
      </div>
    </header>
  )
}
