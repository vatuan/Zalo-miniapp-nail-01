import React from 'react'
import { HiOutlineArrowUpRight, HiOutlinePhone } from 'react-icons/hi2'
import { Box } from 'zmp-ui'

type BranchActionButtonsProps = {
  onDirections: () => void
  onCall: () => void
  onBook: () => void
}

export function BranchActionButtons({ onDirections, onCall, onBook }: BranchActionButtonsProps) {
  return (
    <Box className="flex items-center gap-2">
      <button
        type="button"
        onClick={onDirections}
        className="flex flex-1 items-center justify-center gap-1 rounded-full border-none ring-1 ring-brand-pink-soft bg-transparent py-1.5 text-xs font-semibold text-brand-pink active:opacity-80"
      >
        <HiOutlineArrowUpRight size={14} />
        Chỉ đường
      </button>
      <button
        type="button"
        onClick={onCall}
        className="flex flex-1 items-center justify-center gap-1 rounded-full border-none ring-1 ring-brand-pink-soft bg-transparent py-1.5 text-xs font-semibold text-brand-pink active:opacity-80"
      >
        <HiOutlinePhone size={14} />
        Gọi
      </button>
      <button
        type="button"
        onClick={onBook}
        className="flex-1 rounded-full border-none ring-1 ring-button-primary-bg bg-button-primary-bg py-1.5 text-xs font-semibold text-button-primary-fg active:opacity-80"
      >
        Đặt lịch
      </button>
    </Box>
  )
}
