import api from './axios'
import { URL } from '../data/url'

/** StrictMode 등으로 동시에 호출돼도 네트워크 요청은 한 번만 나가도록 공유 */
let passesInFlight = null

export function fetchPasses(config) {
  if (!passesInFlight) {
    passesInFlight = api
      .get(URL.PASSES, config)
      .then((res) => res.data)
      .finally(() => {
        passesInFlight = null
      })
  }
  return passesInFlight
}

const passByIdInFlight = new Map()

export function fetchPassById(passId, config) {
  const key = String(passId)
  if (!passByIdInFlight.has(key)) {
    const promise = api
      .get(`${URL.PASSES}/${passId}`, config)
      .then((res) => res.data)
      .finally(() => {
        passByIdInFlight.delete(key)
      })
    passByIdInFlight.set(key, promise)
  }
  return passByIdInFlight.get(key)
}

