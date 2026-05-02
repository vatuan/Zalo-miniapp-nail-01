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
        'rounded-full border-none ring-1  px-3.5 py-1.5 text-[13px] font-medium transition-colors',
        isSelected
          ? 'ring-brand-pink bg-brand-pink text-text-inverse'
          : 'ring-brand-pink bg-surface-primary text-brand-pink',
      )}
    >
      {label}
    </button>
  )
}
