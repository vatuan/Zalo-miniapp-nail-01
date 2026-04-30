import React from 'react'
import { Box, Text } from 'zmp-ui'

import { NailRelatedPreview } from '@/mocks/nail-detail-data'

import { RelatedNailCard } from './related-nail-card'

type RelatedNailsSectionProps = {
  nails: NailRelatedPreview[]
  onOpen: (id: string) => void
}

export function RelatedNailsSection({ nails, onOpen }: RelatedNailsSectionProps) {
  if (nails.length === 0) return null

  return (
    <Box className="flex flex-col gap-3">
      <Text className="text-[13px] font-semibold uppercase tracking-wide text-text-secondary">Mẫu tương tự</Text>
      <div className="flex gap-2 overflow-x-auto pb-1" style={{ scrollbarWidth: 'none' }}>
        {nails.map((nail) => (
          <RelatedNailCard key={nail.id} nail={nail} onClick={onOpen} />
        ))}
      </div>
    </Box>
  )
}
