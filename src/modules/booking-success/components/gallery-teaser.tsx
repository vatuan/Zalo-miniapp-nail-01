import React from 'react'
import { HiArrowRight } from 'react-icons/hi2'
import { Box, Text } from 'zmp-ui'

import { mockGallery } from '@/mocks/home-data'

type GalleryTeaserProps = {
  onSeeMore: () => void
}

export function GalleryTeaser({ onSeeMore }: GalleryTeaserProps) {
  const items = mockGallery.slice(0, 3)
  if (items.length === 0) return null

  return (
    <Box className="flex flex-col gap-2">
      <Text className="text-[11px] font-semibold uppercase tracking-widest text-text-secondary">
        Mẫu nail gợi ý cho bạn
      </Text>
      <Box className="grid grid-cols-3 gap-2">
        {items.map((item) => (
          <Box
            key={item.id}
            role="button"
            onClick={onSeeMore}
            className="aspect-square overflow-hidden rounded-2xl bg-surface-muted active:scale-[0.99]"
          >
            <img src={item.imageUrl} alt={item.alt} className="h-full w-full object-cover" />
          </Box>
        ))}
      </Box>
      <button
        type="button"
        onClick={onSeeMore}
        className="flex items-center justify-center gap-1 rounded-full border-none bg-transparent py-2 text-sm font-semibold text-brand-pink active:scale-[0.99]"
      >
        Xem thêm mẫu <HiArrowRight size={14} />
      </button>
    </Box>
  )
}
