import React from 'react'
import { MdArrowDropDown } from 'react-icons/md'

import { ReviewSortOrder } from '@/mocks/reviews-data'

type SortOption = {
  value: ReviewSortOrder
  label: string
}

const SORT_OPTIONS: SortOption[] = [
  { value: 'newest', label: 'Mới nhất' },
  { value: 'oldest', label: 'Cũ nhất' },
  { value: 'highest', label: 'Điểm cao nhất' },
  { value: 'lowest', label: 'Điểm thấp nhất' },
]

type SortSelectorProps = {
  value: ReviewSortOrder
  onChange: (order: ReviewSortOrder) => void
}

export function SortSelector({ value, onChange }: SortSelectorProps) {
  const selected = SORT_OPTIONS.find((o) => o.value === value)

  return (
    <div className="relative flex items-center gap-1">
      <span className="text-[13px] text-text-secondary">Sắp xếp:</span>
      <span className="text-[13px] font-semibold text-text-primary">{selected?.label}</span>
      <MdArrowDropDown size={18} />

      {/* native select overlaid for tap interaction */}
      <select
        value={value}
        onChange={(e) => onChange(e.target.value as ReviewSortOrder)}
        aria-label="Sắp xếp đánh giá"
        className="absolute inset-0 w-full cursor-pointer opacity-0"
      >
        {SORT_OPTIONS.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
    </div>
  )
}
