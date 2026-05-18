import { Link } from 'react-router-dom'

export default function HomePage() {
  return (
    <section className="home">
      <p className="home__eyebrow">로컬루트패스</p>
      <h1 className="home__title">
        동네 골목을 걷듯,
        <br />
        로컬을 여행하세요
      </h1>
      <p className="home__desc">
        지역 로컬 스팟·맛집·체험을 한 장의 패스로. 원하는 지역 패스를 고르고 바로
        이용하세요.
      </p>
      <Link to="/passes" className="btn btn--primary btn--lg btn--block">
        패스 고르기
      </Link>
    </section>
  )
}
