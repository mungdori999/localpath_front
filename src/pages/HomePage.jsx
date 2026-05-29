import { Link } from 'react-router-dom'
import HomeRecommendation from '../components/home/HomeRecommendation'
import { APP_TAGLINE } from '../constants/brand'
import { ROUTES } from '../constants/routes'

export default function HomePage() {
  return (
    <section className="home">
      <p className="home__eyebrow">{APP_TAGLINE}</p>
      <h1 className="home__title">
        동네 골목을 걷듯,
        <br />
        로컬을 여행하세요
      </h1>
      <p className="home__desc">
        망원동 실제 맛집·카페 코스를 카카오맵에서 확인하고, 한걸음·두걸음
        패스로 여행을 시작하세요.
      </p>

      <HomeRecommendation />

      <Link to={ROUTES.PASSES} className="btn btn--secondary btn--lg btn--block home__pass-link">
        전체 패스 둘러보기
      </Link>
    </section>
  )
}
