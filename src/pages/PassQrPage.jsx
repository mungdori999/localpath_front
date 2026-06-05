import { useEffect, useState } from 'react'
import { Link, Navigate, useParams } from 'react-router-dom'
import QRCode from 'qrcode'
import { fetchMyPassTicket } from '../api/memberPassesApi'
import { buildPassQrPayload, formatExpiresAt, formatRemainingTime } from '../utils/passQrPayload'
import { formatPrice } from '../utils/format'
import { ROUTES } from '../constants/routes'
import { MSG } from '../constants/messages'
import PageHeader from '../components/ui/PageHeader'
import PageState from '../components/ui/PageState'
import PassTicketThumb from '../components/pass/PassTicketThumb'
import {
  getSpendingFocusById,
  getSpendingBalances,
} from '../constants/spendingFocus'
import './PassQrPage.css'

export default function PassQrPage() {
  const { ticketId } = useParams()
  const [ticket, setTicket] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [qrDataUrl, setQrDataUrl] = useState('')
  const [qrError, setQrError] = useState('')

  useEffect(() => {
    setLoading(true)
    setError(null)

    fetchMyPassTicket(ticketId)
      .then(setTicket)
      .catch((err) => {
        setError(err)
        console.error(err)
      })
      .finally(() => setLoading(false))
  }, [ticketId])

  useEffect(() => {
    if (!ticket?.valid) {
      setQrDataUrl('')
      return
    }

    const payload = buildPassQrPayload(ticket)

    QRCode.toDataURL(payload, {
      width: 240,
      margin: 2,
      color: { dark: '#1a6b4a', light: '#ffffff' },
    })
      .then(setQrDataUrl)
      .catch(() => setQrError('QR 코드를 만들지 못했어요'))
  }, [ticket])

  if (!loading && (error || !ticket)) {
    return <Navigate to={ROUTES.MYPAGE} replace />
  }

  const focus = ticket ? getSpendingFocusById(ticket.spendingFocus) : null
  const balances =
    ticket && focus ? getSpendingBalances(ticket.unitPrice, ticket.spendingFocus) : null
  const showBalances = balances && ticket?.valid

  return (
    <section className="page pass-qr-page">
      <Link to={ROUTES.MYPAGE} className="back-link">
        ← 마이페이지
      </Link>

      <PageState loading={loading}>
        {ticket && (
          <>
            <PageHeader
              title="가상 결제 QR"
              description={
                ticket.valid
                  ? '매장·체험 장소에서 이 QR을 보여주세요 (데모)'
                  : '이용권이 만료되어 QR을 사용할 수 없어요'
              }
            />

            <article
              className={`pass-qr-card${ticket.valid ? '' : ' pass-qr-card--expired'}`}
            >
              <div className="pass-qr-card__head">
                <PassTicketThumb
                  passId={ticket.passId}
                  passImage={ticket.passImage}
                  className="pass-qr-card__thumb"
                />
                <div>
                  <h2>{ticket.passName}</h2>
                  {focus && (
                    <p className="pass-qr-card__focus">
                      {focus.name} · {focus.splitLabel}
                    </p>
                  )}
                  <p>{formatPrice(ticket.unitPrice)}원</p>
                </div>
              </div>

              <div className="pass-qr-card__code">
                {!ticket.valid ? (
                  <p className="pass-qr-card__expired">이용권이 만료되었습니다</p>
                ) : qrError ? (
                  <p className="pass-qr-card__error">{qrError}</p>
                ) : qrDataUrl ? (
                  <img
                    src={qrDataUrl}
                    alt={`${ticket.passName} 가상 결제 QR`}
                    width={240}
                    height={240}
                  />
                ) : (
                  <p className="pass-qr-card__loading">{MSG.LOADING}</p>
                )}
              </div>

              {showBalances && (
                <section
                  className="pass-qr-balances"
                  aria-labelledby="pass-qr-balances-title"
                >
                  <h3 id="pass-qr-balances-title" className="pass-qr-balances__title">
                    지역별 사용 가능 잔액
                  </h3>
                  <p className="pass-qr-balances__total">
                    패스 금액 <strong>{formatPrice(balances.total)}원</strong>
                  </p>
                  <ul className="pass-qr-balances__list">
                    <li>
                      <span className="pass-qr-balances__label">
                        망리단길
                        <small>{balances.mangriPercent}%</small>
                      </span>
                      <strong>{formatPrice(balances.mangri)}원</strong>
                    </li>
                    <li>
                      <span className="pass-qr-balances__label">
                        망원시장
                        <small>{balances.marketPercent}%</small>
                      </span>
                      <strong>{formatPrice(balances.market)}원</strong>
                    </li>
                  </ul>
                  <p className="pass-qr-balances__hint">
                    데모용 표시입니다. 실제 사용 내역은 반영되지 않아요.
                  </p>
                </section>
              )}

              <dl className="pass-qr-card__meta">
                <div>
                  <dt>티켓 번호</dt>
                  <dd>{ticket.ticketId}</dd>
                </div>
                <div>
                  <dt>구매일</dt>
                  <dd>
                    {new Date(ticket.purchasedAt).toLocaleDateString('ko-KR')}
                  </dd>
                </div>
                <div>
                  <dt>만료일</dt>
                  <dd>{formatExpiresAt(ticket.expiresAt)}</dd>
                </div>
                {ticket.valid && (
                  <div>
                    <dt>남은 시간</dt>
                    <dd>{formatRemainingTime(ticket.expiresAt)}</dd>
                  </div>
                )}
              </dl>

              <p className="pass-qr-card__note">
                {ticket.valid
                  ? '실제 결제가 이루어지지 않는 체험용 QR입니다. 구매 후 24시간 이내에 사용해 주세요.'
                  : '유효기간이 지난 이용권입니다. 패스를 다시 구매해 주세요.'}
              </p>

              {!ticket.valid && (
                <Link to={ROUTES.PASSES} className="btn btn--primary btn--block">
                  패스 다시 구매하기
                </Link>
              )}
            </article>
          </>
        )}
      </PageState>
    </section>
  )
}
