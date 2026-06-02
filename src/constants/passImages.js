/** public/ 패스 썸네일 (pass.id 기준) */
export const PASS_IMAGE_BY_ID = {
  'one-step': '/pass3.png',
  'two-step': '/pass5.png',
}

export function getPassImageUrl(passId) {
  return PASS_IMAGE_BY_ID[passId] ?? null
}
