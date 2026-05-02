import React from 'react'
import { Box } from 'zmp-ui'

import { clsx } from '@/utils/clsx'

type CancelActionBarProps = {
  isSubmittable: boolean
  isSubmitting: boolean
  onConfirm: () => void
  onKeep: () => void
}

export function CancelActionBar({ isSubmittable, isSubmitting, onConfirm, onKeep }: CancelActionBarProps) {
  return (
    <Box className="sticky -bottom-[0.5px] left-0 right-0 flex gap-2 border-t border-border-soft bg-surface-primary px-4 py-3 shadow-[0_-2px_8px_rgba(0,0,0,0.08)]">
      <button
        type="button"
        disabled={!isSubmittable || isSubmitting}
        onClick={onConfirm}
        className={clsx(
          'flex flex-1 items-center justify-center gap-2 rounded-full border-none ring-1 px-3 py-3 text-sm font-semibold transition-colors active:scale-[0.99]',
          !isSubmittable || isSubmitting
            ? 'cursor-not-allowed ring-border-soft bg-surface-muted text-text-secondary'
            : 'ring-red-500 bg-red-100 text-red-500',
        )}
      >
        {isSubmitting ? (
          <>
            <span className="h-4 w-4 animate-spin rounded-full border-2 border-status-error border-t-transparent" />
            Đang hủy...
          </>
        ) : (
          'Hủy lịch'
        )}
      </button>

      <button
        type="button"
        disabled={isSubmitting}
        onClick={onKeep}
        className="flex flex-1 items-center justify-center gap-2 rounded-full border-none bg-button-primary-bg px-3 py-3 text-sm font-semibold text-button-primary-fg active:scale-[0.99] disabled:opacity-60"
      >
        Giữ lịch
      </button>
    </Box>
  )
}
