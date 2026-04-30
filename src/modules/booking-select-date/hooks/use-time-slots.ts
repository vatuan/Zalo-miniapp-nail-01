import { useEffect, useMemo, useState } from 'react'

import { getMockBookedSlots } from '@/mocks/service-data'

import { toIsoDate } from '../utils/date'
import { generateSlots, TimeSlot } from '../utils/slots'

const SLOT_LOAD_DURATION_MS = 300

type UseTimeSlotsArgs = {
  pickedDate: Date
  totalDurationMin: number
  selectedTimeSlot: string | null
  isHoliday: boolean
}

type UseTimeSlotsResult = {
  slots: TimeSlot[]
  isLoading: boolean
}

export function useTimeSlots({
  pickedDate,
  totalDurationMin,
  selectedTimeSlot,
  isHoliday,
}: UseTimeSlotsArgs): UseTimeSlotsResult {
  const pickedDateIso = useMemo(() => toIsoDate(pickedDate), [pickedDate])
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    setIsLoading(true)
    const timer = window.setTimeout(() => setIsLoading(false), SLOT_LOAD_DURATION_MS)
    return () => window.clearTimeout(timer)
  }, [pickedDateIso])

  const slots = useMemo(() => {
    if (isHoliday) return []
    const booked = getMockBookedSlots(pickedDateIso)
    return generateSlots(pickedDate, totalDurationMin || 60, booked, selectedTimeSlot)
  }, [isHoliday, pickedDate, pickedDateIso, selectedTimeSlot, totalDurationMin])

  return { slots, isLoading }
}
