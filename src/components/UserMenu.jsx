import { useEffect, useRef, useState } from 'react'
import { useAuth } from '../hooks/useAuth'

function UserAvatar({ user, size = 40 }) {
  const initial = user.nickname?.charAt(0) ?? '?'

  if (user.profileImage) {
    return (
      <img
        src={user.profileImage}
        alt=""
        className="user-avatar user-avatar--img"
        width={size}
        height={size}
      />
    )
  }

  return (
    <span
      className="user-avatar user-avatar--fallback"
      style={{ width: size, height: size, fontSize: size * 0.4 }}
      aria-hidden
    >
      {initial}
    </span>
  )
}

export default function UserMenu({ user }) {
  const { logout } = useAuth()
  const [open, setOpen] = useState(false)
  const menuRef = useRef(null)

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
        aria-label={`${user.nickname} 메뉴`}
      >
        <UserAvatar user={user} />
      </button>

      {open && (
        <div className="user-menu__dropdown" role="menu">
          <p className="user-menu__name">{user.nickname}</p>
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
