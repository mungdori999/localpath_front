import './CharacterAvatar.css'

export default function CharacterAvatar({ stage, happiness }) {
  const mood =
    happiness >= 70 ? 'happy' : happiness >= 40 ? 'neutral' : 'sad'

  return (
    <div className={`character-avatar character-avatar--${mood}`}>
      <div className="character-avatar__glow" aria-hidden />
      <div className="character-avatar__shadow" aria-hidden />
      <span className="character-avatar__emoji" role="img" aria-label={stage.label}>
        {stage.emoji}
      </span>
      {mood === 'happy' && (
        <span className="character-avatar__sparkle" aria-hidden>
          ✨
        </span>
      )}
    </div>
  )
}
