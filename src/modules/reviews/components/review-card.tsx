import React, { useState } from 'react'
import { HiUser } from 'react-icons/hi2'
import { Box, Text } from 'zmp-ui'

import { Review } from '@/mocks/reviews-data'
import { clsx } from '@/utils/clsx'
import { formatTime } from '@/utils/format'

import { ReviewPhotoStrip } from './review-photo-strip'
import { ReviewStars } from './review-stars'

type ReviewCardProps = {
  review: Review
}

const CLAMP_THRESHOLD = 120

export function ReviewCard({ review }: ReviewCardProps) {
  const [isExpanded, setIsExpanded] = useState(false)
  const canExpand = review.text.length > CLAMP_THRESHOLD

  return (
    <Box className="flex flex-col gap-2.5 rounded-xl border border-border-soft bg-surface-primary p-3">
      {/* Header */}
      <Box className="flex items-center gap-2">
        {review.avatarUrl ? (
          <img
            src={review.avatarUrl}
            alt={review.reviewerName}
            className="h-9 w-9 shrink-0 rounded-full object-cover"
          />
        ) : (
          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-surface-muted">
            <HiUser size={18} className="text-text-secondary" />
          </div>
        )}

        <Box className="flex flex-1 flex-col gap-0.5">
          <Text className="text-[13px] font-semibold text-text-primary">{review.reviewerName}</Text>
          <ReviewStars rating={review.rating} size={13} />
        </Box>

        <Text className="shrink-0 text-[11px] text-text-secondary">{formatTime(review.dateIso, 'DD/MM/YYYY')}</Text>
      </Box>

      {/* Service tag + KTV */}
      <Box className="flex items-center gap-1.5">
        <span className="rounded-full bg-brand-pink-ultra-soft px-2 py-0.5 text-[11px] font-medium text-brand-pink">
          {review.serviceTag}
        </span>
        <span className="text-[11px] text-text-secondary">•</span>
        <Text className="text-[11px] text-text-secondary">KTV {review.ktvName}</Text>
      </Box>

      {/* Review text */}
      <Box>
        <Text
          className={clsx(
            'whitespace-pre-wrap text-[13px] leading-relaxed text-text-primary',
            !isExpanded && canExpand && 'line-clamp-3',
          )}
        >
          {review.text}
        </Text>
        {canExpand && !isExpanded ? (
          <button
            type="button"
            onClick={() => setIsExpanded(true)}
            className="mt-0.5 border-none bg-transparent p-0 text-[12px] font-semibold text-brand-pink"
          >
            Xem thêm
          </button>
        ) : null}
      </Box>

      {/* Photos */}
      <ReviewPhotoStrip photos={review.photos} isPhotoReported={review.isPhotoReported} />
    </Box>
  )
}
