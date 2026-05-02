import React from 'react'

import { VoucherStatus } from '@/mocks/promotions-data'
import { clsx } from '@/utils/clsx'

type FilterOption = {
  value: VoucherStatus
  getLabel: (count: number) => string
}

const FILTER_OPTIONS: FilterOption[] = [
  { value: 'active', getLabel: (count) => `Còn hạn (${count})` },
  { value: 'used', getLabel: () => 'Đã dùng' },
  { value: 'expired', getLabel: () => 'Hết hạn' },
]

type VoucherFilterChipsProps = {
  activeFilter: VoucherStatus
  activeCount: number
  onChange: (filter: VoucherStatus) => void
}

export function VoucherFilterChips({ activeFilter, activeCount, onChange }: VoucherFilterChipsProps) {
  return (
    <div className="flex gap-2 overflow-x-auto pb-1 p-1" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
      {FILTER_OPTIONS.map((opt) => (
        <button
          key={opt.value}
          type="button"
          onClick={() => onChange(opt.value)}
          className={clsx(
            'shrink-0 rounded-full border-none px-3.5 py-1.5 text-xs font-medium transition-colors',
            activeFilter === opt.value
              ? 'ring-1 ring-brand-pink bg-transparent text-brand-pink'
              : 'ring-1 ring-brand-pink-soft bg-transparent text-brand-pink-soft',
          )}
        >
          {opt.getLabel(activeCount)}
        </button>
      ))}
    </div>
  )
}
