import { Link } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth'
import { getDisplayName } from '../utils/authSession'
import { ROUTES } from '../constants/routes'
import { MSG } from '../constants/messages'
import PageHeader from '../components/ui/PageHeader'
import UserAvatar from '../components/ui/UserAvatar'
import './MyPage.css'

export default function MyPage() {
  const { user, logout, loading } = useAuth()
  const displayName = getDisplayName(user)

  return (
    <section className="page mypage">
      <PageHeader
        title="마이페이지"
        description="내 계정과 이용 정보를 확인하세요"
      />

      <div className="mypage-profile">
        <UserAvatar user={user} size={72} className="mypage-avatar" />
        <h2>{displayName}</h2>
        {user?.email && <p className="mypage-profile__email">{user.email}</p>}
      </div>

      <nav className="mypage-menu" aria-label="마이페이지 메뉴">
        <Link to={ROUTES.SURVEY} className="mypage-menu__item">
          <span className="mypage-menu__icon" aria-hidden>
            ✨
          </span>
          <span>
            <strong>여행 성향 설문</strong>
            <small>맞춤 패스·코스 추천받기</small>
          </span>
          <span className="mypage-menu__arrow" aria-hidden>
            ›
          </span>
        </Link>

        <div className="mypage-menu__item mypage-menu__item--static">
          <span className="mypage-menu__icon" aria-hidden>
            📋
          </span>
          <span>
            <strong>보유 패스</strong>
            <small>구매한 패스가 여기에 표시됩니다</small>
          </span>
        </div>
      </nav>

      <button
        type="button"
        className="btn btn--block mypage-logout"
        onClick={logout}
        disabled={loading}
      >
        {loading ? MSG.LOGOUT_LOADING : '로그아웃'}
      </button>
    </section>
  )
}
