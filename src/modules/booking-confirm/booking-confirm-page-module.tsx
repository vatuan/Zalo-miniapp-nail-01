import React, { useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Box, useSnackbar } from 'zmp-ui'

import { useConfigurePageHeader } from '@/layouts/page-layout-context'
import { mockTechnicians } from '@/mocks/technician-data'
import { getPointsDiscountAmount, USER_AVAILABLE_POINTS } from '@/mocks/voucher-data'
import { ROUTE_PATHS } from '@/routing/paths'
import { BookingProgressBar, PageHeader } from '@/shared/components'
import { useAuthStore } from '@/stores/auth-store'
import { ConfirmedBooking, useBookingStore } from '@/stores/booking-store'

import { AuthRequiredModal } from './components/auth-required-modal'
import { ConfirmBar } from './components/confirm-bar'
import { NoteInput } from './components/note-input'
import { PointsToggle } from './components/points-toggle'
import { PolicyAccordion } from './components/policy-accordion'
import { PriceBreakdown } from './components/price-breakdown'
import { SummaryCard } from './components/summary-card'
import { VoucherSection } from './components/voucher-section'
import { useVoucher } from './hooks/use-voucher'

const ANY_TECH_ID = '__any__'
const SUBMIT_DURATION_MS = 1500
const SLOT_TAKEN_FAILURE_RATE = 0

export function BookingConfirmPageModule() {
  const navigate = useNavigate()
  const { openSnackbar } = useSnackbar()

  const isAuthenticated = useAuthStore((state) => state.isAuthenticated)

  const selectedBranch = useBookingStore((state) => state.selectedBranch)
  const selectedServices = useBookingStore((state) => state.selectedServices)
  const selectedTechnicianId = useBookingStore((state) => state.selectedTechnicianId)
  const selectedDateIso = useBookingStore((state) => state.selectedDateIso)
  const selectedTimeSlot = useBookingStore((state) => state.selectedTimeSlot)
  const clearBooking = useBookingStore((state) => state.clearBooking)
  const setLastConfirmedBooking = useBookingStore((state) => state.setLastConfirmedBooking)

  const [note, setNote] = useState('')
  const [isUsingPoints, setIsUsingPoints] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [authModalMode, setAuthModalMode] = useState<'login' | 'phone' | null>(null)

  const headerConfig = useMemo(
    () => ({
      content: (
        <Box className="w-full">
          <PageHeader title="Xác nhận đặt lịch" onBack={() => navigate(ROUTE_PATHS.bookingSelectDate)} />
          <BookingProgressBar currentStep={5} totalSteps={5} />
        </Box>
      ),
    }),
    [navigate],
  )

  useConfigurePageHeader(headerConfig)

  const technicianName = useMemo(() => {
    if (!selectedTechnicianId) return '—'
    if (selectedTechnicianId === ANY_TECH_ID) return 'Bất kỳ KTV nào'
    return mockTechnicians.find((t) => t.id === selectedTechnicianId)?.name ?? '—'
  }, [selectedTechnicianId])

  const totalDurationMin = useMemo(
    () => selectedServices.reduce((sum, s) => sum + s.durationMin, 0),
    [selectedServices],
  )

  const baseAmount = useMemo(() => selectedServices.reduce((sum, s) => sum + s.price, 0), [selectedServices])

  const voucher = useVoucher({ services: selectedServices, baseAmount })
  const voucherDiscount = voucher.status.state === 'valid' ? voucher.status.discountAmount : 0
  const voucherLabel = voucher.status.state === 'valid' ? voucher.status.voucher.label : null

  const pointsDiscount = isUsingPoints ? getPointsDiscountAmount(USER_AVAILABLE_POINTS) : 0

  const total = Math.max(baseAmount - voucherDiscount - pointsDiscount, 0)

  const isReady =
    !!selectedBranch && selectedServices.length > 0 && !!selectedTechnicianId && !!selectedDateIso && !!selectedTimeSlot

  const handleConfirm = () => {
    if (!isReady || isSubmitting) return

    // if (!isAuthenticated) {
    //   setAuthModalMode('login')
    //   return
    // }

    if (isAuthenticated) {
      setAuthModalMode('login')
      return
    }

    setIsSubmitting(true)

    window.setTimeout(() => {
      const slotTaken = Math.random() < SLOT_TAKEN_FAILURE_RATE
      if (slotTaken) {
        setIsSubmitting(false)
        openSnackbar({
          text: 'Đặt lịch thất bại. Slot có thể đã bị lấy, vui lòng chọn giờ khác',
          type: 'error',
        })
        navigate(ROUTE_PATHS.bookingSelectDate)
        return
      }

      const confirmation: ConfirmedBooking = {
        id: `LH${Date.now().toString().slice(-6)}`,
        branch: selectedBranch,
        services: selectedServices,
        technicianId: selectedTechnicianId,
        technicianName,
        dateIso: selectedDateIso,
        timeSlot: selectedTimeSlot,
        totalDurationMin,
        total,
        pendingPoints: Math.floor(total / 10000),
        status: 'pending',
        createdAt: Date.now(),
      }
      setLastConfirmedBooking(confirmation)
      clearBooking()
      setIsSubmitting(false)
      navigate(ROUTE_PATHS.bookingSuccess, { replace: true })
    }, SUBMIT_DURATION_MS)
  }

  const handleAuthAction = () => {
    setAuthModalMode(null)
    navigate(ROUTE_PATHS.login)
  }

  return (
    <Box className="flex min-h-full flex-col bg-app-bg">
      <Box className="flex flex-1 flex-col gap-4 px-4 pt-3 pb-4">
        <SummaryCard
          branch={selectedBranch}
          services={selectedServices}
          technicianName={technicianName}
          totalDurationMin={totalDurationMin}
          dateIso={selectedDateIso}
          timeSlot={selectedTimeSlot}
          onEditBranch={() => navigate(ROUTE_PATHS.bookingBranch)}
          onEditServices={() => navigate(ROUTE_PATHS.bookingServices)}
          onEditTechnician={() => navigate(ROUTE_PATHS.bookingTechnician)}
          onEditDate={() => navigate(ROUTE_PATHS.bookingSelectDate)}
        />

        <NoteInput value={note} onChange={setNote} />

        <VoucherSection
          inputCode={voucher.inputCode}
          status={voucher.status}
          onChange={voucher.setInputCode}
          onApply={voucher.applyVoucher}
          onClear={voucher.clearVoucher}
        />

        <PointsToggle
          isEnabled={isUsingPoints}
          availablePoints={USER_AVAILABLE_POINTS}
          discountAmount={getPointsDiscountAmount(USER_AVAILABLE_POINTS)}
          onToggle={() => setIsUsingPoints((prev) => !prev)}
        />

        <PriceBreakdown
          services={selectedServices}
          voucherDiscount={voucherDiscount}
          voucherLabel={voucherLabel}
          pointsDiscount={pointsDiscount}
          total={total}
        />

        <PolicyAccordion />

        <Box className="h-16 w-full" />
      </Box>

      <ConfirmBar isSubmitting={isSubmitting} isEnabled={isReady} onConfirm={handleConfirm} />

      <AuthRequiredModal
        visible={authModalMode !== null}
        mode={authModalMode ?? 'login'}
        onClose={() => setAuthModalMode(null)}
        onAction={handleAuthAction}
      />
    </Box>
  )
}
