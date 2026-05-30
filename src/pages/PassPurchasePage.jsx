import { useState } from 'react'
import { Link, Navigate, useParams } from 'react-router-dom'
import CourseMap from '../components/map/CourseMap'
import SpotList from '../components/course/SpotList'
import QuantityControl from '../components/ui/QuantityControl'
import { usePass } from '../hooks/usePass'
import { ROUTES } from '../constants/routes'
import { MSG } from '../constants/messages'
import { formatPrice } from '../utils/format'
import { addPurchasedPass } from '../utils/purchasedPasses'
import './PassPurchasePage.css'

export default function PassPurchasePage() {
  const { passId } = useParams()
  const { data: pass, loading, error } = usePass(passId)
  const [quantity, setQuantity] = useState(1)
  const [purchased, setPurchased] = useState(false)
  const [purchasing, setPurchasing] = useState(false)

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

  function handlePurchase() {
    setPurchasing(true)
    addPurchasedPass(pass, quantity)
    setTimeout(() => {
      setPurchasing(false)
      setPurchased(true)
    }, 400)
  }

  if (purchased) {
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
            {quantity}매가 발급되었습니다 (데모)
          </p>
          <Link
            to={ROUTES.passQr(pass.id)}
            className="btn btn--primary btn--lg"
          >
            결제 QR 보기
          </Link>
          <Link to={ROUTES.PASSES} className="btn btn--secondary btn--lg">
            다른 패스 보기
          </Link>
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

        <p className="purchase-demo-note">실제 결제 없이 체험용 가상 구매입니다</p>

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
          <span>수량</span>
          <QuantityControl value={quantity} onChange={setQuantity} />
        </div>
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
