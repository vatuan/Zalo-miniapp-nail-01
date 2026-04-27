import React from 'react'
import { HiArrowRight } from 'react-icons/hi2'
import { Box, Button, Text } from 'zmp-ui'

import { clsx } from '@/utils/clsx'

import { formatDurationMinutes, formatPriceVndShort } from '../booking-format'

type SelectionSummaryBarProps = {
  serviceCount: number
  totalDurationMin: number
  totalPrice: number
  onContinue: () => void
}

export function SelectionSummaryBar({
  serviceCount,
  totalDurationMin,
  totalPrice,
  onContinue,
}: SelectionSummaryBarProps) {
  const isDisabled = serviceCount === 0

  return (
    <Box className="sticky -bottom-[0.5px] left-0 right-0 border-t border-border-soft bg-surface-primary px-4 py-3 shadow-[0_-2px_8px_rgba(0,0,0,0.08)]">
      <Box className="flex items-center justify-between gap-3">
        <Box className="min-w-0 flex-1">
          <Text className="truncate text-xs text-text-secondary">
            Đã chọn: <span className="font-semibold text-text-primary">{serviceCount}</span> dịch vụ
          </Text>
          <Text className="truncate text-sm font-semibold text-text-primary">
            Tổng: ~{formatDurationMinutes(totalDurationMin)} • {formatPriceVndShort(totalPrice)}
          </Text>
        </Box>
        <button
          disabled={isDisabled}
          onClick={onContinue}
          className={clsx(
            'shrink-0 rounded-full px-5 py-2 border-none flex items-center gap-2 text-sm font-semibold',
            isDisabled
              ? 'bg-gray-200 text-text-primary cursor-not-allowed'
              : 'bg-button-primary-bg text-button-primary-fg active:scale-[0.99]',
          )}
        >
          Tiếp tục <HiArrowRight size={18} />
        </button>
      </Box>
    </Box>
  )
}
