import React from 'react'
import { HiCheck, HiOutlineClock, HiOutlineCurrencyDollar } from 'react-icons/hi2'
import { Box, Button, Sheet, Text } from 'zmp-ui'

import { Service, SERVICE_NOTES } from '@/mocks/service-data'
import { clsx } from '@/utils/clsx'

import { formatDurationRange, formatPriceVnd } from '../booking-format'

type ServiceDetailSheetProps = {
  service: Service | null
  isOpen: boolean
  isSelected: boolean
  onClose: () => void
  onSelect: (service: Service) => void
}

export function ServiceDetailSheet({ service, isOpen, isSelected, onClose, onSelect }: ServiceDetailSheetProps) {
  if (!service) {
    return null
  }

  const handleAction = () => {
    onSelect(service)
    onClose()
  }

  return (
    <Sheet visible={isOpen} title={service.name} onClose={onClose} autoHeight swipeToClose mask>
      <Box className="flex max-h-[75vh] flex-col">
        <Box className="overflow-y-auto px-4 pb-4">
          <Box className="aspect-[16/9] w-full overflow-hidden rounded-xl bg-surface-muted">
            <img src={service.imageUrl} alt={service.name} className="h-full w-full object-cover" />
          </Box>

          <Box className="mt-3 flex items-center gap-2">
            {service.isPopular ? (
              <Text className="rounded-full bg-brand-gold px-2 py-0.5 text-[10px] font-semibold text-brand-dark">
                Phổ biến
              </Text>
            ) : null}
            {!service.isAvailable ? (
              <Text className="rounded-full bg-border-soft px-2 py-0.5 text-[10px] font-semibold text-text-secondary">
                Tạm ngưng
              </Text>
            ) : null}
          </Box>

          <Box className="mt-3 flex items-center gap-4 text-sm text-text-primary">
            <Box className="flex items-center gap-1">
              <HiOutlineClock size={16} className="text-text-secondary" />
              <Text className="text-sm">{formatDurationRange(service.durationMin, service.durationMax)}</Text>
            </Box>
            <Box className="flex items-center gap-1">
              <HiOutlineCurrencyDollar size={16} className="text-text-secondary" />
              <Text className="text-sm font-semibold text-brand-dark">{formatPriceVnd(service.price)}</Text>
            </Box>
          </Box>

          <Box className="mt-4 border-t border-border-soft pt-3">
            <Text className="text-xs font-semibold uppercase tracking-widest text-text-secondary">Mô tả</Text>
            <Text className="mt-1 text-sm text-text-primary">{service.description}</Text>
          </Box>

          <Box className="mt-4 border-t border-border-soft pt-3">
            <Text className="text-xs font-semibold uppercase tracking-widest text-text-secondary">Lưu ý</Text>
            <Box className="mt-1 flex flex-col gap-1">
              {SERVICE_NOTES.map((note, index) => (
                <Text key={index} className="text-sm text-text-primary">
                  • {note}
                </Text>
              ))}
            </Box>
          </Box>
        </Box>

        <Box className="grid grid-cols-2 gap-2 border-t border-border-soft bg-surface-primary p-4">
          <button
            className="rounded-full text-sm border-none bg-surface-primary text-brand-dark font-semibold"
            onClick={onClose}
          >
            Đóng
          </button>
          <button
            disabled={!service.isAvailable}
            onClick={handleAction}
            className={clsx(
              'rounded-full font-semibold py-2.5 border-none flex items-center justify-center gap-2 text-sm',
              isSelected
                ? 'bg-brand-green text-text-inverse'
                : 'bg-button-primary-bg text-button-primary-fg disabled:opacity-50',
            )}
          >
            {isSelected ? <HiCheck size={18} /> : undefined}
            {isSelected ? 'Đã chọn' : 'Thêm vào lịch'}
          </button>
        </Box>
      </Box>
    </Sheet>
  )
}
