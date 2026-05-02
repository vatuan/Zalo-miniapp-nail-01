import React from 'react'
import { HiStar } from 'react-icons/hi2'
import { Box, Text } from 'zmp-ui'

import { ReviewSummary } from '@/mocks/reviews-data'

import { StarBarRow } from './star-bar-row'

const BARS_MIN_COUNT = 5

type RatingSummaryProps = {
  summary: ReviewSummary
}

export function RatingSummary({ summary }: RatingSummaryProps) {
  const showBars = summary.totalCount >= BARS_MIN_COUNT

  return (
    <Box className="flex flex-col gap-3 rounded-xl border border-border-soft bg-surface-primary p-4">
      <Box className="flex items-center gap-1.5">
        <HiStar size={24} className="text-brand-gold flex items-center" />
        <Text className="text-2xl font-bold text-text-primary">{summary.overallScore.toFixed(1)}</Text>
        <Text className="text-base text-text-secondary">/ 5</Text>
      </Box>

      <Text className="text-[13px] text-text-secondary">
        Dựa trên {summary.totalCount.toLocaleString('vi-VN')} đánh giá
      </Text>

      {showBars ? (
        <Box className="flex flex-col gap-2 pt-1">
          {summary.starBreakdown.map((item) => (
            <StarBarRow key={item.star} item={item} />
          ))}
        </Box>
      ) : null}
    </Box>
  )
}
