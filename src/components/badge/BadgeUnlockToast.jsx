import { useEffect } from 'react'
import './BadgeUnlockToast.css'

export default function BadgeUnlockToast({ badgeKeys, badges, onClose }) {
  useEffect(() => {
    if (!badgeKeys?.length) return undefined
    const timer = setTimeout(onClose, 4000)
    return () => clearTimeout(timer)
  }, [badgeKeys, onClose])

  if (!badgeKeys?.length) return null

  const unlockedBadges = badgeKeys
    .map((key) => badges?.find((b) => b.id === key))
    .filter(Boolean)

  return (
    <div className="badge-unlock-toast" role="status">
      <strong>🎉 배지 해금!</strong>
      {unlockedBadges.length > 0 ? (
        unlockedBadges.map((badge) => (
          <p key={badge.id}>
            {badge.emoji} {badge.name}
          </p>
        ))
      ) : (
        <p>새로운 배지를 획득했어요!</p>
      )}
    </div>
  )
}
