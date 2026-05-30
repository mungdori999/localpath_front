import { Link } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth'
import { getDisplayName } from '../utils/authSession'
import { getPurchasedPasses } from '../utils/purchasedPasses'
import { ROUTES } from '../constants/routes'
import { MSG } from '../constants/messages'
import PageHeader from '../components/ui/PageHeader'
import UserAvatar from '../components/ui/UserAvatar'
import './MyPage.css'

export default function MyPage() {
  const { user, logout, loading } = useAuth()
  const displayName = getDisplayName(user)
  const purchasedPasses = getPurchasedPasses()

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
        <Link to={ROUTES.BADGES} className="mypage-menu__item">
          <span className="mypage-menu__icon" aria-hidden>
            🏅
          </span>
          <span>
            <strong>배지</strong>
            <small>방문 인증으로 배지를 모아보세요</small>
          </span>
          <span className="mypage-menu__arrow" aria-hidden>
            ›
          </span>
        </Link>

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
      </nav>

      <section className="mypage-passes" aria-labelledby="mypage-passes-title">
        <h2 id="mypage-passes-title" className="mypage-passes__title">
          보유 패스
        </h2>

        {purchasedPasses.length > 0 ? (
          <ul className="mypage-passes__list">
            {purchasedPasses.map((p) => (
              <li key={p.passId}>
                <Link
                  to={ROUTES.passQr(p.passId)}
                  className="mypage-menu__item mypage-passes__item"
                >
                  <span className="mypage-menu__icon" aria-hidden>
                    {p.image}
                  </span>
                  <span>
                    <strong>{p.name}</strong>
                    <small>
                      {p.quantity}매 · 가상 구매 · QR 결제 보기
                    </small>
                  </span>
                  <span className="mypage-menu__arrow" aria-hidden>
                    ›
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        ) : (
          <div className="mypage-passes__empty">
            <p>아직 보유한 패스가 없어요</p>
            <Link to={ROUTES.PASSES} className="btn btn--secondary">
              패스 둘러보기
            </Link>
          </div>
        )}
      </section>

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
