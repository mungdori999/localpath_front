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
          로그인 후 설문을 완료하면 나에게 맞는 패스·코스를 추천해 드려요.
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
        <h2 className="home-rec__title">나만의 루트 찾기</h2>
        <p className="home-rec__desc">
          간단한 설문으로 힐링·먹거리·체험·야경 중 나의 여행 유형을 알아보고,
          맞춤 패스를 추천받아 보세요.
        </p>
        <Link
          to={ROUTES.SURVEY}
          className="btn btn--primary btn--lg btn--block"
        >
          설문조사 하고 루트 추천받기
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
        을 위한 코스
      </h2>

      {topTypes.length > 0 && (
        <ul className="home-rec__types" aria-label="여행 유형">
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
          설문 다시 하기
        </Link>
      </div>
    </div>
  );
}
