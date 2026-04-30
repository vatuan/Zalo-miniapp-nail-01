import React from 'react'

import { clsx } from '@/utils/clsx'

type QuickTagChipProps = {
  label: string
  isSelected: boolean
  onToggle: () => void
}

export function QuickTagChip({ label, isSelected, onToggle }: QuickTagChipProps) {
  return (
    <button
      type="button"
      onClick={onToggle}
      className={clsx(
        'rounded-full border px-3.5 py-1.5 text-[13px] font-medium transition-colors',
        isSelected
          ? 'border-brand-pink bg-brand-pink text-text-inverse'
          : 'border-border-default bg-surface-primary text-text-secondary',
      )}
    >
      {label}
    </button>
  )
}
