import { getKakaoMapPlaceUrl } from '../../lib/loadKakaoMap'

const KAKAO_MAP_LINK_LABEL = '카카오맵에서 보기'

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
        <a
          href={getKakaoMapPlaceUrl(spot)}
          target="_blank"
          rel="noopener noreferrer"
        >
          {KAKAO_MAP_LINK_LABEL}
        </a>
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
        <a
          href={getKakaoMapPlaceUrl(spot)}
          target="_blank"
          rel="noopener noreferrer"
          className="course-spot__map-link"
        >
          {KAKAO_MAP_LINK_LABEL}
        </a>
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
