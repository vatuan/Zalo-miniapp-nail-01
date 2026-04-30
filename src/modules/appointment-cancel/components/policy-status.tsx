import React from 'react'
import { HiCheckCircle, HiClock, HiOutlineXCircle } from 'react-icons/hi2'
import { Box, Text } from 'zmp-ui'

import { CANCEL_FREE_HOURS } from '@/mocks/appointment-data'
import { formatMoney } from '@/utils/format'
import { clsx } from '@/utils/clsx'

import { CancelPolicyResult, formatRemainingTime } from '../utils/policy'

type PolicyStatusProps = {
  policy: CancelPolicyResult
}

export function PolicyStatus({ policy }: PolicyStatusProps) {
  return (
    <Box className="flex flex-col gap-3 rounded-2xl border border-brand-pink-soft bg-card-surface p-4">
      <Text className="text-[11px] font-semibold uppercase tracking-widest text-text-secondary">Chính sách hủy</Text>

      <Box className="flex items-start gap-2">
        <HiCheckCircle size={16} className="mt-0.5 shrink-0 text-status-success" />
        <Text className="text-sm text-text-primary">
          Còn hơn {CANCEL_FREE_HOURS} tiếng trước giờ hẹn → <Text className="font-semibold">Miễn phí</Text>
        </Text>
      </Box>

      <Box className="flex items-start gap-2">
        <HiOutlineXCircle size={16} className="mt-0.5 shrink-0 text-status-error" />
        <Text className="text-sm text-text-primary">
          Trong vòng {CANCEL_FREE_HOURS} tiếng → Phí {policy.feePercent}%{' '}
          {policy.feeAmount > 0 ? `= ${formatMoney(policy.feeAmount)}` : ''}
        </Text>
      </Box>

      <Box
        className={clsx(
          'flex flex-col gap-1 rounded-xl px-3 py-2',
          policy.isFree ? 'bg-status-success-soft' : 'bg-status-error-soft',
        )}
      >
        <Box className="flex items-center gap-2">
          <HiClock size={16} className={policy.isFree ? 'text-status-success' : 'text-status-error'} />
          <Text className={clsx('text-xs font-semibold', policy.isFree ? 'text-status-success' : 'text-status-error')}>
            Thời gian còn lại: {formatRemainingTime(policy.minutesRemaining)}
          </Text>
        </Box>
        <Text className={clsx('text-sm font-bold', policy.isFree ? 'text-status-success' : 'text-status-error')}>
          {policy.isPast
            ? 'Lịch đã qua giờ hẹn'
            : policy.isFree
              ? '→ Hủy MIỄN PHÍ'
              : `→ Có phí ${formatMoney(policy.feeAmount)}`}
        </Text>
      </Box>
    </Box>
  )
}
