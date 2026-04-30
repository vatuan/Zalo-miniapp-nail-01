import React from 'react'
import { HiStar } from 'react-icons/hi2'
import { Box, Text } from 'zmp-ui'

import { ServiceReview } from '@/mocks/service-detail-data'
import { clsx } from '@/utils/clsx'

import { formatReviewDate } from '../utils/format-rating'

type ReviewCardProps = {
  review: ServiceReview
}

export function ReviewCard({ review }: ReviewCardProps) {
  const initial = review.authorName.trim().charAt(0).toUpperCase() || '•'

  return (
    <Box className="flex flex-col gap-1.5 rounded-xl bg-card-surface p-3 shadow-sm">
      <Box className="flex items-center gap-2">
        <Box className="flex h-8 w-8 items-center justify-center overflow-hidden rounded-full bg-brand-pink-soft text-sm font-semibold text-brand-dark">
          {review.authorAvatarUrl ? (
            <img src={review.authorAvatarUrl} alt={review.authorName} className="h-full w-full object-cover" />
          ) : (
            <span>{initial}</span>
          )}
        </Box>
        <Box className="flex min-w-0 flex-1 flex-col">
          <Text className="line-clamp-1 text-sm font-semibold text-text-primary">{review.authorName}</Text>
          <Text className="text-[11px] text-text-secondary">{formatReviewDate(review.createdAtIso)}</Text>
        </Box>
        <Box className="flex shrink-0 items-center gap-0.5">
          {[1, 2, 3, 4, 5].map((value) => (
            <HiStar
              key={value}
              size={12}
              className={clsx(value <= review.rating ? 'text-brand-gold' : 'text-border-default')}
            />
          ))}
        </Box>
      </Box>
      <Text className="text-sm text-text-primary">{review.comment}</Text>
    </Box>
  )
}
