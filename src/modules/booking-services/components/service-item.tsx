import React from 'react'
import { Text } from 'zmp-ui'

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
    <div
      className={clsx(
        'rounded-xl bg-card-surface shadow p-3',
        isSelected && 'ring-1 ring-brand-pink bg-pink-100',
        isUnavailable ? 'opacity-50' : 'active:scale-[0.99]',
      )}
      onClick={handleRowClick}
      role="button"
      aria-disabled={isUnavailable}
    >
      <div className="flex gap-4 items-stretch">
        <div className="w-20 aspect-square shrink-0 rounded-xl overflow-hidden bg-pink-300">
          <img src={service.imageUrl} alt={service.name} className="h-full w-full object-cover" />
        </div>

        <div className="flex-1 flex flex-col min-h-0">
          <div className="flex items-start justify-between gap-3">
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
          </div>

          <Text className="mt-1 text-xs text-text-secondary">
            {formatDurationRange(service.durationMin, service.durationMax)} • {formatPriceVnd(service.price)}
          </Text>

          <button
            className="mt-auto ring-1 ring-brand-pink rounded-sm bg-transparent text-brand-dark border-none w-max py-1 px-2 font-semibold text-xs"
            onClick={handleDetailClick}
          >
            Xem chi tiết
          </button>
        </div>
      </div>
    </div>
  )
}
