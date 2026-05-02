import React, { useMemo, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { Box, useSnackbar } from 'zmp-ui'

import { useConfigurePageHeader } from '@/layouts/page-layout-context'
import { CANCEL_REASONS, getAppointmentById } from '@/mocks/appointment-data'
import { ROUTE_PATHS } from '@/routing/paths'
import { PageHeader } from '@/shared/components'

import { AlreadyCancelledState } from './components/already-cancelled-state'
import { CancelActionBar } from './components/cancel-action-bar'
import { ExtraConfirmModal } from './components/extra-confirm-modal'
import { PointsImpact } from './components/points-impact'
import { PolicyStatus } from './components/policy-status'
import { ReasonSelector } from './components/reason-selector'
import { WarningCard } from './components/warning-card'
import { useCancelForm } from './hooks/use-cancel-form'

const SUBMIT_DURATION_MS = 800

export function AppointmentCancelPageModule() {
  const navigate = useNavigate()
  const { id } = useParams<{ id: string }>()
  const { openSnackbar } = useSnackbar()

  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isExtraConfirmOpen, setIsExtraConfirmOpen] = useState(false)

  const appointment = useMemo(() => (id ? getAppointmentById(id) : null), [id])

  const headerConfig = useMemo(
    () => ({
      content: (
        <Box className="w-full">
          <PageHeader
            title="Hủy lịch hẹn"
            onBack={() =>
              id ? navigate(ROUTE_PATHS.appointmentDetailBase.replace(':id', id)) : navigate(ROUTE_PATHS.myAppointments)
            }
          />
        </Box>
      ),
    }),
    [navigate, id],
  )

  useConfigurePageHeader(headerConfig)

  const form = useCancelForm(appointment)

  if (!appointment) {
    return (
      <Box className="flex min-h-full flex-col bg-app-bg">
        <AlreadyCancelledState onBack={() => navigate(ROUTE_PATHS.myAppointments)} />
      </Box>
    )
  }

  const isAlreadyCancelled = appointment.status === 'cancelled' || appointment.status === 'cancelled_by_salon'

  if (isAlreadyCancelled) {
    return (
      <Box className="flex min-h-full flex-col bg-app-bg">
        <AlreadyCancelledState reason={appointment.cancelReason} onBack={() => navigate(ROUTE_PATHS.myAppointments)} />
      </Box>
    )
  }

  const submitCancel = () => {
    setIsSubmitting(true)
    setIsExtraConfirmOpen(false)
    window.setTimeout(() => {
      setIsSubmitting(false)
      openSnackbar({ text: 'Đã hủy lịch', type: 'success' })
      navigate(ROUTE_PATHS.myAppointments, { replace: true })
    }, SUBMIT_DURATION_MS)
  }

  const handleConfirm = () => {
    if (!form.isSubmittable || isSubmitting) return
    if (!form.policy.isFree && form.policy.feeAmount > 0) {
      setIsExtraConfirmOpen(true)
      return
    }
    submitCancel()
  }

  const handleKeep = () => {
    if (id) {
      navigate(ROUTE_PATHS.appointmentDetailBase.replace(':id', id))
      return
    }
    navigate(ROUTE_PATHS.myAppointments)
  }

  return (
    <Box className="flex min-h-full flex-col bg-app-bg">
      <Box className="flex flex-1 flex-col gap-4 px-4 pt-4 pb-4">
        <WarningCard appointment={appointment} />

        <ReasonSelector
          reasons={CANCEL_REASONS}
          selectedId={form.reasonId}
          customReason={form.customReason}
          showCustomInput={form.selectedReasonRequiresDetail}
          onSelect={form.setReasonId}
          onCustomReasonChange={form.setCustomReason}
        />

        <PolicyStatus policy={form.policy} />

        <PointsImpact pendingPoints={appointment.pendingPoints ?? 0} />

        <Box className="h-5 w-full" />
      </Box>

      <CancelActionBar
        isSubmittable={form.isSubmittable}
        isSubmitting={isSubmitting}
        onConfirm={handleConfirm}
        onKeep={handleKeep}
      />

      <ExtraConfirmModal
        visible={isExtraConfirmOpen}
        feeAmount={form.policy.feeAmount}
        onClose={() => setIsExtraConfirmOpen(false)}
        onConfirm={submitCancel}
      />
    </Box>
  )
}
