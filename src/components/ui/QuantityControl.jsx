export default function QuantityControl({
  value,
  onChange,
  min = 1,
  max,
  onMaxReached,
}) {
  function decrease() {
    onChange(Math.max(min, value - 1))
  }

  function increase() {
    if (max != null && value >= max) {
      onMaxReached?.()
      return
    }
    onChange(value + 1)
  }

  return (
    <div className="quantity-control">
      <button
        type="button"
        onClick={decrease}
        disabled={value <= min}
        aria-label="수량 감소"
      >
        −
      </button>
      <span>{value}</span>
      <button
        type="button"
        onClick={increase}
        disabled={max != null && value >= max}
        aria-label="수량 증가"
      >
        +
      </button>
    </div>
  )
}
