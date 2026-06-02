export function buildPassQrPayload(ticket) {
  return JSON.stringify({
    type: 'localpath-pass',
    demo: true,
    ticketId: ticket.ticketId,
    passId: ticket.passId,
    passName: ticket.passName,
    amount: ticket.unitPrice,
    purchasedAt: ticket.purchasedAt,
    expiresAt: ticket.expiresAt,
  })
}

const KOREA_TZ = 'Asia/Seoul'

export function formatExpiresAt(expiresAt) {
  return new Date(expiresAt).toLocaleString('ko-KR', {
    timeZone: KOREA_TZ,
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  })
}

export function formatRemainingTime(expiresAt) {
  const diff = new Date(expiresAt).getTime() - Date.now()
  if (diff <= 0) return '만료됨'

  const hours = Math.floor(diff / (1000 * 60 * 60))
  const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60))
  if (hours > 0) return `${hours}시간 ${minutes}분 남음`
  return `${minutes}분 남음`
}
