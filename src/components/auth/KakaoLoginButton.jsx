import { MSG } from '../../constants/messages'

function KakaoIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 18 18" fill="none" aria-hidden>
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M9 1.5C4.86 1.5 1.5 4.2 1.5 7.5c0 2.1 1.4 3.95 3.5 5.05L4.5 15l3.15-1.95c.45.08.93.12 1.35.12 4.14 0 7.5-2.7 7.5-6s-3.36-6-7.5-6z"
        fill="currentColor"
      />
    </svg>
  )
}

export default function KakaoLoginButton({
  onClick,
  loading,
  variant = 'compact',
  label,
  block = false,
  disabled,
}) {
  const isCompact = variant === 'compact'
  const classNames = [
    'kakao-login-btn',
    isCompact && 'kakao-login-btn--compact',
    block && 'kakao-login-btn--block',
  ]
    .filter(Boolean)
    .join(' ')

  const defaultLabel = isCompact
    ? loading
      ? '…'
      : '로그인'
    : loading
      ? MSG.LOGIN_LOADING
      : '카카오 로그인 후 구매'

  return (
    <button
      type="button"
      className={classNames}
      onClick={onClick}
      disabled={disabled ?? loading}
      aria-label={isCompact ? '카카오 로그인' : undefined}
    >
      {isCompact && <KakaoIcon />}
      <span className="kakao-login-btn__label">{label ?? defaultLabel}</span>
    </button>
  )
}
