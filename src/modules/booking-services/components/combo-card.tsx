import React from 'react'
import { HiCheck, HiOutlineFire } from 'react-icons/hi2'
import { Box, Text } from 'zmp-ui'

import { Combo, Service } from '@/mocks/service-data'
import { clsx } from '@/utils/clsx'

import { formatDurationMinutes, formatPriceVndShort } from '../booking-format'

type ComboCardProps = {
  combo: Combo
  isSelected: boolean
  childServices: Service[]
  onToggle: (combo: Combo) => void
}

export function ComboCard({ combo, isSelected, childServices, onToggle }: ComboCardProps) {
  const savings = combo.originalPrice - combo.comboPrice

  const handleClick = () => {
    onToggle(combo)
  }

  return (
    <Box
      role="button"
      onClick={handleClick}
      className={clsx(
        'relative flex w-full gap-3 rounded-xl border bg-gradient-to-br from-brand-pink-soft to-brand-cream p-3 shadow-sm transition-all active:scale-[0.99]',
        isSelected ? 'border-2 border-brand-pink' : 'border border-brand-pink-soft',
      )}
    >
      {isSelected ? (
        <Box className="absolute right-2 top-2 flex h-6 w-6 items-center justify-center rounded-full bg-brand-pink text-text-inverse">
          <HiCheck size={14} />
        </Box>
      ) : null}

      <Box className="h-16 w-16 shrink-0 overflow-hidden rounded-lg bg-surface-primary">
        <img src={combo.imageUrl} alt={combo.name} className="h-full w-full object-cover" />
      </Box>

      <Box className="min-w-0 flex-1">
        <Text className="text-sm font-semibold text-text-primary">{combo.name}</Text>

        <Text className="mt-0.5 text-[11px] font-semibold uppercase tracking-wide text-text-secondary">
          Dịch vụ bao gồm:
        </Text>
        <Box className="mt-0.5 flex flex-col gap-0.5">
          {childServices.map((service) => (
            <Text key={service.id} className="text-xs text-text-primary">
              • {service.name}
            </Text>
          ))}
        </Box>

        <Text className="mt-1 text-xs text-text-secondary">~{formatDurationMinutes(combo.totalDurationMin)}</Text>

        <Box className="mt-1 flex items-baseline gap-2">
          <Text className="text-xs text-text-secondary line-through">{formatPriceVndShort(combo.originalPrice)}</Text>
          <Text className="text-base font-bold text-brand-dark">{formatPriceVndShort(combo.comboPrice)}</Text>
        </Box>

        {savings > 0 ? (
          <Box className="mt-1 flex items-center gap-1 text-brand-dark">
            <HiOutlineFire size={12} />
            <Text className="text-[11px] font-semibold">Tiết kiệm {formatPriceVndShort(savings)}</Text>
          </Box>
        ) : null}

        <Box
          className={clsx(
            'mt-2 inline-flex items-center gap-1 rounded-full px-3 py-1 text-xs font-semibold',
            isSelected ? 'bg-brand-green text-text-inverse' : 'bg-brand-pink text-text-inverse',
          )}
        >
          {isSelected ? <HiCheck size={12} /> : null}
          <Text className="text-xs font-semibold">{isSelected ? 'Đã chọn' : 'Chọn combo này'}</Text>
        </Box>
      </Box>
    </Box>
  )
}
