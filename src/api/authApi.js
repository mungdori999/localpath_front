import axios from 'axios'
import { URL } from '../data/url'
import { getAccessToken } from './token'

/** 서버 세션·refresh 쿠키 정리 */
export async function logoutOnServer() {
  const token = getAccessToken()
  try {
    await axios.post(URL.LOGOUT, null, {
      withCredentials: true,
      headers: token ? { Authorization: `Bearer ${token}` } : {},
    })
  } catch {
    // 서버 로그아웃 실패해도 클라이언트 세션은 정리
  }
}
