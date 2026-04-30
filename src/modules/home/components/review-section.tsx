import React from 'react'
import { HiStar } from 'react-icons/hi2'
import { Box, Text, useNavigate } from 'zmp-ui'

import { ReviewItem } from '@/mocks/home-data'
import { ROUTE_PATHS } from '@/routing/paths'

type ReviewSectionProps = {
  reviews: ReviewItem[]
}

const getInitials = (author: string) => {
  return author
    .split(' ')
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0])
    .join('')
    .toUpperCase()
}

export function ReviewSection({ reviews }: ReviewSectionProps) {
  const navigate = useNavigate()
  return (
    <Box>
      <div className="flex items-center justify-between mb-2">
        <Text className="text-sm font-bold tracking-wide text-text-primary">ĐÁNH GIÁ GẦN ĐÂY</Text>
        <button className="border-none bg-transparent text-brand-dark" onClick={() => navigate(ROUTE_PATHS.reviews)}>
          Xem tất cả
        </button>
      </div>

      <Box className="space-y-2">
        {reviews.slice(0, 2).map((review) => (
          <Box key={review.id} className="rounded-xl border border-card-border bg-card-surface p-3 shadow-sm">
            <Box className="mb-2 flex items-start justify-between gap-2">
              <Box className="flex items-center gap-2">
                <Box className="flex h-9 w-9 items-center justify-center rounded-full bg-brand-pink-soft">
                  <Text className="text-xs font-bold text-brand-dark">{getInitials(review.author)}</Text>
                </Box>

                <Box>
                  <Text className="text-sm font-semibold text-text-primary">{review.author}</Text>
                  <Box className="mt-0.5 flex items-center gap-0.5 text-brand-dark">
                    {Array.from({ length: review.rating }).map((_, index) => (
                      <HiStar key={`${review.id}-star-${index}`} size={12} />
                    ))}
                  </Box>
                </Box>
              </Box>

              <Text className="text-xs text-text-secondary">{review.date}</Text>
            </Box>

            <Text className="mb-1 inline-flex rounded-full bg-surface-muted px-2 py-0.5 text-xs font-medium text-text-primary">
              {review.service}
            </Text>

            <Text className="[display:-webkit-box] overflow-hidden text-sm text-text-primary [-webkit-box-orient:vertical] [-webkit-line-clamp:2]">
              {review.comment}
            </Text>
          </Box>
        ))}
      </Box>
    </Box>
  )
}
