import { Link } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth'
import { useMemberPasses } from '../hooks/useMemberPasses'
import { getDisplayName } from '../utils/authSession'
import { formatExpiresAt, formatRemainingTime } from '../utils/passQrPayload'
import { ROUTES } from '../constants/routes'
import { MSG } from '../constants/messages'
import PageHeader from '../components/ui/PageHeader'
import PageState from '../components/ui/PageState'
import UserAvatar from '../components/ui/UserAvatar'
import './MyPage.css'

export default function MyPage() {
  const { user, logout, loading } = useAuth()
  const { data: tickets, loading: passesLoading, error: passesError } = useMemberPasses()
  const displayName = getDisplayName(user)

  const activeTickets = tickets?.filter((t) => t.valid) ?? []
  const expiredTickets = tickets?.filter((t) => !t.valid) ?? []

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
            <strong>나가기 취향 설문</strong>
            <small>데이트·외식에 맞는 코스 추천받기</small>
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
        <p className="mypage-passes__hint">구매 후 24시간 동안 이용 가능</p>

        <PageState
          loading={passesLoading}
          error={passesError}
          errorMessage="보유 패스를 불러오지 못했어요"
        >
          {activeTickets.length > 0 && (
            <ul className="mypage-passes__list">
              {activeTickets.map((ticket) => (
                <li key={ticket.ticketId}>
                  <Link
                    to={ROUTES.passTicketQr(ticket.ticketId)}
                    className="mypage-menu__item mypage-passes__item"
                  >
                    <span className="mypage-menu__icon" aria-hidden>
                      {ticket.passImage}
                    </span>
                    <span>
                      <strong>{ticket.passName}</strong>
                      <small>
                        {formatRemainingTime(ticket.expiresAt)} · QR 결제 보기
                      </small>
                    </span>
                    <span className="mypage-menu__arrow" aria-hidden>
                      ›
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          )}

          {activeTickets.length === 0 && expiredTickets.length === 0 && (
            <div className="mypage-passes__empty">
              <p>아직 보유한 패스가 없어요</p>
              <Link to={ROUTES.PASSES} className="btn btn--secondary">
                패스 둘러보기
              </Link>
            </div>
          )}

          {activeTickets.length === 0 && expiredTickets.length > 0 && (
            <div className="mypage-passes__empty">
              <p>사용 가능한 패스가 없어요</p>
              <Link to={ROUTES.PASSES} className="btn btn--secondary">
                패스 구매하기
              </Link>
            </div>
          )}

          {expiredTickets.length > 0 && (
            <>
              <h3 className="mypage-passes__subtitle">만료된 패스</h3>
              <ul className="mypage-passes__list mypage-passes__list--expired">
                {expiredTickets.map((ticket) => (
                  <li key={ticket.ticketId}>
                    <div className="mypage-menu__item mypage-menu__item--static mypage-passes__item">
                      <span className="mypage-menu__icon" aria-hidden>
                        {ticket.passImage}
                      </span>
                      <span>
                        <strong>{ticket.passName}</strong>
                        <small>
                          만료 · {formatExpiresAt(ticket.expiresAt)}
                        </small>
                      </span>
                    </div>
                  </li>
                ))}
              </ul>
            </>
          )}
        </PageState>
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
