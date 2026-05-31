import { Link } from "react-router-dom";
import { ROUTES } from "../../constants/routes";
import { useAuth } from "../../hooks/useAuth";
import { useHomeSurvey } from "../../hooks/useHomeSurvey";
import { MSG } from "../../constants/messages";

export default function HomeRecommendation() {
  const { isLoggedIn } = useAuth();
  const { data: home, loading } = useHomeSurvey(isLoggedIn);

  if (!isLoggedIn) {
    return (
      <div className="home-rec home-rec--guest">
        <p className="home-rec__hint">
          로그인 후 간단한 설문을 하면 나에게 맞는 패스·코스를 추천해 드려요.
        </p>
      </div>
    );
  }

  if (loading) {
    return <p className="home-rec home-rec--loading">{MSG.LOADING}</p>;
  }

  if (!home?.surveyCompleted) {
    return (
      <div className="home-rec home-rec--cta">
        <h2 className="home-rec__title">나에게 맞는 코스 찾기</h2>
        <p className="home-rec__desc">
          간단한 설문으로 여유·맛집·구경·골목 중 나의 취향을 알아보고,
          데이트·외식에 맞는 패스를 추천받아 보세요.
        </p>
        <Link
          to={ROUTES.SURVEY}
          className="btn btn--primary btn--lg btn--block"
        >
          취향 설문하고 코스 추천받기
        </Link>
      </div>
    );
  }

  const rec = home.recommendation;
  const topTypes = home.typeScores?.slice(0, 2) ?? [];

  return (
    <div className="home-rec home-rec--result">
      <p className="home-rec__eyebrow">맞춤 추천</p>
      <h2 className="home-rec__title">
        {rec?.primaryTypeLabel && (
          <span className="home-rec__type">{rec.primaryTypeLabel}</span>
        )}
        에 맞는 코스
      </h2>

      {topTypes.length > 0 && (
        <ul className="home-rec__types" aria-label="취향 유형">
          {topTypes.map((t) => (
            <li key={t.type} className="home-rec__type-chip">
              {t.label}
            </li>
          ))}
        </ul>
      )}

      {rec && (
        <article className="home-rec__card">
          <span className="home-rec__pass-emoji" aria-hidden>
            {rec.passImage}
          </span>
          <div>
            <strong>{rec.passName}</strong>
            <p>
              {rec.courseEmoji} {rec.courseName}
            </p>
            <p className="home-rec__reason">{rec.reason}</p>
          </div>
        </article>
      )}

      <div className="home-rec__actions">
        <Link
          to={ROUTES.passPurchase(rec?.passId)}
          className="btn btn--primary btn--lg btn--block"
        >
          추천 코스 보러가기
        </Link>
        <Link to={ROUTES.SURVEY} className="home-rec__retry">
          취향 설문 다시 하기
        </Link>
      </div>
    </div>
  );
}
