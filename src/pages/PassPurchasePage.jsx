import { useState } from 'react'
import { Link, Navigate, useParams } from 'react-router-dom'
import { getPassById } from '../data/passes'
import { useAuth } from '../hooks/useAuth'

function formatPrice(price) {
  return price.toLocaleString('ko-KR')
}

export default function PassPurchasePage() {
  const { passId } = useParams()
  const pass = getPassById(passId)
  const { isLoggedIn, loginWithKakao, loading } = useAuth()
  const [quantity, setQuantity] = useState(1)
  const [purchased, setPurchased] = useState(false)

  if (!pass) {
    return <Navigate to="/passes" replace />
  }

  const total = pass.price * quantity

  function handlePurchase() {
    if (!isLoggedIn) return
    setPurchased(true)
  }

  if (purchased) {
    return (
      <section className="page purchase purchase--success">
        <div className="purchase-success">
          <span className="purchase-success__icon" aria-hidden>
            ✓
          </span>
          <h1>구매 완료</h1>
          <p>
            <strong>{pass.name}</strong>
            <br />
            {quantity}매가 발급되었습니다
          </p>
          <Link to="/passes" className="btn btn--primary btn--lg">
            다른 패스 보기
          </Link>
        </div>
      </section>
    )
  }

  return (
    <section className="page purchase">
      <div className="purchase__scroll">
        <Link to="/passes" className="back-link">
          ← 패스 목록
        </Link>

        <article className="purchase-hero">
          <span className="purchase-hero__emoji" aria-hidden>
            {pass.image}
          </span>
          <div>
            <span className="purchase-hero__region">{pass.region}</span>
            <h1>{pass.name}</h1>
            <p className="purchase-hero__meta">{pass.duration}</p>
          </div>
        </article>

        <p className="purchase-desc">{pass.description}</p>

        <ul className="purchase-highlights">
          {pass.highlights.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>

        <div className="purchase-qty">
          <span>수량</span>
          <div className="quantity-control">
            <button
              type="button"
              onClick={() => setQuantity((q) => Math.max(1, q - 1))}
              aria-label="수량 감소"
            >
              −
            </button>
            <span>{quantity}</span>
            <button
              type="button"
              onClick={() => setQuantity((q) => q + 1)}
              aria-label="수량 증가"
            >
              +
            </button>
          </div>
        </div>
      </div>

      <div className="purchase-bar safe-bottom">
        <div className="purchase-bar__total">
          <span>합계</span>
          <strong>{formatPrice(total)}원</strong>
        </div>
        {!isLoggedIn ? (
          <button
            type="button"
            className="kakao-login-btn kakao-login-btn--block"
            onClick={loginWithKakao}
            disabled={loading}
          >
            {loading ? '로그인 중…' : '카카오 로그인 후 구매'}
          </button>
        ) : (
          <button
            type="button"
            className="btn btn--primary btn--lg btn--block"
            onClick={handlePurchase}
          >
            {formatPrice(total)}원 결제하기
          </button>
        )}
      </div>
    </section>
  )
}
