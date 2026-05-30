import api from './axios'
import { URL } from '../data/url'

let visitsInFlight = null

export function fetchBadges() {
  return api.get(URL.BADGES).then((res) => res.data)
}

export function fetchMyVisits() {
  if (!visitsInFlight) {
    visitsInFlight = api.get(URL.VISITS_ME).then((res) => {
      visitsInFlight = null
      return res.data
    }).catch((err) => {
      visitsInFlight = null
      throw err
    })
  }
  return visitsInFlight
}

export function verifyVisit(spotName, lat, lng) {
  return api.post(URL.VISITS, { spotName, lat, lng }).then((res) => res.data)
}
