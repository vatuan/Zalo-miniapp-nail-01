const REVIEW_COUNT_FORMATTER = new Intl.NumberFormat('vi-VN')

export function formatRatingAvg(avg: number): string {
  return avg.toFixed(1).replace('.', ',')
}

export function formatReviewCount(count: number): string {
  return REVIEW_COUNT_FORMATTER.format(count)
}

export function formatReviewDate(iso: string): string {
  const date = new Date(`${iso}T00:00:00`)
  if (Number.isNaN(date.getTime())) return iso
  return date.toLocaleDateString('vi-VN', { day: '2-digit', month: '2-digit', year: 'numeric' })
}
