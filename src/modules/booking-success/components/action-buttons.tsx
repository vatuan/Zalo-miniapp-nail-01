import React from 'react'
import { HiOutlineCalendar, HiOutlineShare } from 'react-icons/hi2'
import { Box, Text } from 'zmp-ui'

type ActionButtonsProps = {
  onAddToCalendar: () => void
  onShareToZalo: () => void
}

export function ActionButtons({ onAddToCalendar, onShareToZalo }: ActionButtonsProps) {
  return (
    <Box className="flex gap-2">
      <button
        type="button"
        onClick={onAddToCalendar}
        className="flex flex-1 items-center justify-center gap-2 rounded-full border-none ring-1 ring-brand-pink-soft bg-card-surface px-4 py-3 text-sm font-semibold text-text-primary active:scale-[0.99]"
      >
        <HiOutlineCalendar size={16} className="text-brand-pink" />
        <Text className="text-sm font-semibold text-text-primary">Thêm vào lịch</Text>
      </button>

      <button
        type="button"
        onClick={onShareToZalo}
        className="flex flex-1 items-center justify-center gap-2 rounded-full border-none ring-1 ring-brand-pink-soft bg-card-surface px-4 py-3 text-sm font-semibold text-text-primary active:scale-[0.99]"
      >
        <HiOutlineShare size={16} className="text-brand-pink" />
        <Text className="text-sm font-semibold text-text-primary">Chia sẻ qua Zalo</Text>
      </button>
    </Box>
  )
}
