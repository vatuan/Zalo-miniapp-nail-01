import React, { useEffect, useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Box, useSnackbar } from 'zmp-ui'

import { useConfigurePageHeader } from '@/layouts/page-layout-context'
import { getHolidayLabel } from '@/mocks/service-data'
import { ROUTE_PATHS } from '@/routing/paths'
import { BookingProgressBar, PageHeader } from '@/shared/components'
import { useBookingStore } from '@/stores/booking-store'

import { CalendarSection } from './components/calendar-section'
import { ContinueBar } from './components/continue-bar'
import { TimeSlotsSection } from './components/time-slots-section'
import { useTimeSlots } from './hooks/use-time-slots'
import { startOfDay, toIsoDate } from './utils/date'
import { hasAvailability, TimeSlot } from './utils/slots'

export function BookingSelectDatePageModule() {
  const navigate = useNavigate()
  const { openSnackbar } = useSnackbar()

  const selectedServices = useBookingStore((state) => state.selectedServices)
  const selectedTechnicianId = useBookingStore((state) => state.selectedTechnicianId)
  const selectedDateIso = useBookingStore((state) => state.selectedDateIso)
  const selectedTimeSlot = useBookingStore((state) => state.selectedTimeSlot)
  const setSelectedDateIso = useBookingStore((state) => state.setSelectedDateIso)
  const setSelectedTimeSlot = useBookingStore((state) => state.setSelectedTimeSlot)

  const today = useMemo(() => startOfDay(new Date()), [])
  const initialDate = useMemo(() => {
    if (selectedDateIso) {
      const d = new Date(`${selectedDateIso}T00:00:00`)
      if (!Number.isNaN(d.getTime())) return d
    }
    return today
  }, [selectedDateIso, today])

  const [pickedDate, setPickedDate] = useState<Date>(initialDate)

  const headerConfig = useMemo(
    () => ({
      content: (
        <Box className="w-full">
          <PageHeader title="Chọn ngày & giờ" onBack={() => navigate(ROUTE_PATHS.bookingTechnician)} />
          <BookingProgressBar currentStep={4} totalSteps={5} />
        </Box>
      ),
    }),
    [navigate],
  )

  useConfigurePageHeader(headerConfig)

  const totalDurationMin = useMemo(
    () => selectedServices.reduce((sum, s) => sum + s.durationMin, 0),
    [selectedServices],
  )

  const pickedDateIso = useMemo(() => toIsoDate(pickedDate), [pickedDate])
  const holidayLabel = useMemo(() => getHolidayLabel(pickedDateIso), [pickedDateIso])

  useEffect(() => {
    setSelectedDateIso(pickedDateIso)
  }, [pickedDateIso, setSelectedDateIso])

  const { slots, isLoading } = useTimeSlots({
    pickedDate,
    totalDurationMin,
    selectedTimeSlot,
    isHoliday: !!holidayLabel,
  })

  const hasAnyAvailable = hasAvailability(slots)
  const isCtaEnabled = !!selectedTimeSlot && !holidayLabel

  const handleSelectDate = (date: Date) => {
    setPickedDate(startOfDay(date))
    setSelectedTimeSlot(null)
  }

  const handleSelectSlot = (slot: TimeSlot) => {
    if (slot.status === 'booked' || slot.status === 'too-late') {
      if (slot.reason) {
        openSnackbar({ text: slot.reason, type: 'warning' })
      }
      return
    }
    if (slot.status === 'selected') {
      setSelectedTimeSlot(null)
      return
    }
    setSelectedTimeSlot(slot.value)
  }

  const handleContinue = () => {
    if (!isCtaEnabled) return
    if (selectedTechnicianId && !hasAnyAvailable) {
      openSnackbar({ text: 'Tất cả KTV đã kín khung giờ này', type: 'warning' })
      return
    }
    navigate(ROUTE_PATHS.bookingConfirm)
  }

  return (
    <Box className="flex min-h-full flex-col bg-app-bg">
      <Box className="flex flex-1 flex-col gap-5 px-4 pt-3 pb-4">
        <CalendarSection
          pickedDate={pickedDate}
          today={today}
          holidayLabel={holidayLabel}
          onSelectDate={handleSelectDate}
        />

        <TimeSlotsSection
          pickedDate={pickedDate}
          totalDurationMin={totalDurationMin}
          slots={slots}
          isLoading={isLoading}
          isHoliday={!!holidayLabel}
          hasAnyAvailable={hasAnyAvailable}
          onSelect={handleSelectSlot}
        />

        <Box className="h-16 w-full" />
      </Box>

      <ContinueBar isEnabled={isCtaEnabled} onContinue={handleContinue} />
    </Box>
  )
}
