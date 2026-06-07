import { useCallback, useState } from 'react'
import { useBadges } from '../hooks/useBadges'
import { useVisits } from '../hooks/useVisits'
import { MSG } from '../constants/messages'
import PageHeader from '../components/ui/PageHeader'
import PageState from '../components/ui/PageState'
import BadgeCard from '../components/badge/BadgeCard'
import BadgeUnlockToast from '../components/badge/BadgeUnlockToast'
import './BadgePage.css'

export default function BadgePage() {
  const { data: badges, loading, error, reload: reloadBadges } = useBadges()
  const { reload: reloadVisits } = useVisits(true)
  const [unlockToast, setUnlockToast] = useState([])

  const unlockedCount = badges?.filter((b) => b.unlocked).length ?? 0
  const totalCount = badges?.length ?? 0

  const handleVerified = useCallback(
    async (result) => {
      await reloadVisits()
      await reloadBadges()
      if (result.newlyUnlockedBadgeIds?.length) {
        setUnlockToast(result.newlyUnlockedBadgeIds)
      }
    },
    [reloadVisits, reloadBadges],
  )

  return (
    <section className="page badge-page">
      <PageHeader
        title="배지"
        description="장소에 방문한 뒤 아래에서 방문 인증하고 배지를 모아보세요"
      />

      <p className="badge-page__highlight" role="note">
        <span className="badge-page__highlight-icon" aria-hidden>
          ✨
        </span>
        <strong>
          카페·맛집·체험·야경 등 테마별로 방문 인증하고 배지를 모아 보세요!
        </strong>
      </p>

      <PageState loading={loading} error={error} errorMessage={MSG.BADGE_FETCH_ERROR}>
        <div className="badge-page__summary">
          <strong>
            {unlockedCount}/{totalCount}
          </strong>
          <span>해금한 배지</span>
        </div>

        <div className="badge-page__grid">
          {badges?.map((badge) => (
            <BadgeCard key={badge.id} badge={badge} onVerified={handleVerified} />
          ))}
        </div>
      </PageState>

      <BadgeUnlockToast
        badgeKeys={unlockToast}
        badges={badges}
        onClose={() => setUnlockToast([])}
      />
    </section>
  )
}
