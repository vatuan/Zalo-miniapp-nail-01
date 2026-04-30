import React from 'react'

import { clsx } from '@/utils/clsx'

type FilterChipProps = {
  label: string
  isActive: boolean
  onClick: () => void
}

export function FilterChip({ label, isActive, onClick }: FilterChipProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={clsx(
        'shrink-0 rounded-full border px-3.5 py-1.5 text-[13px] font-medium transition-colors',
        isActive
          ? 'border-brand-pink bg-brand-pink text-text-inverse'
          : 'border-border-default bg-surface-primary text-text-secondary',
      )}
    >
      {label}
    </button>
  )
}
