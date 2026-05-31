export const ROUTES = {
  HOME: '/',
  PASSES: '/passes',
  MYPAGE: '/mypage',
  SURVEY: '/survey',
  BADGES: '/badges',
  passPurchase: (passId) => `/passes/${passId}/purchase`,
  passTicketQr: (ticketId) => `/mypage/tickets/${ticketId}/qr`,
}

export function isPurchaseRoute(pathname) {
  return pathname.includes('/purchase')
}
