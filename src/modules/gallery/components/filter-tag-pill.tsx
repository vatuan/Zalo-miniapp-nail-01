import React from 'react'
import { Text } from 'zmp-ui'

import { clsx } from '@/utils/clsx'

type FilterTagPillProps = {
  label: string
  isSelected: boolean
  swatchHex?: string
  onToggle: () => void
}

export function FilterTagPill({ label, isSelected, swatchHex, onToggle }: FilterTagPillProps) {
  return (
    <button
      type="button"
      onClick={onToggle}
      className={clsx(
        'inline-flex items-center gap-1.5 rounded-full border-none px-3 py-1.5 transition-colors',
        isSelected
          ? 'bg-brand-pink text-text-inverse ring-1 ring-brand-pink'
          : 'bg-surface-primary text-text-primary ring-1 ring-border-soft',
      )}
    >
      {swatchHex ? (
        <span
          aria-hidden
          className="h-3 w-3 rounded-full ring-1 ring-border-soft"
          style={{ backgroundColor: swatchHex }}
        />
      ) : null}
      <Text className="text-xs font-semibold">{label}</Text>
    </button>
  )
}
