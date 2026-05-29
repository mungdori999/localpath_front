import { useEffect, useRef, useState } from 'react'
import { useAuth } from '../hooks/useAuth'
import { getDisplayName } from '../utils/authSession'
import UserAvatar from './ui/UserAvatar'

export default function UserMenu({ user }) {
  const { logout } = useAuth()
  const [open, setOpen] = useState(false)
  const menuRef = useRef(null)
  const displayName = getDisplayName(user)

  useEffect(() => {
    function handleClickOutside(e) {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  return (
    <div className="user-menu" ref={menuRef}>
      <button
        type="button"
        className="user-menu__trigger"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        aria-haspopup="menu"
        aria-label={`${displayName} 메뉴`}
      >
        <UserAvatar user={user} />
      </button>

      {open && (
        <div className="user-menu__dropdown" role="menu">
          <p className="user-menu__name">{displayName}</p>
          <button
            type="button"
            className="user-menu__logout"
            role="menuitem"
            onClick={() => {
              logout()
              setOpen(false)
            }}
          >
            로그아웃
          </button>
        </div>
      )}
    </div>
  )
}
