import './BadgeIcon.css'

export default function BadgeIcon({ badge, locked = false, className = '' }) {
  const classes = `badge-icon${locked ? ' badge-icon--locked' : ''} ${className}`.trim()

  if (!locked && badge?.image) {
    return (
      <img
        className={classes}
        src={badge.image}
        alt=""
      />
    )
  }

  return (
    <span className={classes} aria-hidden>
      {locked ? '?' : badge?.emoji || '🏅'}
    </span>
  )
}
