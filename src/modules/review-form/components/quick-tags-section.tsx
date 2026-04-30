import React from 'react'
import { Box, Text } from 'zmp-ui'

import { AVAILABLE_QUICK_TAGS } from '@/mocks/review-form-data'

import { QuickTagChip } from './quick-tag-chip'

type QuickTagsSectionProps = {
  selectedTags: string[]
  onToggle: (tag: string) => void
}

export function QuickTagsSection({ selectedTags, onToggle }: QuickTagsSectionProps) {
  return (
    <Box className="flex flex-col gap-3">
      <Text className="text-[11px] font-bold uppercase tracking-wider text-text-secondary">
        Tags nhanh
      </Text>
      <Box className="flex flex-wrap gap-2">
        {AVAILABLE_QUICK_TAGS.map((tag) => (
          <QuickTagChip
            key={tag}
            label={tag}
            isSelected={selectedTags.includes(tag)}
            onToggle={() => onToggle(tag)}
          />
        ))}
      </Box>
    </Box>
  )
}
