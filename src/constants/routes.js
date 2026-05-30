export const ROUTES = {
  HOME: '/',
  PASSES: '/passes',
  MYPAGE: '/mypage',
  SURVEY: '/survey',
  BADGES: '/badges',
  passPurchase: (passId) => `/passes/${passId}/purchase`,
  passQr: (passId) => `/mypage/passes/${passId}/qr`,
}

export function isPurchaseRoute(pathname) {
  return pathname.includes('/purchase')
}
