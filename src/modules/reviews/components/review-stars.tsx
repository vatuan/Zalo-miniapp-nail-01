import React from 'react'
import { HiOutlineStar, HiStar } from 'react-icons/hi2'

type ReviewStarsProps = {
  rating: number
  size?: number
}

export function ReviewStars({ rating, size = 14 }: ReviewStarsProps) {
  return (
    <div className="flex items-center gap-0.5">
      {[1, 2, 3, 4, 5].map((star) =>
        star <= rating ? (
          <HiStar key={star} size={size} className="text-brand-gold" />
        ) : (
          <HiOutlineStar key={star} size={size} className="text-border-default" />
        ),
      )}
    </div>
  )
}
