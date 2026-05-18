import { Link } from 'react-router-dom'
import { passes } from '../data/passes'

function formatPrice(price) {
  return price.toLocaleString('ko-KR')
}

export default function PassSelectPage() {
  return (
    <section className="page pass-select">
      <header className="page__header">
        <h1>패스 고르기</h1>
        <p>여행할 지역의 로컬패스를 선택하세요</p>
      </header>

      <ul className="pass-list">
        {passes.map((pass) => (
          <li key={pass.id}>
            <Link
              to={`/passes/${pass.id}/purchase`}
              className="pass-card"
            >
              <span className="pass-card__emoji" aria-hidden>
                {pass.image}
              </span>
              <div className="pass-card__content">
                <span className="pass-card__region">{pass.region}</span>
                <h2>{pass.name}</h2>
                <p className="pass-card__desc">{pass.description}</p>
                <div className="pass-card__meta">
                  <span className="pass-card__duration">{pass.duration}</span>
                  <span className="pass-card__price">
                    {formatPrice(pass.price)}원
                  </span>
                </div>
              </div>
              <span className="pass-card__chevron" aria-hidden>
                ›
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </section>
  )
}
