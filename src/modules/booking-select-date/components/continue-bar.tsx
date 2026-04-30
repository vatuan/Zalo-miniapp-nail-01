import React from 'react'
import { HiArrowRight } from 'react-icons/hi2'
import { Box } from 'zmp-ui'

import { clsx } from '@/utils/clsx'

type ContinueBarProps = {
  isEnabled: boolean
  onContinue: () => void
}

export function ContinueBar({ isEnabled, onContinue }: ContinueBarProps) {
  return (
    <Box className="sticky -bottom-[0.5px] left-0 right-0 border-t border-border-soft bg-surface-primary px-4 py-3 shadow-[0_-2px_8px_rgba(0,0,0,0.08)]">
      <button
        type="button"
        disabled={!isEnabled}
        onClick={onContinue}
        className={clsx(
          'flex w-full items-center justify-center gap-2 rounded-full border-none px-5 py-3 text-sm font-semibold',
          isEnabled
            ? 'bg-button-primary-bg text-button-primary-fg active:scale-[0.99]'
            : 'cursor-not-allowed bg-gray-200 text-text-primary',
        )}
      >
        Tiếp tục <HiArrowRight size={18} />
      </button>
    </Box>
  )
}
