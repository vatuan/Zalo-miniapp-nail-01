import React from 'react'
import { HiCheck } from 'react-icons/hi2'
import { Box, Text } from 'zmp-ui'

import { Service } from '@/mocks/service-data'
import { clsx } from '@/utils/clsx'

import { formatDurationRange, formatPriceVnd } from '../booking-format'

type ServiceItemProps = {
  service: Service
  isSelected: boolean
  onToggle: (service: Service) => void
  onExpand: (service: Service) => void
}

export function ServiceItem({ service, isSelected, onToggle, onExpand }: ServiceItemProps) {
  const isUnavailable = !service.isAvailable

  const handleRowClick = () => {
    onToggle(service)
  }

  const handleDetailClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation()
    onExpand(service)
  }

  return (
    <Box
      role="button"
      aria-disabled={isUnavailable}
      onClick={handleRowClick}
      className={clsx(
        'flex w-full items-start gap-3 rounded-xl border bg-card-surface p-3 shadow-sm transition-all',
        isSelected ? 'border-2 border-brand-pink' : 'border border-brand-pink-soft',
        isUnavailable ? 'opacity-50' : 'active:scale-[0.99]',
      )}
    >
      <Box
        className={clsx(
          'mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full border-2 transition-colors',
          isSelected ? 'border-brand-pink bg-brand-pink text-text-inverse' : 'border-border-default bg-surface-primary',
        )}
      >
        {isSelected ? <HiCheck size={12} /> : null}
      </Box>

      <Box className="h-12 w-12 shrink-0 overflow-hidden rounded-lg bg-surface-muted">
        <img src={service.imageUrl} alt={service.name} className="h-full w-full object-cover" />
      </Box>

      <Box className="min-w-0 flex-1">
        <Box className="flex items-start justify-between gap-2">
          <Text className="line-clamp-2 text-sm font-semibold text-text-primary">{service.name}</Text>
          {service.isPopular && !isUnavailable ? (
            <Text className="shrink-0 rounded-full bg-brand-gold px-2 py-0.5 text-[10px] font-semibold text-brand-dark">
              Phổ biến
            </Text>
          ) : null}
          {isUnavailable ? (
            <Text className="shrink-0 rounded-full bg-border-soft px-2 py-0.5 text-[10px] font-semibold text-text-secondary">
              Tạm ngưng
            </Text>
          ) : null}
        </Box>

        <Text className="mt-1 text-xs text-text-secondary">
          {formatDurationRange(service.durationMin, service.durationMax)} • {formatPriceVnd(service.price)}
        </Text>

        <button
          type="button"
          onClick={handleDetailClick}
          className="mt-1.5 text-xs font-semibold text-brand-pink hover:text-brand-dark"
        >
          Xem chi tiết
        </button>
      </Box>
    </Box>
  )
}
