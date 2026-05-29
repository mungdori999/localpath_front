import { STORAGE_KEYS } from '../constants/storage'

export function getAccessToken() {
  return localStorage.getItem(STORAGE_KEYS.ACCESS_TOKEN)
}

export function setAccessToken(token) {
  if (token) {
    localStorage.setItem(STORAGE_KEYS.ACCESS_TOKEN, token)
  } else {
    localStorage.removeItem(STORAGE_KEYS.ACCESS_TOKEN)
  }
}

export function clearAccessToken() {
  localStorage.removeItem(STORAGE_KEYS.ACCESS_TOKEN)
}
