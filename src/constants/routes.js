export const ROUTES = {
  HOME: '/',
  PASSES: '/passes',
  MYPAGE: '/mypage',
  SURVEY: '/survey',
  passPurchase: (passId) => `/passes/${passId}/purchase`,
}

export function isPurchaseRoute(pathname) {
  return pathname.includes('/purchase')
}
