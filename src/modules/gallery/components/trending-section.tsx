import React from 'react'
import { HiFire } from 'react-icons/hi2'
import { Box, Text } from 'zmp-ui'

import { NailSample } from '@/mocks/gallery-data'

import { TrendingCard } from './trending-card'

type TrendingSectionProps = {
  items: NailSample[]
  isSaved: (id: string) => boolean
  onOpen: (id: string) => void
  onToggleSave: (id: string) => { ok: boolean }
  onGuestTap: () => void
}

export function TrendingSection({ items, isSaved, onOpen, onToggleSave, onGuestTap }: TrendingSectionProps) {
  if (items.length === 0) return null

  return (
    <Box className="flex flex-col gap-2">
      <Box className="flex items-center gap-1 px-4">
        <HiFire className="text-brand-dark" size={18} />
        <Text className="text-xs font-semibold uppercase tracking-widest text-brand-dark">Đang trending</Text>
      </Box>
      <div
        className="flex gap-3 overflow-x-auto px-4 pb-1 [&::-webkit-scrollbar]:hidden"
        style={{ scrollbarWidth: 'none' }}
      >
        {items.map((sample) => (
          <TrendingCard
            key={sample.id}
            sample={sample}
            isSaved={isSaved(sample.id)}
            onOpen={onOpen}
            onToggleSave={onToggleSave}
            onGuestTap={onGuestTap}
          />
        ))}
      </div>
    </Box>
  )
}
