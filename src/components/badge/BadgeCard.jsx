import VisitVerifyButton from './VisitVerifyButton'
import BadgeIcon from './BadgeIcon'
import './BadgeCard.css'

export default function BadgeCard({ badge, onVerified }) {
  const {
    unlocked,
    region,
    completedCount,
    totalCount,
    description,
    requirements,
    visitProgress,
  } = badge

  const visitGoalMet =
    visitProgress &&
    visitProgress.visitedCount >= visitProgress.requiredVisits

  return (
    <article
      className={`badge-card${unlocked ? ' badge-card--unlocked' : ' badge-card--locked'}`}
    >
      <div className="badge-card__main">
        <BadgeIcon
          badge={badge}
          locked={!unlocked}
          className="badge-card__emoji"
        />
        <div className="badge-card__body">
          <span className="badge-card__region">{region}</span>
          <strong className="badge-card__name">
            {unlocked ? badge.name : '???'}
          </strong>
          <p className="badge-card__desc">{description}</p>

          {visitProgress && (
            <div className="badge-card__visit-rules">
              <div className="badge-card__visit-rule">
                <span>방문 인증</span>
                <strong
                  className={
                    visitProgress.visitedCount >= visitProgress.requiredVisits
                      ? 'badge-card__visit-rule--done'
                      : ''
                  }
                >
                  {visitProgress.visitedCount}/{visitProgress.requiredVisits}곳
                </strong>
              </div>
              {!unlocked && !visitGoalMet && (
                <p className="badge-card__visit-hint">
                  아래 장소를 모두 방문하면 해금돼요.
                </p>
              )}
            </div>
          )}

          {requirements.length > 0 && (
            <ul className="badge-card__requirements-preview" aria-label="방문 인증 장소">
              {requirements.map((req) => (
                <li
                  key={req.spotName}
                  className={`badge-card__req${req.completed ? ' badge-card__req--done' : ''}`}
                >
                  <div className="badge-card__req-head">
                    <span className="badge-card__req-check" aria-hidden>
                      {req.completed ? '✓' : '○'}
                    </span>
                    <span className="badge-card__req-name">{req.spotName}</span>
                  </div>
                  {!req.completed && (
                    <VisitVerifyButton
                      spotName={req.spotName}
                      onVerified={onVerified}
                      className="badge-card__verify"
                    />
                  )}
                </li>
              ))}
            </ul>
          )}

          {totalCount > 0 && (
            <div className="badge-card__progress">
              <div
                className="badge-card__progress-bar"
                style={{
                  width: `${(completedCount / totalCount) * 100}%`,
                }}
              />
              <span className="badge-card__progress-text">
                {completedCount}/{totalCount}
              </span>
            </div>
          )}
        </div>
      </div>

      {unlocked && badge.unlockedAt && (
        <div className="badge-card__detail">
          <p className="badge-card__unlocked-at">
            {new Date(badge.unlockedAt).toLocaleDateString('ko-KR')} 해금
          </p>
        </div>
      )}
    </article>
  )
}
