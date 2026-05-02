import React from 'react'

import { ReviewFilterKind } from '@/mocks/reviews-data'

import { FilterChip } from './filter-chip'

type FilterOption = {
  value: ReviewFilterKind
  label: string
}

const FILTER_OPTIONS: FilterOption[] = [
  { value: 'all', label: 'Tất cả' },
  { value: '5', label: '5 ⭐' },
  { value: '4', label: '4 ⭐' },
  { value: 'photo', label: 'Có ảnh' },
]

type FilterChipsProps = {
  selected: ReviewFilterKind
  onChange: (filter: ReviewFilterKind) => void
}

export function FilterChips({ selected, onChange }: FilterChipsProps) {
  return (
    <div
      className="flex gap-2 overflow-x-auto px-4 py-1 pb-1"
      style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
    >
      {FILTER_OPTIONS.map((opt) => (
        <FilterChip
          key={opt.value}
          label={opt.label}
          isActive={selected === opt.value}
          onClick={() => onChange(opt.value)}
        />
      ))}
    </div>
  )
}
