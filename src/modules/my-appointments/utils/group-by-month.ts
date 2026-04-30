import { AppointmentRecord } from '@/mocks/appointment-data'

import { formatMonthGroup, getMonthKey } from './format-date'

export type MonthGroup = {
  monthKey: string
  monthLabel: string
  appointments: AppointmentRecord[]
}

export function groupAppointmentsByMonth(
  appointments: AppointmentRecord[],
  sortDirection: 'asc' | 'desc' = 'desc',
): MonthGroup[] {
  const groups = new Map<string, AppointmentRecord[]>()
  appointments.forEach((appt) => {
    const key = getMonthKey(appt.dateIso)
    const list = groups.get(key) ?? []
    list.push(appt)
    groups.set(key, list)
  })

  const monthKeys = Array.from(groups.keys()).sort()
  if (sortDirection === 'desc') monthKeys.reverse()

  return monthKeys.map((monthKey) => {
    const items = groups.get(monthKey) ?? []
    const sorted = [...items].sort((a, b) => {
      const at = `${a.dateIso}T${a.startTime}`
      const bt = `${b.dateIso}T${b.startTime}`
      return sortDirection === 'asc' ? at.localeCompare(bt) : bt.localeCompare(at)
    })
    const firstIso = sorted[0]?.dateIso ?? `${monthKey}-01`
    return {
      monthKey,
      monthLabel: formatMonthGroup(firstIso).toUpperCase(),
      appointments: sorted,
    }
  })
}
