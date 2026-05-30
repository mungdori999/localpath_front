import { useEffect, useState } from 'react'
import { Link, Navigate, useParams } from 'react-router-dom'
import QRCode from 'qrcode'
import { getPurchasedPassById } from '../utils/purchasedPasses'
import { buildPassQrPayload } from '../utils/passQrPayload'
import { formatPrice } from '../utils/format'
import { ROUTES } from '../constants/routes'
import PageHeader from '../components/ui/PageHeader'
import './PassQrPage.css'

export default function PassQrPage() {
  const { passId } = useParams()
  const pass = getPurchasedPassById(passId)
  const [qrDataUrl, setQrDataUrl] = useState('')
  const [qrError, setQrError] = useState('')

  useEffect(() => {
    if (!pass) return

    const payload = buildPassQrPayload(pass)

    QRCode.toDataURL(payload, {
      width: 240,
      margin: 2,
      color: { dark: '#1a6b4a', light: '#ffffff' },
    })
      .then(setQrDataUrl)
      .catch(() => setQrError('QR 코드를 만들지 못했어요'))
  }, [pass])

  if (!pass) {
    return <Navigate to={ROUTES.MYPAGE} replace />
  }

  const total = pass.price * pass.quantity
  const ticketId = pass.ticketId ?? `LP-${pass.passId}-legacy`

  return (
    <section className="page pass-qr-page">
      <Link to={ROUTES.MYPAGE} className="back-link">
        ← 마이페이지
      </Link>

      <PageHeader
        title="가상 결제 QR"
        description="매장·체험 장소에서 이 QR을 보여주세요 (데모)"
      />

      <article className="pass-qr-card">
        <div className="pass-qr-card__head">
          <span className="pass-qr-card__emoji" aria-hidden>
            {pass.image}
          </span>
          <div>
            <h2>{pass.name}</h2>
            <p>{pass.quantity}매 · {formatPrice(total)}원</p>
          </div>
        </div>

        <div className="pass-qr-card__code">
          {qrError ? (
            <p className="pass-qr-card__error">{qrError}</p>
          ) : qrDataUrl ? (
            <img src={qrDataUrl} alt={`${pass.name} 가상 결제 QR`} width={240} height={240} />
          ) : (
            <p className="pass-qr-card__loading">QR 생성 중…</p>
          )}
        </div>

        <dl className="pass-qr-card__meta">
          <div>
            <dt>티켓 번호</dt>
            <dd>{ticketId}</dd>
          </div>
          <div>
            <dt>구매일</dt>
            <dd>{new Date(pass.purchasedAt).toLocaleDateString('ko-KR')}</dd>
          </div>
        </dl>

        <p className="pass-qr-card__note">
          실제 결제가 이루어지지 않는 체험용 QR입니다. 화면을 밝게 유지한 채 제시해 주세요.
        </p>
      </article>
    </section>
  )
}
