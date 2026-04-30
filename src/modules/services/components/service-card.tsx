import React from 'react'
import { useNavigate } from 'react-router-dom'
import { Box, Text } from 'zmp-ui'

import { Service } from '@/mocks/service-data'
import { ROUTE_PATHS } from '@/routing/paths'
import { clsx } from '@/utils/clsx'

import { formatDurationRange, formatPrice } from '../service-format'

type ServiceCardProps = {
  service: Service
  onOpenDetail: (service: Service) => void
  onBook: (service: Service) => void
}

export function ServiceCard({ service, onOpenDetail, onBook }: ServiceCardProps) {
  const isUnavailable = !service.isAvailable
  const hasNoPrice = service.price <= 0
  const navigate = useNavigate()

  const handleCardClick = () => {
    if (isUnavailable) return

    navigate(ROUTE_PATHS.serviceDetailBase.replace(':id', service.id))
    return
    // onOpenDetail(service)
  }

  const handleBookClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation()
    if (isUnavailable) return
    onBook(service)
  }

  return (
    <div
      role="button"
      aria-disabled={isUnavailable}
      onClick={handleCardClick}
      className={clsx('rounded-xl bg-card-surface p-3 shadow', isUnavailable ? 'opacity-50' : 'active:scale-[0.99]')}
    >
      <div className="flex items-stretch gap-3">
        <Box className="aspect-square w-20 shrink-0 overflow-hidden rounded-xl bg-pink-200">
          <img src={service.imageUrl} alt={service.name} className="h-full w-full object-cover" />
        </Box>

        <Box className="flex min-w-0 flex-1 flex-col">
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
            {formatDurationRange(service.durationMin, service.durationMax)}
          </Text>

          <Box className="mt-1 flex items-center justify-between gap-2">
            <Text className={clsx('text-sm font-bold', hasNoPrice ? 'text-text-secondary italic' : 'text-brand-dark')}>
              {formatPrice(service.price)}
            </Text>

            <button
              type="button"
              disabled={isUnavailable}
              onClick={handleBookClick}
              className={clsx(
                'shrink-0 rounded-full border-none px-4 py-1.5 text-xs font-semibold',
                isUnavailable
                  ? 'bg-border-soft text-text-secondary'
                  : 'bg-brand-pink text-text-inverse active:scale-95',
              )}
            >
              {hasNoPrice ? 'Liên hệ' : 'Đặt'}
            </button>
          </Box>
        </Box>
      </div>
    </div>
  )
}
