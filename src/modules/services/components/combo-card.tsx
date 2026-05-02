import React from 'react'
import { HiOutlineFire } from 'react-icons/hi2'
import { Box, Text } from 'zmp-ui'

import { Combo, Service } from '@/mocks/service-data'

import { calcComboDiscountPercent, formatDurationMinutes, formatPriceShort } from '../service-format'

type ComboCardProps = {
  combo: Combo
  childServices: Service[]
  onOpenDetail: (combo: Combo) => void
  onBook: (combo: Combo) => void
}

export function ComboCard({ combo, childServices, onOpenDetail, onBook }: ComboCardProps) {
  const savings = combo.originalPrice - combo.comboPrice
  const discountPercent = calcComboDiscountPercent(combo.originalPrice, combo.comboPrice)

  const handleCardClick = () => {
    onOpenDetail(combo)
  }

  const handleBookClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation()
    onBook(combo)
  }

  return (
    <div
      role="button"
      onClick={handleCardClick}
      className="relative rounded-xl border border-brand-pink-soft bg-gradient-to-br from-brand-pink-soft to-brand-cream p-3 shadow-sm active:scale-[0.99]"
    >
      {discountPercent > 0 ? (
        <Box className="absolute right-2 top-2 rounded-full ring-1 ring-brand-pink text-brand-pink px-2 py-0.5 text-[10px] font-bold shadow">
          -{discountPercent}%
        </Box>
      ) : null}

      <div className="flex items-stretch gap-3">
        <Box className="h-20 w-20 shrink-0 overflow-hidden rounded-lg bg-surface-primary">
          <img src={combo.imageUrl} alt={combo.name} className="h-full w-full object-cover" />
        </Box>

        <Box className="flex min-w-0 flex-1 flex-col">
          <Text className="text-sm font-semibold text-text-primary">{combo.name}</Text>

          <Box className="mt-0.5 flex flex-col gap-0.5">
            {childServices.slice(0, 2).map((service) => (
              <Text key={service.id} className="line-clamp-1 text-[11px] text-text-secondary">
                • {service.name}
              </Text>
            ))}
            {childServices.length > 2 ? (
              <Text className="text-[11px] text-text-secondary">+{childServices.length - 2} dịch vụ khác</Text>
            ) : null}
          </Box>

          <Text className="mt-1 text-[11px] text-text-secondary">~{formatDurationMinutes(combo.totalDurationMin)}</Text>
        </Box>
      </div>

      <Box className="mt-2 flex items-center justify-between gap-2 border-t border-brand-pink-soft pt-2">
        <Box className="flex items-baseline gap-2">
          <Text className="text-xs text-text-secondary line-through">{formatPriceShort(combo.originalPrice)}</Text>
          <Text className="text-base font-bold text-brand-dark">{formatPriceShort(combo.comboPrice)}</Text>
          {savings > 0 ? (
            <Box className="flex items-center gap-0.5 text-brand-dark">
              <HiOutlineFire size={12} />
              <Text className="text-[11px] font-semibold">-{formatPriceShort(savings)}</Text>
            </Box>
          ) : null}
        </Box>

        <button
          type="button"
          onClick={handleBookClick}
          className="shrink-0 rounded-full border-none bg-brand-pink px-4 py-1.5 text-xs font-semibold text-text-inverse active:scale-95"
        >
          Đặt combo
        </button>
      </Box>
    </div>
  )
}
