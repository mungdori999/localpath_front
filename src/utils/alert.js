import Swal from 'sweetalert2'

const swalBase = {
  confirmButtonColor: '#1a6b4a',
  cancelButtonColor: '#73736e',
  color: '#1c1c1a',
  customClass: {
    popup: 'lp-swal-popup',
    title: 'lp-swal-title',
    htmlContainer: 'lp-swal-text',
    confirmButton: 'lp-swal-confirm',
  },
}

export function showWarning(title, text) {
  return Swal.fire({
    ...swalBase,
    icon: 'warning',
    title,
    text,
    confirmButtonText: '확인',
  })
}

export function showError(title, text) {
  return Swal.fire({
    ...swalBase,
    icon: 'error',
    title,
    text,
    confirmButtonText: '확인',
  })
}

export function showLoginRequired() {
  return Swal.fire({
    ...swalBase,
    icon: 'info',
    title: '로그인이 필요해요',
    text: '이 기능은 로그인 후 이용할 수 있어요.',
    confirmButtonText: '확인',
  })
}

export function showSurveyIncomplete(answeredCount, totalCount) {
  const remaining = totalCount - answeredCount
  return Swal.fire({
    ...swalBase,
    icon: 'warning',
    title: '설문을 완료해 주세요',
    html: `<p>총 <strong>${totalCount}</strong>문항 중 <strong>${remaining}</strong>문항이 남았어요.</p><p>모든 문항에 답해야 결과를 볼 수 있어요.</p>`,
    confirmButtonText: '확인',
  })
}

export function showMaxPurchaseLimit(maxQuantity) {
  return Swal.fire({
    ...swalBase,
    icon: 'info',
    title: '구매 수량 제한',
    text: `한 번에 최대 ${maxQuantity}매까지 구매할 수 있어요.`,
    confirmButtonText: '확인',
  })
}
