import React from 'react'
import { HiCheckBadge } from 'react-icons/hi2'
import { Box, Text } from 'zmp-ui'

type AlreadyReviewedBannerProps = {
  onBack: () => void
}

export function AlreadyReviewedBanner({ onBack }: AlreadyReviewedBannerProps) {
  return (
    <Box className="flex flex-1 flex-col items-center justify-center gap-4 px-8 py-20 text-center">
      <HiCheckBadge size={60} className="text-brand-green" />
      <Box className="flex flex-col gap-1.5">
        <Text className="text-base font-semibold text-text-primary">Đã gửi đánh giá</Text>
        <Text className="text-[13px] leading-relaxed text-text-secondary">
          Bạn đã đánh giá lịch hẹn này rồi. Cảm ơn bạn đã chia sẻ!
        </Text>
      </Box>
      <button
        type="button"
        onClick={onBack}
        className="rounded-full border border-brand-pink bg-transparent px-6 py-2.5 text-sm font-semibold text-brand-pink active:opacity-70"
      >
        Quay lại
      </button>
    </Box>
  )
}
