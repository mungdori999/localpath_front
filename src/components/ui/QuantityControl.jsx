export default function QuantityControl({ value, onChange, min = 1 }) {
  return (
    <div className="quantity-control">
      <button
        type="button"
        onClick={() => onChange(Math.max(min, value - 1))}
        aria-label="수량 감소"
      >
        −
      </button>
      <span>{value}</span>
      <button
        type="button"
        onClick={() => onChange(value + 1)}
        aria-label="수량 증가"
      >
        +
      </button>
    </div>
  )
}
