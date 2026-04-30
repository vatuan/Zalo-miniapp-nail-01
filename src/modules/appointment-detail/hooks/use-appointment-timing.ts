import { useEffect, useMemo, useState } from 'react'

import { AppointmentRecord } from '@/mocks/appointment-data'

const TICK_INTERVAL_MS = 60 * 1000

function parseAppointmentStart(appointment: AppointmentRecord): Date | null {
  const iso = `${appointment.dateIso}T${appointment.startTime}:00`
  const date = new Date(iso)
  if (Number.isNaN(date.getTime())) return null
  return date
}

export type AppointmentTiming = {
  minutesUntilStart: number | null
  isPast: boolean
  isWithin30Min: boolean
  isWithin2Hours: boolean
}

export function useAppointmentTiming(appointment: AppointmentRecord): AppointmentTiming {
  const [now, setNow] = useState(() => Date.now())

  useEffect(() => {
    const timer = window.setInterval(() => setNow(Date.now()), TICK_INTERVAL_MS)
    return () => window.clearInterval(timer)
  }, [])

  return useMemo(() => {
    const start = parseAppointmentStart(appointment)
    if (!start) {
      return { minutesUntilStart: null, isPast: false, isWithin30Min: false, isWithin2Hours: false }
    }
    const diffMin = Math.round((start.getTime() - now) / (60 * 1000))
    return {
      minutesUntilStart: diffMin,
      isPast: diffMin < 0,
      isWithin30Min: diffMin >= 0 && diffMin <= 30,
      isWithin2Hours: diffMin >= 0 && diffMin <= 120,
    }
  }, [appointment, now])
}
