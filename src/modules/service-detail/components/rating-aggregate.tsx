import React from 'react'
import { HiStar } from 'react-icons/hi2'
import { Box, Text } from 'zmp-ui'

import { formatRatingAvg, formatReviewCount } from '../utils/format-rating'

type RatingAggregateProps = {
  ratingAvg: number
  ratingCount: number
}

export function RatingAggregate({ ratingAvg, ratingCount }: RatingAggregateProps) {
  return (
    <Box className="flex items-center gap-1.5">
      <HiStar size={16} className="text-brand-gold" />
      <Text className="text-sm font-semibold text-text-primary">{formatRatingAvg(ratingAvg)}</Text>
      <Text className="text-sm text-text-secondary">• {formatReviewCount(ratingCount)} đánh giá</Text>
    </Box>
  )
}
