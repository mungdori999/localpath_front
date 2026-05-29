import { useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../../hooks/useAuth'
import { hasAuthSession } from '../../utils/authSession'
import { ROUTES } from '../../constants/routes'
import { MSG } from '../../constants/messages'

export default function RequireAuth({ children }) {
  const { isLoggedIn } = useAuth()
  const navigate = useNavigate()
  const alertedRef = useRef(false)

  const allowed = isLoggedIn && hasAuthSession()

  useEffect(() => {
    if (allowed) return

    if (!alertedRef.current) {
      alertedRef.current = true
      window.alert(MSG.LOGIN_REQUIRED)
    }
    navigate(ROUTES.HOME, { replace: true })
  }, [allowed, navigate])

  if (!allowed) return null

  return children
}
