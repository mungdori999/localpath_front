import { useEffect } from 'react'
import './OwnerCurationModal.css'

export default function OwnerCurationModal({ spot, open, onClose }) {
  const curation = spot?.curation

  useEffect(() => {
    if (!open) return undefined

    function onKeyDown(e) {
      if (e.key === 'Escape') onClose()
    }

    document.body.style.overflow = 'hidden'
    window.addEventListener('keydown', onKeyDown)

    return () => {
      document.body.style.overflow = ''
      window.removeEventListener('keydown', onKeyDown)
    }
  }, [open, onClose])

  if (!open || !curation) return null

  return (
    <div
      className="owner-curation-backdrop"
      role="presentation"
      onClick={onClose}
    >
      <div
        className="owner-curation-modal"
        role="dialog"
        aria-modal="true"
        aria-labelledby="owner-curation-title"
        onClick={(e) => e.stopPropagation()}
      >
        <header className="owner-curation-modal__head">
          <span className="owner-curation-modal__badge" aria-hidden>
            👨‍🍳
          </span>
          <div>
            <p className="owner-curation-modal__label">{curation.ownerTitle}</p>
            <h2 id="owner-curation-title">{spot.name}</h2>
            <p className="owner-curation-modal__category">{spot.category}</p>
          </div>
          <button
            type="button"
            className="owner-curation-modal__close"
            onClick={onClose}
            aria-label="닫기"
          >
            ×
          </button>
        </header>

        <dl className="owner-curation-modal__body">
          <div className="owner-curation-modal__row">
            <dt>대표 메뉴</dt>
            <dd>{curation.signatureMenu}</dd>
          </div>
          <div className="owner-curation-modal__row">
            <dt>방문 추천 시간</dt>
            <dd>{curation.recommendedVisitTime}</dd>
          </div>
          <div className="owner-curation-modal__row owner-curation-modal__row--tip">
            <dt>숨은 팁</dt>
            <dd>{curation.hiddenTip}</dd>
          </div>
        </dl>

        <footer className="owner-curation-modal__foot">
          <button type="button" className="btn btn--primary btn--block" onClick={onClose}>
            확인
          </button>
        </footer>
      </div>
    </div>
  )
}
