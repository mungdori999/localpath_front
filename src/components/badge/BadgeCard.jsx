import { useState } from 'react'
import VisitVerifyButton from './VisitVerifyButton'
import './BadgeCard.css'

export default function BadgeCard({ badge, onVerified }) {
  const { unlocked, region, completedCount, totalCount, description, requirements } =
    badge

  return (
    <article
      className={`badge-card${unlocked ? ' badge-card--unlocked' : ' badge-card--locked'}`}
    >
      <div className="badge-card__main">
        <span className="badge-card__emoji" aria-hidden>
          {unlocked ? badge.emoji : '?'}
        </span>
        <div className="badge-card__body">
          <span className="badge-card__region">{region}</span>
          <strong className="badge-card__name">
            {unlocked ? badge.name : '???'}
          </strong>
          <p className="badge-card__desc">{description}</p>
          <ul className="badge-card__requirements-preview" aria-label="해금 조건">
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
          <div className="badge-card__progress">
            <div
              className="badge-card__progress-bar"
              style={{
                width: `${totalCount ? (completedCount / totalCount) * 100 : 0}%`,
              }}
            />
            <span className="badge-card__progress-text">
              {completedCount}/{totalCount}
            </span>
          </div>
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
