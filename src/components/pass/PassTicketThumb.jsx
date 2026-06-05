import { getPassImageUrl } from '../../constants/passImages'
import './PassTicketThumb.css'

export default function PassTicketThumb({ passId, passImage, className = '' }) {
  const url = getPassImageUrl(passId)
  if (url) {
    return (
      <img
        className={`pass-ticket-thumb ${className}`.trim()}
        src={url}
        alt=""
      />
    )
  }
  return (
    <span className={`pass-ticket-thumb pass-ticket-thumb--emoji ${className}`.trim()} aria-hidden>
      {passImage}
    </span>
  )
}
