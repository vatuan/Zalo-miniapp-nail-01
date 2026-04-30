import { DayPart, SALON_HOURS } from '@/mocks/service-data'

import { pad2, toIsoDate } from './date'

export type SlotStatus = 'available' | 'booked' | 'selected' | 'too-late'

export type TimeSlot = {
  value: string
  hour: number
  minute: number
  status: SlotStatus
  dayPart: DayPart
  reason?: string
}

export function getDayPart(hour: number): DayPart {
  if (hour < 12) return 'morning'
  if (hour < 18) return 'afternoon'
  return 'evening'
}

export function generateSlots(
  date: Date,
  totalDurationMin: number,
  bookedSlots: string[],
  selectedSlot: string | null,
): TimeSlot[] {
  const slots: TimeSlot[] = []
  const { openHour, closeHour, slotIntervalMin } = SALON_HOURS
  const closeMinutes = closeHour * 60
  const now = new Date()
  const isToday = toIsoDate(date) === toIsoDate(now)
  const nowMinutes = now.getHours() * 60 + now.getMinutes()

  for (let hour = openHour; hour < closeHour; hour += 1) {
    for (let minute = 0; minute < 60; minute += slotIntervalMin) {
      const slotMinutes = hour * 60 + minute
      const value = `${pad2(hour)}:${pad2(minute)}`
      const isBooked = bookedSlots.includes(value)
      const isPast = isToday && slotMinutes <= nowMinutes
      const endsAfterClose = slotMinutes + totalDurationMin > closeMinutes

      let status: SlotStatus = 'available'
      let reason: string | undefined

      if (selectedSlot === value) {
        status = 'selected'
      } else if (isBooked || isPast) {
        status = 'booked'
        reason = isPast ? 'Đã qua giờ' : 'Khung giờ đã kín'
      } else if (endsAfterClose) {
        status = 'too-late'
        reason = `Không đủ thời gian cho dịch vụ (${totalDurationMin} phút) trước giờ đóng cửa`
      }

      slots.push({ value, hour, minute, status, dayPart: getDayPart(hour), reason })
    }
  }

  return slots
}

export function hasAvailability(slots: TimeSlot[]): boolean {
  return slots.some((s) => s.status === 'available' || s.status === 'selected')
}
