import React from 'react'
import { HiArrowRight } from 'react-icons/hi2'
import { Box, Text } from 'zmp-ui'

import { formatPriceShort } from '@/modules/services/service-format'
import { clsx } from '@/utils/clsx'

type BookNowBarProps = {
  isAvailable: boolean
  hasNoPrice: boolean
  displayPrice: number | null
  variantLabel: string | null
  onBook: () => void
}

export function BookNowBar({ isAvailable, hasNoPrice, displayPrice, variantLabel, onBook }: BookNowBarProps) {
  const ctaLabel = hasNoPrice ? 'LIÊN HỆ TƯ VẤN' : 'ĐẶT LỊCH NGAY'

  return (
    <Box className="sticky -bottom-[0.5px] left-0 right-0 border-t border-border-soft bg-surface-primary px-4 py-3 shadow-[0_-2px_8px_rgba(0,0,0,0.08)]">
      <Box className="flex items-center gap-3">
        <Box className="flex min-w-0 flex-1 flex-col">
          {variantLabel ? <Text className="line-clamp-1 text-[11px] text-text-secondary">{variantLabel}</Text> : null}
          {hasNoPrice ? (
            <Text className="text-sm italic text-text-secondary">Liên hệ để biết giá</Text>
          ) : (
            <Text className="text-base font-bold text-brand-dark">
              {displayPrice !== null ? formatPriceShort(displayPrice) : '—'}
            </Text>
          )}
        </Box>

        <button
          type="button"
          disabled={!isAvailable}
          onClick={onBook}
          className={clsx(
            'flex shrink-0 items-center justify-center gap-1.5 rounded-full border-none px-5 py-3 text-sm font-bold',
            isAvailable
              ? 'bg-button-primary-bg text-button-primary-fg active:scale-[0.99]'
              : 'bg-border-soft text-text-secondary',
          )}
        >
          {ctaLabel} <HiArrowRight size={16} />
        </button>
      </Box>
    </Box>
  )
}
