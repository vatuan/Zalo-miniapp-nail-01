import React from 'react'
import { HiArrowRight, HiStar } from 'react-icons/hi2'
import { Box, Text } from 'zmp-ui'

import { ServiceReview } from '@/mocks/service-detail-data'

import { formatRatingAvg, formatReviewCount } from '../utils/format-rating'
import { ReviewCard } from './review-card'

const PREVIEW_LIMIT = 2

type ReviewsSectionProps = {
  ratingAvg: number
  ratingCount: number
  reviews: ServiceReview[]
  onSeeAll: () => void
}

export function ReviewsSection({ ratingAvg, ratingCount, reviews, onSeeAll }: ReviewsSectionProps) {
  const previewReviews = reviews.slice(0, PREVIEW_LIMIT)

  return (
    <Box className="flex flex-col gap-2">
      <Box className="flex items-center justify-between">
        <Box className="flex items-center gap-2">
          <Text className="text-[11px] font-semibold uppercase tracking-widest text-text-secondary">
            Đánh giá ({formatReviewCount(ratingCount)})
          </Text>
        </Box>
        <Box className="flex items-center gap-1">
          <HiStar size={14} className="text-brand-gold" />
          <Text className="text-sm font-semibold text-text-primary">{formatRatingAvg(ratingAvg)}</Text>
        </Box>
      </Box>

      {previewReviews.length === 0 ? (
        <Box className="rounded-xl bg-card-surface p-3 text-center shadow-sm">
          <Text className="text-sm text-text-secondary">Chưa có đánh giá nào.</Text>
        </Box>
      ) : (
        <Box className="flex flex-col gap-2">
          {previewReviews.map((review) => (
            <ReviewCard key={review.id} review={review} />
          ))}
        </Box>
      )}

      {ratingCount > previewReviews.length ? (
        <button
          type="button"
          onClick={onSeeAll}
          className="flex items-center justify-center gap-1 self-center rounded-full border border-brand-pink bg-surface-primary px-4 py-1.5 text-xs font-semibold text-brand-pink"
        >
          Xem tất cả đánh giá <HiArrowRight size={12} />
        </button>
      ) : null}
    </Box>
  )
}
