export default function StatGauge({ label, value, icon, color }) {
  const level =
    value >= 70 ? 'good' : value >= 40 ? 'ok' : 'low'

  return (
    <div className={`stat-gauge stat-gauge--${level}`}>
      <div className="stat-gauge__head">
        <span className="stat-gauge__icon" aria-hidden>
          {icon}
        </span>
        <span className="stat-gauge__label">{label}</span>
        <span className="stat-gauge__value">{value}%</span>
      </div>
      <div className="stat-gauge__track">
        <div
          className="stat-gauge__fill"
          style={{ width: `${value}%`, background: color }}
        />
      </div>
    </div>
  )
}
