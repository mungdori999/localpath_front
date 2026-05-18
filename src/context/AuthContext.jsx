import { useCallback, useEffect, useState } from 'react'
import { AuthContext } from './auth-state'

const STORAGE_KEY = 'localpath_user'

function loadStoredUser() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    return raw ? JSON.parse(raw) : null
  } catch {
    return null
  }
}

function initKakao() {
  const key = import.meta.env.VITE_KAKAO_JS_KEY
  if (!key || !window.Kakao) return false
  if (!window.Kakao.isInitialized()) {
    window.Kakao.init(key)
  }
  return window.Kakao.isInitialized()
}

export function AuthProvider({ children }) {
  const [user, setUser] = useState(loadStoredUser)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    initKakao()
  }, [])

  const persistUser = useCallback((nextUser) => {
    setUser(nextUser)
    if (nextUser) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(nextUser))
    } else {
      localStorage.removeItem(STORAGE_KEY)
    }
  }, [])

  const loginWithKakao = useCallback(() => {
    setLoading(true)

    const key = import.meta.env.VITE_KAKAO_JS_KEY
    if (!key || !initKakao()) {
      persistUser({
        id: 'dev-user',
        nickname: '로컬러',
        profileImage: null,
      })
      setLoading(false)
      return
    }

    window.Kakao.Auth.login({
      success: () => {
        window.Kakao.API.request({
          url: '/v2/user/me',
          success: (res) => {
            const profile = res.kakao_account?.profile
            persistUser({
              id: String(res.id),
              nickname: profile?.nickname ?? '사용자',
              profileImage: profile?.profile_image_url ?? null,
            })
            setLoading(false)
          },
          fail: () => {
            setLoading(false)
          },
        })
      },
      fail: () => {
        setLoading(false)
      },
    })
  }, [persistUser])

  const logout = useCallback(() => {
    const key = import.meta.env.VITE_KAKAO_JS_KEY
    if (key && window.Kakao?.Auth?.getAccessToken()) {
      window.Kakao.Auth.logout()
    }
    persistUser(null)
  }, [persistUser])

  return (
    <AuthContext.Provider
      value={{ user, loading, loginWithKakao, logout, isLoggedIn: !!user }}
    >
      {children}
    </AuthContext.Provider>
  )
}
