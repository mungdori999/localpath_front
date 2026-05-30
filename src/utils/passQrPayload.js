export function buildPassQrPayload(pass) {
  return JSON.stringify({
    type: 'localpath-pass',
    demo: true,
    passId: pass.passId,
    passName: pass.name,
    quantity: pass.quantity,
    amount: pass.price * pass.quantity,
    ticketId: pass.ticketId ?? `LP-${pass.passId}-legacy`,
    purchasedAt: pass.purchasedAt,
  })
}
