import React from 'react'
import { HiOutlineMagnifyingGlassMinus } from 'react-icons/hi2'
import { Box, Text } from 'zmp-ui'

type GalleryEmptyStateProps = {
  onClearFilters: () => void
}

export function GalleryEmptyState({ onClearFilters }: GalleryEmptyStateProps) {
  return (
    <Box className="flex flex-col items-center justify-center gap-3 px-6 py-12 text-center">
      <Box className="flex h-14 w-14 items-center justify-center rounded-full bg-brand-pink-soft">
        <HiOutlineMagnifyingGlassMinus size={28} className="text-brand-dark" />
      </Box>
      <Text className="text-sm font-semibold text-text-primary">Không tìm thấy mẫu phù hợp</Text>
      <Text className="text-xs text-text-secondary">Hãy thử bỏ bớt vài bộ lọc để xem nhiều mẫu hơn.</Text>
      <button
        type="button"
        onClick={onClearFilters}
        className="rounded-full border-none bg-button-primary-bg px-5 py-2 text-xs font-semibold text-button-primary-fg"
      >
        Xóa bộ lọc
      </button>
    </Box>
  )
}
