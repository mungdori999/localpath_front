import { getDisplayName } from '../../utils/authSession'

export default function UserAvatar({
  user,
  size = 40,
  className = 'user-avatar',
}) {
  const name = getDisplayName(user)
  const initial = name.charAt(0)

  if (user?.profileImage) {
    return (
      <img
        src={user.profileImage}
        alt=""
        className={`${className} ${className}--img`}
        width={size}
        height={size}
      />
    )
  }

  return (
    <span
      className={`${className} ${className}--fallback`}
      style={{ width: size, height: size, fontSize: size * 0.4 }}
      aria-hidden
    >
      {initial}
    </span>
  )
}
