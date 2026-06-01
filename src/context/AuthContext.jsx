import { useCallback, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { logoutOnServer } from '../api/authApi'
import { clearAccessToken } from '../api/token'
import { URL } from '../data/url'
import { ROUTES } from '../constants/routes'
import { resolveInitialUser, setStoredUser } from '../utils/authSession'
import { AuthContext } from './auth-state'

export function AuthProvider({ children }) {
  const navigate = useNavigate()
  const [user, setUser] = useState(resolveInitialUser)
  const [loading, setLoading] = useState(false)

  const persistUser = useCallback((nextUser) => {
    setUser(nextUser)
    setStoredUser(nextUser)
  }, [])

  const loginWithKakao = useCallback(() => {
    setLoading(true)
    window.location.href = URL.KAKAO_OAUTH
  }, [])

  const logout = useCallback(async () => {
    setLoading(true)
    try {
      await logoutOnServer()
    } finally {
      navigate(ROUTES.HOME, { replace: true })
      clearAccessToken()
      persistUser(null)
      setLoading(false)
    }
  }, [persistUser, navigate])

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        loginWithKakao,
        logout,
        isLoggedIn: !!user,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}
