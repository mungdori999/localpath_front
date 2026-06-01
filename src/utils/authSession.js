import { jwtDecode } from 'jwt-decode'
import { STORAGE_KEYS } from '../constants/storage'
import { MSG } from '../constants/messages'
import { ROUTES } from '../constants/routes'
import { clearAccessToken, getAccessToken, setAccessToken } from '../api/token'

export function getStoredUser() {
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.USER)
    return raw ? JSON.parse(raw) : null
  } catch {
    return null
  }
}

export function setStoredUser(user) {
  if (user) {
    localStorage.setItem(STORAGE_KEYS.USER, JSON.stringify(user))
  } else {
    localStorage.removeItem(STORAGE_KEYS.USER)
  }
}

export function clearStoredUser() {
  localStorage.removeItem(STORAGE_KEYS.USER)
}

export function userFromAccessToken(accessToken) {
  const decodedUser = jwtDecode(accessToken)
  return { ...decodedUser, accessToken }
}

export function saveAccessTokenSession(accessToken) {
  setAccessToken(accessToken)
  const user = userFromAccessToken(accessToken)
  setStoredUser(user)
  return user
}

/** accessToken과 user 정보가 모두 있을 때만 로그인 상태 */
export function hasAuthSession() {
  return !!(getAccessToken() && getStoredUser())
}

export function getDisplayName(user) {
  if (!user) return MSG.DEFAULT_USER_NAME
  return user.name ?? user.nickname ?? user.email ?? MSG.DEFAULT_USER_NAME
}

function consumeOauthRedirectToken() {
  const params = new URLSearchParams(window.location.search)
  const oauthToken = params.get('access')
  if (!oauthToken) return null

  window.history.replaceState({}, document.title, ROUTES.HOME)
  try {
    return saveAccessTokenSession(oauthToken)
  } catch {
    clearAccessToken()
    return null
  }
}

/** AuthProvider 초기 user 복원 */
export function resolveInitialUser() {
  const fromOAuth = consumeOauthRedirectToken()
  if (fromOAuth) return fromOAuth

  const stored = getStoredUser()
  if (stored) return stored

  const token = getAccessToken()
  if (!token) return null

  try {
    return saveAccessTokenSession(token)
  } catch {
    clearAccessToken()
    return null
  }
}
