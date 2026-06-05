import { SPENDING_FOCUS_OPTIONS } from '../../constants/spendingFocus'
import './SpendingFocusPicker.css'

export default function SpendingFocusPicker({ value, onChange }) {
  return (
    <section className="spending-focus" aria-labelledby="spending-focus-title">
      <h2 id="spending-focus-title" className="spending-focus__title">
        집중형 패스 선택
      </h2>
      <p className="spending-focus__desc">
        결제 금액을 어디에 더 쓸지 골라 주세요. (데모 · 실제 분할 결제는 적용되지
        않아요)
      </p>
      <ul className="spending-focus__list" role="list">
        {SPENDING_FOCUS_OPTIONS.map((option) => {
          const selected = value === option.id
          return (
            <li key={option.id}>
              <button
                type="button"
                className={`spending-focus__card${selected ? ' spending-focus__card--selected' : ''}`}
                onClick={() => onChange(option.id)}
                aria-pressed={selected}
              >
                <img
                  className="spending-focus__img"
                  src={option.image}
                  alt=""
                />
                <span className="spending-focus__info">
                  <strong>{option.name}</strong>
                  <span>{option.splitLabel}</span>
                </span>
                <span className="spending-focus__check" aria-hidden>
                  {selected ? '✓' : ''}
                </span>
              </button>
            </li>
          )
        })}
      </ul>
    </section>
  )
}
