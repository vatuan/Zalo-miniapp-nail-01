import React from 'react'
import { HiOutlineStar, HiStar } from 'react-icons/hi2'
import { Box, Text } from 'zmp-ui'

const STAR_LABELS: Record<number, string> = {
  1: 'Rất tệ',
  2: 'Không hài lòng',
  3: 'Bình thường',
  4: 'Hài lòng',
  5: 'Tuyệt vời!',
}

type StarRatingInputProps = {
  rating: number
  onTap: (star: number) => void
}

export function StarRatingInput({ rating, onTap }: StarRatingInputProps) {
  return (
    <Box className="flex flex-col items-center gap-3 py-2">
      <Text className="text-[11px] font-bold uppercase tracking-wider text-text-secondary">
        Bạn hài lòng như thế nào?
      </Text>

      <Box className="flex items-center gap-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <button
            key={star}
            type="button"
            onClick={() => onTap(star)}
            aria-label={`${star} sao`}
            className="border-none bg-transparent p-1.5 transition-transform active:scale-125"
          >
            {star <= rating ? (
              <HiStar size={44} className="text-brand-gold" />
            ) : (
              <HiOutlineStar size={44} className="text-border-default" />
            )}
          </button>
        ))}
      </Box>

      <Text className="h-5 text-[13px] text-text-secondary">
        {rating === 0 ? '(Nhấn để chấm điểm)' : STAR_LABELS[rating]}
      </Text>
    </Box>
  )
}
