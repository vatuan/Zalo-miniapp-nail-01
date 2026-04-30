import { AppointmentRecord, CANCEL_FEE_PERCENT, CANCEL_FREE_HOURS } from '@/mocks/appointment-data'

export type CancelPolicyResult = {
  isFree: boolean
  feeAmount: number
  feePercent: number
  minutesRemaining: number
  isPast: boolean
}

function parseAppointmentStart(appointment: AppointmentRecord): Date | null {
  const iso = `${appointment.dateIso}T${appointment.startTime}:00`
  const date = new Date(iso)
  if (Number.isNaN(date.getTime())) return null
  return date
}

export function computeCancelPolicy(appointment: AppointmentRecord, now: number): CancelPolicyResult {
  const start = parseAppointmentStart(appointment)
  if (!start) {
    return { isFree: true, feeAmount: 0, feePercent: 0, minutesRemaining: 0, isPast: false }
  }
  const minutesRemaining = Math.round((start.getTime() - now) / (60 * 1000))
  const isPast = minutesRemaining < 0
  const isWithinFreeWindow = minutesRemaining >= CANCEL_FREE_HOURS * 60
  const feeAmount = isWithinFreeWindow ? 0 : Math.floor((appointment.totalPrice * CANCEL_FEE_PERCENT) / 100)
  return {
    isFree: isWithinFreeWindow && !isPast,
    feeAmount,
    feePercent: CANCEL_FEE_PERCENT,
    minutesRemaining,
    isPast,
  }
}

export function formatRemainingTime(minutes: number): string {
  if (minutes < 0) return 'Đã qua giờ hẹn'
  if (minutes < 60) return `${minutes} phút`
  const hours = Math.floor(minutes / 60)
  const mins = minutes % 60
  if (mins === 0) return `${hours} giờ`
  return `${hours} giờ ${mins} phút`
}
