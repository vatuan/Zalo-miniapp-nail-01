function pad2(n: number): string {
  return n.toString().padStart(2, '0')
}

const VIETNAMESE_WEEKDAYS = ['Chủ Nhật', 'Thứ 2', 'Thứ 3', 'Thứ 4', 'Thứ 5', 'Thứ 6', 'Thứ 7']

export function formatBookingDate(dateIso: string | null): string {
  if (!dateIso) return '—'
  const date = new Date(`${dateIso}T00:00:00`)
  if (Number.isNaN(date.getTime())) return '—'
  return `${VIETNAMESE_WEEKDAYS[date.getDay()]}, ${pad2(date.getDate())}/${pad2(date.getMonth() + 1)}`
}

export function formatBookingDateLong(dateIso: string | null): string {
  if (!dateIso) return '—'
  const date = new Date(`${dateIso}T00:00:00`)
  if (Number.isNaN(date.getTime())) return '—'
  return `${VIETNAMESE_WEEKDAYS[date.getDay()]}, ${pad2(date.getDate())}/${pad2(date.getMonth() + 1)}/${date.getFullYear()}`
}
