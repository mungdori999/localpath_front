import { useState } from 'react'
import { Link, Navigate, useParams } from 'react-router-dom'
import CourseMap from '../components/map/CourseMap'
import SpotList from '../components/course/SpotList'
import QuantityControl from '../components/ui/QuantityControl'
import { usePass } from '../hooks/usePass'
import { purchasePass } from '../api/memberPassesApi'
import { ROUTES } from '../constants/routes'
import { MSG, MAX_PASS_PURCHASE_QUANTITY } from '../constants/messages'
import { showError, showMaxPurchaseLimit } from '../utils/alert'
import { formatPrice } from '../utils/format'
import './PassPurchasePage.css'

export default function PassPurchasePage() {
  const { passId } = useParams()
  const { data: pass, loading, error } = usePass(passId)
  const [quantity, setQuantity] = useState(1)
  const [purchaseResult, setPurchaseResult] = useState(null)
  const [purchasing, setPurchasing] = useState(false)
  const [purchaseError, setPurchaseError] = useState('')

  if (error) {
    return <Navigate to={ROUTES.PASSES} replace />
  }

  if (loading || !pass) {
    return (
      <section className="page purchase">
        <p>{MSG.LOADING}</p>
      </section>
    )
  }

  const total = pass.price * quantity

  function handleQuantityChange(next) {
    if (next > MAX_PASS_PURCHASE_QUANTITY) {
      showMaxPurchaseLimit(MAX_PASS_PURCHASE_QUANTITY)
      return
    }
    setQuantity(Math.max(1, next))
  }

  async function handlePurchase() {
    if (quantity > MAX_PASS_PURCHASE_QUANTITY) {
      await showMaxPurchaseLimit(MAX_PASS_PURCHASE_QUANTITY)
      return
    }

    setPurchasing(true)
    setPurchaseError('')
    try {
      const result = await purchasePass(pass.id, quantity)
      setPurchaseResult(result)
    } catch (err) {
      const detail = err.response?.data?.detail
      if (
        err.response?.status === 400 &&
        typeof detail === 'string' &&
        detail.toLowerCase().includes('quantity')
      ) {
        await showMaxPurchaseLimit(MAX_PASS_PURCHASE_QUANTITY)
      } else {
        const message =
          detail ?? '구매에 실패했어요. 다시 시도해 주세요.'
        setPurchaseError(message)
        await showError('구매 실패', message)
      }
    } finally {
      setPurchasing(false)
    }
  }

  if (purchaseResult) {
    return (
      <section className="page purchase purchase--success">
        <div className="purchase-success">
          <span className="purchase-success__icon" aria-hidden>
            ✓
          </span>
          <h1>가상 결제 완료</h1>
          <p>
            <strong>{pass.name}</strong>
            <br />
            {purchaseResult.tickets.length}매가 발급되었습니다
            <br />
            <small>각 이용권은 구매 후 24시간 동안 유효해요</small>
          </p>
          <div className="purchase-success__actions">
            <Link to={ROUTES.MYPAGE} className="btn btn--primary btn--lg">
              보유 패스 확인
            </Link>
            <Link to={ROUTES.PASSES} className="btn btn--secondary btn--lg">
              다른 패스 보기
            </Link>
          </div>
        </div>
      </section>
    )
  }

  return (
    <section className="page purchase">
      <div className="purchase__scroll">
        <Link to={ROUTES.PASSES} className="back-link">
          ← 패스 목록
        </Link>

        <p className="purchase-demo-note">
          실제 결제 없이 체험용 가상 구매입니다 · 이용권 유효기간 24시간 · 최대{' '}
          {MAX_PASS_PURCHASE_QUANTITY}매
        </p>

        <article className="purchase-hero">
          <span className="purchase-hero__emoji" aria-hidden>
            {pass.image}
          </span>
          <div>
            <h1>{pass.name}</h1>
            <p className="purchase-hero__meta">{pass.tagline}</p>
          </div>
        </article>

        <p className="purchase-desc">{pass.description}</p>

        <section className="purchase-courses">
          <h2>포함 코스</h2>
          {pass.courses.map((course) => (
            <div key={course.id} className="purchase-course-card">
              <div className="purchase-course-card__head">
                <span aria-hidden>{course.emoji}</span>
                <div>
                  <h3>{course.name}</h3>
                  <p>{course.description}</p>
                </div>
              </div>

              <CourseMap spots={course.spots} courseName={course.name} active />

              <SpotList spots={course.spots} variant="purchase" />
            </div>
          ))}
        </section>

        <div className="purchase-qty">
          <div className="purchase-qty__label">
            <span>수량</span>
            <small>최대 {MAX_PASS_PURCHASE_QUANTITY}매</small>
          </div>
          <QuantityControl
            value={quantity}
            onChange={handleQuantityChange}
            max={MAX_PASS_PURCHASE_QUANTITY}
            onMaxReached={() => showMaxPurchaseLimit(MAX_PASS_PURCHASE_QUANTITY)}
          />
        </div>

        {purchaseError && (
          <p className="purchase-error" role="alert">
            {purchaseError}
          </p>
        )}
      </div>

      <div className="purchase-bar safe-bottom">
        <div className="purchase-bar__total">
          <span>합계 (가상)</span>
          <strong>{formatPrice(total)}원</strong>
        </div>
        <button
          type="button"
          className="btn btn--primary btn--lg btn--block"
          onClick={handlePurchase}
          disabled={purchasing}
        >
          {purchasing ? '처리 중…' : `${formatPrice(total)}원 가상 결제하기`}
        </button>
      </div>
    </section>
  )
}
