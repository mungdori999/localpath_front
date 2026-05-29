import { Link } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth'
import { APP_NAME } from '../constants/brand'
import { ROUTES } from '../constants/routes'
import KakaoLoginButton from './auth/KakaoLoginButton'
import UserMenu from './UserMenu'
import './Header.css'

export default function Header() {
  const { user, loading, loginWithKakao, isLoggedIn } = useAuth()

  return (
    <header className="header safe-top">
      <Link to={ROUTES.HOME} className="header__logo">
        {APP_NAME}
      </Link>

      <div className="header__actions">
        {isLoggedIn ? (
          <UserMenu user={user} />
        ) : (
          <KakaoLoginButton
            variant="compact"
            loading={loading}
            onClick={loginWithKakao}
          />
        )}
      </div>
    </header>
  )
}
