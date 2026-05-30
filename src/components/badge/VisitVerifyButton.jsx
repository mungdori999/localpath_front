import { useState } from 'react'
import { verifyVisit } from '../../api/badgesApi'
import './VisitVerifyButton.css'

export default function VisitVerifyButton({
  spotName,
  visited = false,
  onVerified,
  className = '',
}) {
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState('')

  async function handleVerify() {
    if (visited || loading) return

    if (!navigator.geolocation) {
      setMessage('위치 정보를 사용할 수 없어요')
      return
    }

    setLoading(true)
    setMessage('')

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        try {
          const result = await verifyVisit(
            spotName,
            position.coords.latitude,
            position.coords.longitude,
          )

          if (result.alreadyVisited) {
            setMessage('이미 인증한 장소예요')
          } else {
            setMessage('방문 인증 완료!')
            onVerified?.(result)
          }
        } catch (err) {
          setMessage(
            err.response?.data?.detail ?? '인증에 실패했어요. 장소 근처에서 다시 시도해 주세요.',
          )
        } finally {
          setLoading(false)
        }
      },
      () => {
        setMessage('위치 권한을 허용해 주세요')
        setLoading(false)
      },
      { enableHighAccuracy: true, timeout: 10000 },
    )
  }

  return (
    <div className={`visit-verify ${className}`.trim()}>
      <button
        type="button"
        className={`visit-verify__btn${visited ? ' visit-verify__btn--done' : ''}`}
        onClick={handleVerify}
        disabled={visited || loading}
      >
        {visited ? '인증 완료 ✓' : loading ? '인증 중…' : '방문 인증하기'}
      </button>
      {message && <p className="visit-verify__msg">{message}</p>}
    </div>
  )
}
