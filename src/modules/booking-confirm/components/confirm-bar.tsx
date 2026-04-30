import React from 'react'
import { HiCheckCircle } from 'react-icons/hi2'
import { Box } from 'zmp-ui'

import { clsx } from '@/utils/clsx'

type ConfirmBarProps = {
  isSubmitting: boolean
  isEnabled: boolean
  onConfirm: () => void
}

export function ConfirmBar({ isSubmitting, isEnabled, onConfirm }: ConfirmBarProps) {
  const disabled = isSubmitting || !isEnabled
  return (
    <Box className="sticky -bottom-[0.5px] left-0 right-0 border-t border-border-soft bg-surface-primary px-4 py-3 shadow-[0_-2px_8px_rgba(0,0,0,0.08)]">
      <button
        type="button"
        disabled={disabled}
        onClick={onConfirm}
        className={clsx(
          'flex w-full items-center justify-center gap-2 rounded-full border-none px-5 py-3 text-sm font-semibold',
          disabled
            ? 'cursor-not-allowed bg-gray-200 text-text-primary'
            : 'bg-button-primary-bg text-button-primary-fg active:scale-[0.99]',
        )}
      >
        {isSubmitting ? (
          <>
            <span className="h-4 w-4 animate-spin rounded-full border-2 border-text-inverse border-t-transparent" />
            Đang xác nhận...
          </>
        ) : (
          <>
            <HiCheckCircle size={18} /> Xác nhận đặt lịch
          </>
        )}
      </button>
    </Box>
  )
}
