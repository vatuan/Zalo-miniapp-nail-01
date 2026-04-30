import React from 'react'
import { HiArrowRight } from 'react-icons/hi2'
import { Box, Text } from 'zmp-ui'

import { NailColor } from '@/mocks/service-detail-data'

type RelatedColorsGalleryProps = {
  colors: NailColor[]
  onSeeAll: () => void
}

export function RelatedColorsGallery({ colors, onSeeAll }: RelatedColorsGalleryProps) {
  if (colors.length === 0) return null

  return (
    <Box className="flex flex-col gap-2">
      <Box className="flex items-center justify-between">
        <Text className="text-[11px] font-semibold uppercase tracking-widest text-text-secondary">Màu sơn gợi ý</Text>
        <button
          type="button"
          onClick={onSeeAll}
          className="flex items-center gap-1 border-none bg-transparent text-xs font-semibold text-brand-pink"
        >
          Xem tất cả <HiArrowRight size={12} />
        </button>
      </Box>

      <div className="flex gap-3 overflow-x-auto pb-1 [&::-webkit-scrollbar]:hidden" style={{ scrollbarWidth: 'none' }}>
        {colors.map((color) => (
          <Box key={color.id} className="flex w-[30%] min-w-[30%] shrink-0 flex-col gap-1">
            <Box
              className="aspect-square w-full overflow-hidden rounded-xl border border-border-soft"
              style={{ backgroundColor: color.hex }}
            >
              {color.imageUrl ? (
                <img src={color.imageUrl} alt={color.name} className="h-full w-full object-cover" />
              ) : null}
            </Box>
            <Text className="line-clamp-1 text-center text-xs text-text-primary">{color.name}</Text>
          </Box>
        ))}
      </div>
    </Box>
  )
}
