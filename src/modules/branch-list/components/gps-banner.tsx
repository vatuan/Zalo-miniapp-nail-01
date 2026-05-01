import React from 'react'
import { HiOutlineMapPin } from 'react-icons/hi2'
import { Box, Text } from 'zmp-ui'

type GpsBannerProps = {
  onEnable: () => void
}

export function GpsBanner({ onEnable }: GpsBannerProps) {
  return (
    <button
      type="button"
      onClick={onEnable}
      className="flex w-full items-center gap-3 rounded-xl border border-border-soft bg-surface-muted px-3 py-2.5 text-left active:opacity-80"
    >
      <Box className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-brand-pink-soft text-brand-dark">
        <HiOutlineMapPin size={16} />
      </Box>
      <Text className="flex-1 text-[13px] text-text-primary">📍 Bật vị trí để xem chi nhánh gần bạn</Text>
      <Text className="shrink-0 text-[13px] font-semibold text-brand-pink">Bật</Text>
    </button>
  )
}
