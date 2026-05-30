import { STORAGE_KEYS } from '../constants/storage'

export function getPurchasedPasses() {
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.PURCHASED_PASSES)
    return raw ? JSON.parse(raw) : []
  } catch {
    return []
  }
}

export function getPurchasedPassById(passId) {
  return getPurchasedPasses().find((p) => p.passId === passId) ?? null
}

export function addPurchasedPass(pass, quantity = 1) {
  const existing = getPurchasedPasses()
  const entry = {
    passId: pass.id,
    name: pass.name,
    image: pass.image,
    price: pass.price,
    quantity,
    ticketId: `LP-${pass.id}-${Date.now()}`,
    purchasedAt: new Date().toISOString(),
  }
  const next = [
    ...existing.filter((p) => p.passId !== pass.id),
    entry,
  ]
  localStorage.setItem(STORAGE_KEYS.PURCHASED_PASSES, JSON.stringify(next))
  return next
}

export function hasPurchasedPass(passId) {
  return getPurchasedPasses().some((p) => p.passId === passId)
}
