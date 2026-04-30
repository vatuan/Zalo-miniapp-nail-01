import { useEffect, useMemo, useState } from 'react'

import { AppointmentRecord, CANCEL_REASONS } from '@/mocks/appointment-data'

import { computeCancelPolicy, CancelPolicyResult } from '../utils/policy'

const TICK_INTERVAL_MS = 60 * 1000

export type CancelFormState = {
  reasonId: string | null
  setReasonId: (id: string) => void
  customReason: string
  setCustomReason: (value: string) => void
  policy: CancelPolicyResult
  isSubmittable: boolean
  selectedReasonRequiresDetail: boolean
  resolvedReasonText: string
}

export function useCancelForm(appointment: AppointmentRecord | null): CancelFormState {
  const [reasonId, setReasonId] = useState<string | null>(null)
  const [customReason, setCustomReason] = useState('')
  const [now, setNow] = useState(() => Date.now())

  useEffect(() => {
    const timer = window.setInterval(() => setNow(Date.now()), TICK_INTERVAL_MS)
    return () => window.clearInterval(timer)
  }, [])

  const policy = useMemo(() => {
    if (!appointment) {
      return { isFree: true, feeAmount: 0, feePercent: 0, minutesRemaining: 0, isPast: false }
    }
    return computeCancelPolicy(appointment, now)
  }, [appointment, now])

  const selectedReason = useMemo(() => CANCEL_REASONS.find((r) => r.id === reasonId) ?? null, [reasonId])
  const selectedReasonRequiresDetail = !!selectedReason?.requiresDetail

  const resolvedReasonText = useMemo(() => {
    if (!selectedReason) return ''
    if (selectedReason.requiresDetail) return customReason.trim()
    return selectedReason.label
  }, [selectedReason, customReason])

  const isSubmittable = useMemo(() => {
    if (!selectedReason) return false
    if (selectedReason.requiresDetail && customReason.trim().length === 0) return false
    return true
  }, [selectedReason, customReason])

  return {
    reasonId,
    setReasonId,
    customReason,
    setCustomReason,
    policy,
    isSubmittable,
    selectedReasonRequiresDetail,
    resolvedReasonText,
  }
}
