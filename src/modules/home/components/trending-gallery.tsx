import React from 'react'
import { HiChevronRight } from 'react-icons/hi2'
import { useNavigate } from 'react-router-dom'
import { Box, Text } from 'zmp-ui'

import { GalleryItem } from '@/mocks/home-data'
import { ROUTE_PATHS } from '@/routing/paths'

type TrendingGalleryProps = {
  gallery: GalleryItem[]
}

export function TrendingGallery({ gallery }: TrendingGalleryProps) {
  const navigate = useNavigate()

  return (
    <Box>
      <Box className="mb-2 flex justify-between items-center gap-2">
        <Text className="text-sm font-bold tracking-wide text-text-primary">MẪU NAIL ĐANG TRENDING</Text>
        <button
          type="button"
          className="flex items-center gap-1 border-0 bg-transparent p-0 text-sm font-medium text-brand-dark"
          onClick={() => navigate(ROUTE_PATHS.gallery)}
        >
          <span>Xem tất cả</span>
          <HiChevronRight size={14} />
        </button>
      </Box>

      <Box className="grid grid-cols-3 gap-2">
        {gallery.map((item) => (
          <button
            key={item.id}
            type="button"
            className="border-0 bg-transparent p-0"
            onClick={() => navigate(ROUTE_PATHS.gallery)}
          >
            <img
              src={item.imageUrl}
              alt={item.alt}
              className="h-full w-full rounded-lg border border-border-soft object-cover shadow-sm"
            />
          </button>
        ))}
      </Box>
    </Box>
  )
}
