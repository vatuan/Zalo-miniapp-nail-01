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
        'shrink-0 rounded-full border-none ring-1 px-3.5 py-1.5 text-sm font-medium transition-colors',
        isActive
          ? 'ring-brand-pink bg-brand-pink text-text-inverse'
          : 'ring-brand-pink bg-surface-primary text-text-secondary',
      )}
    >
      {label}
    </button>
  )
}
