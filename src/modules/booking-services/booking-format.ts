/**
 * Booking-specific formatting helpers (price, duration).
 * Kept inside the module to avoid leaking feature concerns into src/utils.
 */

const VND_FORMATTER = new Intl.NumberFormat('vi-VN')

export function formatPriceVnd(amount: number): string {
  if (amount <= 0) {
    return 'Liên hệ để biết giá'
  }
  return `${VND_FORMATTER.format(amount)}đ`
}

export function formatPriceVndShort(amount: number): string {
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
