import axios from 'axios'
import { logoutOnServer } from './authApi'
import api from './axios'
import { URL } from '../data/url'
import { ROUTES } from '../constants/routes'
import { clearStoredUser } from '../utils/authSession'
import { clearAccessToken, getAccessToken, setAccessToken } from './token'

let isRefreshing = false
let refreshSubscribers = []

function subscribeTokenRefresh(callback) {
  refreshSubscribers.push(callback)
}

function onRefreshed(accessToken) {
  refreshSubscribers.forEach((callback) => callback(accessToken))
  refreshSubscribers = []
}

function clearAuthAndRedirect() {
  clearAccessToken()
  clearStoredUser()
  window.location.href = ROUTES.HOME
}

api.interceptors.request.use(
  (config) => {
    const token = getAccessToken()
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
      config.headers.access = token
    }
    return config
  },
  (error) => Promise.reject(error),
)

api.interceptors.response.use(
  (response) => response,

  async (error) => {
    const originalRequest = error.config

    if (!originalRequest || originalRequest.skipAuthRetry) {
      return Promise.reject(error)
    }

    const isUnauthorized = error.response?.status === 401

    if (!isUnauthorized || originalRequest._retry) {
      return Promise.reject(error)
    }

    originalRequest._retry = true

    if (isRefreshing) {
      return new Promise((resolve) => {
        subscribeTokenRefresh((token) => {
          originalRequest.headers.Authorization = `Bearer ${token}`
          originalRequest.headers.access = token
          resolve(api(originalRequest))
        })
      })
    }

    isRefreshing = true

    try {
      const { data } = await axios.post(URL.REISSUE, null, {
        withCredentials: true,
      })

      const newAccessToken = data.accessToken

      if (!newAccessToken) {
        throw new Error('accessToken이 응답에 없습니다')
      }

      setAccessToken(newAccessToken)
      onRefreshed(newAccessToken)

      originalRequest.headers.Authorization = `Bearer ${newAccessToken}`
      originalRequest.headers.access = newAccessToken
      return api(originalRequest)
    } catch (refreshError) {
      refreshSubscribers = []
      await logoutOnServer()
      clearAuthAndRedirect()
      return Promise.reject(refreshError)
    } finally {
      isRefreshing = false
    }
  },
)
