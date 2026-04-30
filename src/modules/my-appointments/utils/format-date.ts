function pad2(n: number): string {
  return n.toString().padStart(2, '0')
}

const VIETNAMESE_WEEKDAYS = ['Chủ Nhật', 'Thứ 2', 'Thứ 3', 'Thứ 4', 'Thứ 5', 'Thứ 6', 'Thứ 7']
const VIETNAMESE_MONTHS = [
  'Tháng 1',
  'Tháng 2',
  'Tháng 3',
  'Tháng 4',
  'Tháng 5',
  'Tháng 6',
  'Tháng 7',
  'Tháng 8',
  'Tháng 9',
  'Tháng 10',
  'Tháng 11',
  'Tháng 12',
]

export function formatAppointmentDate(dateIso: string): string {
  const date = new Date(`${dateIso}T00:00:00`)
  if (Number.isNaN(date.getTime())) return dateIso
  return `${VIETNAMESE_WEEKDAYS[date.getDay()]}, ${pad2(date.getDate())}/${pad2(date.getMonth() + 1)}`
}

export function formatMonthGroup(dateIso: string): string {
  const date = new Date(`${dateIso}T00:00:00`)
  if (Number.isNaN(date.getTime())) return dateIso
  return `${VIETNAMESE_MONTHS[date.getMonth()]}, ${date.getFullYear()}`
}

export function getMonthKey(dateIso: string): string {
  return dateIso.slice(0, 7)
}
