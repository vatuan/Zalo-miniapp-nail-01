import React, { useMemo } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { Box, Text, useSnackbar } from 'zmp-ui'

import { useConfigurePageHeader } from '@/layouts/page-layout-context'
import { getAppointmentById } from '@/mocks/appointment-data'
import { ROUTE_PATHS } from '@/routing/paths'
import { PageHeader } from '@/shared/components'

import { BookingCodeRow } from './components/booking-code-row'
import { DetailNotFound } from './components/detail-not-found'
import { LocationSection } from './components/location-section'
import { NoteSection } from './components/note-section'
import { RemindersSection } from './components/reminders-section'
import { ServicesSection } from './components/services-section'
import { StatusBanner } from './components/status-banner'
import { StickyActionBar } from './components/sticky-action-bar'
import { TechnicianSection } from './components/technician-section'
import { TimeSection } from './components/time-section'
import { useAppointmentTiming } from './hooks/use-appointment-timing'

export function AppointmentDetailPageModule() {
  const navigate = useNavigate()
  const { id } = useParams<{ id: string }>()
  const { openSnackbar } = useSnackbar()

  const appointment = useMemo(() => (id ? getAppointmentById(id) : null), [id])

  const headerConfig = useMemo(
    () => ({
      content: (
        <Box className="w-full">
          <PageHeader title="Chi tiết lịch hẹn" onBack={() => navigate(ROUTE_PATHS.myAppointments)} />
        </Box>
      ),
    }),
    [navigate],
  )

  useConfigurePageHeader(headerConfig)

  const timing = useAppointmentTiming(
    appointment ?? {
      id: '',
      status: 'cancelled',
      dateIso: '1970-01-01',
      startTime: '00:00',
      endTime: '00:00',
      services: [],
      technicianId: null,
      technicianName: '',
      branchId: '',
      branchName: '',
      branchAddress: '',
      branchSupportsOnlineReschedule: true,
      totalPrice: 0,
      durationMin: 0,
    },
  )

  if (!appointment) {
    return (
      <Box className="flex min-h-full flex-col bg-app-bg">
        <DetailNotFound onBack={() => navigate(ROUTE_PATHS.myAppointments)} />
      </Box>
    )
  }

  const handleRebook = () => {
    navigate(ROUTE_PATHS.bookingBranch)
  }

  const handleReschedule = () => {
    navigate(ROUTE_PATHS.bookingSelectDate)
  }

  const handleCancel = () => {
    navigate(ROUTE_PATHS.appointmentCancelBase.replace(':id', appointment.id))
  }

  const handleReview = () => {
    openSnackbar({ text: `Mở form đánh giá cho lịch ${appointment.id}`, type: 'success' })
  }

  const handleOpenDirections = () => {
    if (appointment.branchMapUrl && typeof window !== 'undefined') {
      window.open(appointment.branchMapUrl, '_blank', 'noopener,noreferrer')
      return
    }
    openSnackbar({ text: 'Đang mở chỉ đường...', type: 'success' })
  }

  const handleOpenTechProfile = () => {
    openSnackbar({ text: `Xem profile ${appointment.technicianName}`, type: 'success' })
  }

  const handleContactSalon = () => {
    if (appointment.branchPhone && typeof window !== 'undefined') {
      window.location.href = `tel:${appointment.branchPhone}`
      return
    }
    openSnackbar({ text: 'Đang mở Zalo OA của salon...', type: 'success' })
  }

  return (
    <Box className="flex min-h-full flex-col bg-app-bg">
      <Box className="flex flex-1 flex-col gap-3 px-4 pt-4 pb-4">
        <StatusBanner status={appointment.status} />

        <BookingCodeRow code={appointment.id} />

        {appointment.cancelReason ? (
          <Box className="rounded-2xl bg-status-error-soft px-3 py-2">
            <Text className="text-xs text-status-error">Lý do hủy: {appointment.cancelReason}</Text>
          </Box>
        ) : null}

        <TimeSection appointment={appointment} />

        <LocationSection appointment={appointment} onOpenDirections={handleOpenDirections} />

        <ServicesSection appointment={appointment} />

        <TechnicianSection appointment={appointment} onOpenProfile={handleOpenTechProfile} />

        {appointment.note ? <NoteSection note={appointment.note} /> : null}

        <RemindersSection />

        <Box className="h-20 w-full" />
      </Box>

      <StickyActionBar
        appointment={appointment}
        timing={timing}
        onReschedule={handleReschedule}
        onCancel={handleCancel}
        onRebook={handleRebook}
        onReview={handleReview}
        onContactSalon={handleContactSalon}
      />
    </Box>
  )
}
