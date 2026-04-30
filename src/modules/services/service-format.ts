const VND_FORMATTER = new Intl.NumberFormat('vi-VN')

export function formatPrice(amount: number): string {
  if (amount <= 0) {
    return 'Liên hệ để biết giá'
  }
  return `${VND_FORMATTER.format(amount)}đ`
}

export function formatPriceShort(amount: number): string {
  return `${VND_FORMATTER.format(amount)}đ`
}

export function formatDurationRange(min: number, max: number): string {
  if (min === max) {
    return `${min} phút`
  }
  return `${min}–${max} phút`
}

export function formatDurationMinutes(totalMinutes: number): string {
  if (totalMinutes < 60) {
    return `${totalMinutes} phút`
  }
  const hours = Math.floor(totalMinutes / 60)
  const minutes = totalMinutes % 60
  if (minutes === 0) {
    return `${hours} tiếng`
  }
  return `${hours}h${minutes.toString().padStart(2, '0')}`
}

export function calcComboDiscountPercent(originalPrice: number, comboPrice: number): number {
  if (originalPrice <= 0 || comboPrice >= originalPrice) return 0
  return Math.round(((originalPrice - comboPrice) / originalPrice) * 100)
}
