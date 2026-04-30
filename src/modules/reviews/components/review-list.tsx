import React from 'react'
import { Box } from 'zmp-ui'

import { Review } from '@/mocks/reviews-data'

import { ReviewCard } from './review-card'

type ReviewListProps = {
  reviews: Review[]
}

export function ReviewList({ reviews }: ReviewListProps) {
  return (
    <Box className="flex flex-col gap-3">
      {reviews.map((review) => (
        <ReviewCard key={review.id} review={review} />
      ))}
    </Box>
  )
}
