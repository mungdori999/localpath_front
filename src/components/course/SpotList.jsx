import { useState } from 'react'
import { getKakaoMapPlaceUrl } from '../../lib/loadKakaoMap'
import OwnerCurationModal from './OwnerCurationModal'

const KAKAO_MAP_LINK_LABEL = '카카오맵에서 보기'
const CURATION_BUTTON_LABEL = '사장님 큐레이션 보기'

function SpotActions({ spot, variant }) {
  const [curationOpen, setCurationOpen] = useState(false)
  const hasCuration = !!spot.curation

  return (
    <div
      className={
        variant === 'purchase'
          ? 'purchase-spot__actions'
          : 'course-spot__actions'
      }
    >
      {hasCuration && (
        <button
          type="button"
          className="course-spot__curation-btn"
          onClick={() => setCurationOpen(true)}
        >
          {CURATION_BUTTON_LABEL}
        </button>
      )}
      <a
        href={getKakaoMapPlaceUrl(spot)}
        target="_blank"
        rel="noopener noreferrer"
        className={variant === 'purchase' ? undefined : 'course-spot__map-link'}
      >
        {KAKAO_MAP_LINK_LABEL}
      </a>
      <OwnerCurationModal
        spot={spot}
        open={curationOpen}
        onClose={() => setCurationOpen(false)}
      />
    </div>
  )
}

function SpotListItem({ spot, index, variant }) {
  if (variant === 'purchase') {
    return (
      <li key={spot.name}>
        <div className="purchase-spot__label">
          <span className="purchase-spot__num">{index + 1}</span>
          <strong>{spot.name}</strong>
          <span>{spot.category}</span>
        </div>
        <p className="purchase-spot__address">{spot.address}</p>
        <p>{spot.note}</p>
        <SpotActions spot={spot} variant="purchase" />
      </li>
    )
  }

  return (
    <li key={spot.name} className="course-spot">
      <div className="course-spot__order">{index + 1}</div>
      <div className="course-spot__content">
        <div className="course-spot__head">
          <span className="course-spot__name">{spot.name}</span>
          <span className="course-spot__category">{spot.category}</span>
        </div>
        <p className="course-spot__address">{spot.address}</p>
        <p className="course-spot__note">{spot.note}</p>
        <SpotActions spot={spot} variant="card" />
      </div>
    </li>
  )
}

export default function SpotList({ spots, variant = 'card', className }) {
  const listClass =
    className ??
    (variant === 'purchase'
      ? 'purchase-course-card__spots'
      : 'course-block__spots')

  return (
    <ol className={listClass}>
      {spots.map((spot, index) => (
        <SpotListItem key={spot.name} spot={spot} index={index} variant={variant} />
      ))}
    </ol>
  )
}
