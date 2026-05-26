export const GROWTH_PER_FEED = 25
export const LEVEL_THRESHOLDS = [0, 100, 250, 500]

export const STAGES = [
  { level: 1, label: '알', emoji: '🥚', message: '망원의 기운을 품은 알이에요' },
  { level: 2, label: '병아리', emoji: '🐣', message: '망원동 골목을 처음 걸어요' },
  { level: 3, label: '동네 친구', emoji: '🌿', message: '망원시장 냄새를 좋아해요' },
  { level: 4, label: '망원 마스터', emoji: '⭐', message: '망원 로컬의 진짜 주민!' },
]

export const RECEIPT_ZONES = [
  { id: 'mangwon-dong', name: '망원동', emoji: '🏘️', bonus: { hunger: 25, thirst: 15, happiness: 20 } },
  { id: 'mangwon-market', name: '망원시장', emoji: '🛒', bonus: { hunger: 30, thirst: 20, happiness: 25 } },
]

export function getStageByGrowth(growth) {
  let stage = STAGES[0]
  for (let i = LEVEL_THRESHOLDS.length - 1; i >= 0; i--) {
    if (growth >= LEVEL_THRESHOLDS[i]) {
      stage = STAGES[Math.min(i, STAGES.length - 1)]
      break
    }
  }
  return stage
}

export function getGrowthProgress(growth) {
  const stage = getStageByGrowth(growth)
  const idx = STAGES.findIndex((s) => s.level === stage.level)
  const currentMin = LEVEL_THRESHOLDS[idx] ?? 0
  const nextMin = LEVEL_THRESHOLDS[idx + 1]
  if (nextMin == null) return { current: growth - currentMin, max: 1, percent: 100 }
  const max = nextMin - currentMin
  const current = growth - currentMin
  return { current, max, percent: Math.min(100, Math.round((current / max) * 100)) }
}
