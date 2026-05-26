import { useState } from 'react'
import { RECEIPT_ZONES } from '../../data/characterStages'
import './ReceiptVerifySheet.css'

export default function ReceiptVerifySheet({ open, onClose, onVerified }) {
  const [zoneId, setZoneId] = useState(null)
  const [file, setFile] = useState(null)
  const [preview, setPreview] = useState(null)
  const [verifying, setVerifying] = useState(false)
  const [error, setError] = useState('')

  if (!open) return null

  const zone = RECEIPT_ZONES.find((z) => z.id === zoneId)

  function handleFileChange(e) {
    const selected = e.target.files?.[0]
    setError('')
    if (!selected) return
    if (!selected.type.startsWith('image/')) {
      setError('이미지 파일만 올려주세요')
      return
    }
    setFile(selected)
    setPreview(URL.createObjectURL(selected))
  }

  async function handleVerify() {
    if (!zone) {
      setError('구매 지역을 선택해 주세요')
      return
    }
    if (!file) {
      setError('영수증 사진을 올려주세요')
      return
    }

    setVerifying(true)
    setError('')

    // TODO: 백엔드 영수증 OCR/검증 API 연동
    await new Promise((r) => setTimeout(r, 900))

    onVerified(zone)
    setZoneId(null)
    setFile(null)
    if (preview) URL.revokeObjectURL(preview)
    setPreview(null)
    setVerifying(false)
    onClose()
  }

  function handleClose() {
    if (preview) URL.revokeObjectURL(preview)
    setZoneId(null)
    setFile(null)
    setPreview(null)
    setError('')
    onClose()
  }

  return (
    <div className="receipt-sheet" role="dialog" aria-modal="true" aria-labelledby="receipt-title">
      <button
        type="button"
        className="receipt-sheet__backdrop"
        onClick={handleClose}
        aria-label="닫기"
      />
      <div className="receipt-sheet__panel safe-bottom">
        <div className="receipt-sheet__handle" aria-hidden />
        <h2 id="receipt-title" className="receipt-sheet__title">
          영수증 인증하기
        </h2>
        <p className="receipt-sheet__desc">
          망원동·망원시장에서 구매한 영수증을 올리면 망둥이에게 먹이를 줄 수 있어요
        </p>

        <p className="receipt-sheet__label">어디서 구매했나요?</p>
        <div className="receipt-zones">
          {RECEIPT_ZONES.map((z) => (
            <button
              key={z.id}
              type="button"
              className={`receipt-zone${zoneId === z.id ? ' receipt-zone--active' : ''}`}
              onClick={() => setZoneId(z.id)}
            >
              <span className="receipt-zone__emoji" aria-hidden>
                {z.emoji}
              </span>
              <span>{z.name}</span>
            </button>
          ))}
        </div>

        <label className="receipt-upload">
          <input
            type="file"
            accept="image/*"
            capture="environment"
            onChange={handleFileChange}
            hidden
          />
          {preview ? (
            <img src={preview} alt="영수증 미리보기" className="receipt-upload__preview" />
          ) : (
            <span className="receipt-upload__placeholder">
              <span aria-hidden>📷</span>
              영수증 사진 올리기
            </span>
          )}
        </label>

        {error && <p className="receipt-sheet__error">{error}</p>}

        <button
          type="button"
          className="btn btn--primary btn--lg btn--block"
          onClick={handleVerify}
          disabled={verifying}
        >
          {verifying ? '인증 중…' : '먹이 주기 🍙'}
        </button>
      </div>
    </div>
  )
}
