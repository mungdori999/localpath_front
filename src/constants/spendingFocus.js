/** 결제 금액 사용 비율(데모) — 실제 분할 결제는 미구현 */
export const SPENDING_FOCUS_OPTIONS = [
  {
    id: 'route1',
    image: '/route1.png',
    name: '망리단길 집중형',
    splitLabel: '망리단길 70% · 망원시장 30%',
    mangriPercent: 70,
    marketPercent: 30,
  },
  {
    id: 'route2',
    image: '/route2.png',
    name: '균형형',
    splitLabel: '망리단길 50% · 망원시장 50%',
    mangriPercent: 50,
    marketPercent: 50,
  },
  {
    id: 'route3',
    image: '/route3.png',
    name: '망원시장 집중형',
    splitLabel: '망리단길 30% · 망원시장 70%',
    mangriPercent: 30,
    marketPercent: 70,
  },
]

export function getSpendingFocusById(id) {
  return SPENDING_FOCUS_OPTIONS.find((o) => o.id === id) ?? null
}

/** 집중형 비율로 지역별 사용 가능 잔액(데모 · 미사용 시 전액) */
export function getSpendingBalances(unitPrice, spendingFocusId) {
  const focus = getSpendingFocusById(spendingFocusId)
  if (!focus || !unitPrice) return null

  const mangri = Math.round((unitPrice * focus.mangriPercent) / 100)
  const market = unitPrice - mangri

  return {
    total: unitPrice,
    mangri,
    market,
    mangriPercent: focus.mangriPercent,
    marketPercent: focus.marketPercent,
  }
}
