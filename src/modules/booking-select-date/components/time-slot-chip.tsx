import React from 'react'
import { HiCheck } from 'react-icons/hi2'

import { clsx } from '@/utils/clsx'

import { TimeSlot } from '../utils/slots'

type TimeSlotChipProps = {
  slot: TimeSlot
  onClick: (slot: TimeSlot) => void
}

export function TimeSlotChip({ slot, onClick }: TimeSlotChipProps) {
  const isDisabled = slot.status === 'booked' || slot.status === 'too-late'
  const isSelected = slot.status === 'selected'

  return (
    <button
      type="button"
      disabled={isDisabled}
      title={slot.reason}
      onClick={() => onClick(slot)}
      className={clsx(
        'flex items-center justify-center gap-1 rounded-full ring-1 ring-brand-pink border-none px-3 py-2 text-xs font-semibold transition-all active:scale-[0.98]',
        isSelected && ' bg-brand-pink text-text-inverse',
        slot.status === 'available' && 'bg-surface-primary text-text-primary',
        slot.status === 'booked' && 'cursor-not-allowed ring-1 ring-gray-300 bg-gray-100 text-gray-400',
        slot.status === 'too-late' && 'cursor-not-allowed border-border-soft bg-surface-muted text-text-secondary',
      )}
    >
      {isSelected ? <HiCheck size={12} /> : null}
      {slot.value}
    </button>
  )
}
