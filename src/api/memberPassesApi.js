import api from './axios'
import { URL } from '../data/url'

export function fetchMyPasses() {
  return api.get(URL.MY_PASSES).then((res) => res.data)
}

export function fetchMyPassTicket(ticketId) {
  return api.get(`${URL.MY_PASSES}/${ticketId}`).then((res) => res.data)
}

export function purchasePass(passId, quantity, spendingFocus) {
  return api
    .post(URL.MY_PASSES, { passId, quantity, spendingFocus })
    .then((res) => res.data)
}
