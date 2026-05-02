import React, { useEffect, useMemo } from 'react'
import { useNavigate } from 'react-router-dom'
import { Box } from 'zmp-ui'

import { useConfigurePageHeader } from '@/layouts/page-layout-context'
import { ROUTE_PATHS } from '@/routing/paths'
import { PageHeader } from '@/shared/components'
import { useBookingStore } from '@/stores/booking-store'

import { ActionButtons } from './components/action-buttons'
import { BookingReferenceCard } from './components/booking-reference-card'
import { BottomNavActions } from './components/bottom-nav-actions'
import { GalleryTeaser } from './components/gallery-teaser'
import { PointsPreview } from './components/points-preview'
import { ReminderList } from './components/reminder-list'
import { SuccessAnimation } from './components/success-animation'
import { useBookingShare } from './hooks/use-booking-share'

export function BookingSuccessPageModule() {
  const navigate = useNavigate()
  const lastConfirmedBooking = useBookingStore((state) => state.lastConfirmedBooking)

  const headerConfig = useMemo(
    () => ({
      content: (
        <Box className="w-full">
          <PageHeader title="Đặt lịch thành công" onBack={() => navigate(ROUTE_PATHS.home, { replace: true })} />
        </Box>
      ),
    }),
    [navigate],
  )

  useConfigurePageHeader(headerConfig)

  useEffect(() => {
    if (!lastConfirmedBooking) {
      navigate(ROUTE_PATHS.home, { replace: true })
    }
  }, [lastConfirmedBooking, navigate])

  const { addToCalendar, shareToZalo } = useBookingShare(lastConfirmedBooking)

  if (!lastConfirmedBooking) return null

  return (
    <Box className="flex min-h-full flex-col bg-app-bg">
      <Box className="flex flex-1 flex-col gap-4 px-4 pt-4 pb-4">
        <SuccessAnimation />

        <BookingReferenceCard booking={lastConfirmedBooking} />

        <ActionButtons onAddToCalendar={addToCalendar} onShareToZalo={shareToZalo} />

        <ReminderList />

        <PointsPreview points={lastConfirmedBooking.pendingPoints} />

        <GalleryTeaser onSeeMore={() => navigate(ROUTE_PATHS.gallery)} />

        <Box className="w-full h-4" />
      </Box>

      <BottomNavActions
        onGoHome={() => navigate(ROUTE_PATHS.home, { replace: true })}
        onViewAppointments={() => navigate(ROUTE_PATHS.myAppointments, { replace: true })}
      />
    </Box>
  )
}
