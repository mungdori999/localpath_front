import { useState } from 'react'
import CharacterAvatar from '../components/character/CharacterAvatar'
import StatGauge from '../components/character/StatGauge'
import ReceiptVerifySheet from '../components/character/ReceiptVerifySheet'
import { useCharacter } from '../hooks/useCharacter'
import './CharacterPage.css'

export default function CharacterPage() {
  const { character, stage, growthProgress, feedWithReceipt } = useCharacter()
  const [sheetOpen, setSheetOpen] = useState(false)
  const [toast, setToast] = useState(null)

  function handleVerified(zone) {
    feedWithReceipt(zone)
    setToast(`${zone.name} 영수증 인증! 망둥이가 배불러요 🎉`)
    setTimeout(() => setToast(null), 2800)
  }

  return (
    <section className="page character-page">
      {toast && (
        <div className="character-toast" role="status">
          {toast}
        </div>
      )}

      <header className="character-page__header">
        <div>
          <h1>{character.name}</h1>
          <p className="character-page__stage">
            Lv.{stage.level} {stage.label}
          </p>
        </div>
        <span className="character-page__feeds">먹이 {character.feedCount}회</span>
      </header>

      <CharacterAvatar stage={stage} happiness={character.happiness} />
      <p className="character-page__message">{stage.message}</p>

      <div className="character-growth">
        <div className="character-growth__head">
          <span>성장</span>
          <span>{character.growth} XP</span>
        </div>
        <div className="character-growth__track">
          <div
            className="character-growth__fill"
            style={{ width: `${growthProgress.percent}%` }}
          />
        </div>
        {growthProgress.percent < 100 && (
          <p className="character-growth__hint">
            다음 단계까지 {growthProgress.max - growthProgress.current} XP
          </p>
        )}
      </div>

      <div className="character-stats">
        <StatGauge
          label="배고픔"
          value={character.hunger}
          icon="🍙"
          color="#e8a838"
        />
        <StatGauge
          label="목마름"
          value={character.thirst}
          icon="💧"
          color="#4a9fd4"
        />
        <StatGauge
          label="행복"
          value={character.happiness}
          icon="💖"
          color="#e86b9a"
        />
      </div>

      <div className="character-tips">
        <p>💡 망원동·망원시장에서 산 물건 영수증으로 먹이를 줄 수 있어요</p>
      </div>

      <button
        type="button"
        className="btn btn--primary btn--lg btn--block character-feed-btn"
        onClick={() => setSheetOpen(true)}
      >
        먹이주기 · 영수증 인증
      </button>

      <ReceiptVerifySheet
        open={sheetOpen}
        onClose={() => setSheetOpen(false)}
        onVerified={handleVerified}
      />
    </section>
  )
}
