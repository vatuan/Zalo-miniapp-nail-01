import React from 'react'
import { Box } from 'zmp-ui'

type FilterSheetFooterProps = {
  resultCount: number
  onReset: () => void
  onApply: () => void
}

export function FilterSheetFooter({ resultCount, onReset, onApply }: FilterSheetFooterProps) {
  return (
    <Box className="grid grid-cols-2 gap-2 border-t border-border-soft bg-surface-primary p-4">
      <button
        type="button"
        onClick={onReset}
        className="rounded-full border border-brand-pink bg-surface-primary py-2.5 text-sm font-semibold text-brand-pink"
      >
        Đặt lại
      </button>
      <button
        type="button"
        onClick={onApply}
        className="rounded-full border-none bg-button-primary-bg py-2.5 text-sm font-semibold text-button-primary-fg"
      >
        Áp dụng ({resultCount} kết quả)
      </button>
    </Box>
  )
}
