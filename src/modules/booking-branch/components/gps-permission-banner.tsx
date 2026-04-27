import React from 'react'
import { HiOutlineMapPin } from 'react-icons/hi2'
import { Box, Text } from 'zmp-ui'

type GpsPermissionBannerProps = {
  onEnable: () => void
}

export function GpsPermissionBanner({ onEnable }: GpsPermissionBannerProps) {
  return (
    <Box className="flex items-center gap-3 rounded-xl border border-border-soft bg-surface-muted px-3 py-2.5">
      <Box className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-brand-pink-soft text-brand-dark">
        <HiOutlineMapPin size={16} />
      </Box>
      <Text className="flex-1 text-xs text-text-primary">Cho phép vị trí để xem chi nhánh gần bạn</Text>
      <button
        type="button"
        className="shrink-0 text-xs font-semibold text-brand-pink hover:text-brand-dark"
        onClick={onEnable}
      >
        Bật
      </button>
    </Box>
  )
}
