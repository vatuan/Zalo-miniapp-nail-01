import React from 'react'
import { HiOutlineClock, HiOutlineFire } from 'react-icons/hi2'
import { Box, Sheet, Text } from 'zmp-ui'

import { Combo, Service } from '@/mocks/service-data'

import { calcComboDiscountPercent, formatDurationMinutes, formatPriceShort } from '../service-format'

type ComboDetailSheetProps = {
  combo: Combo | null
  childServices: Service[]
  isOpen: boolean
  onClose: () => void
  onBook: (combo: Combo) => void
}

export function ComboDetailSheet({ combo, childServices, isOpen, onClose, onBook }: ComboDetailSheetProps) {
  if (!combo) {
    return null
  }

  const savings = combo.originalPrice - combo.comboPrice
  const discountPercent = calcComboDiscountPercent(combo.originalPrice, combo.comboPrice)

  const handleAction = () => {
    onBook(combo)
    onClose()
  }

  return (
    <Sheet visible={isOpen} title={combo.name} onClose={onClose} autoHeight swipeToClose mask>
      <Box className="flex max-h-[75vh] flex-col">
        <Box className="overflow-y-auto px-4 pb-4">
          <Box className="aspect-[16/9] w-full overflow-hidden rounded-xl bg-surface-muted">
            <img src={combo.imageUrl} alt={combo.name} className="h-full w-full object-cover" />
          </Box>

          {discountPercent > 0 ? (
            <Box className="mt-3 inline-flex items-center gap-1 rounded-full bg-status-error-soft px-2 py-1">
              <HiOutlineFire size={14} className="text-status-error" />
              <Text className="text-xs font-semibold text-status-error">Tiết kiệm {discountPercent}%</Text>
            </Box>
          ) : null}

          <Box className="mt-3 flex items-center gap-4 text-sm text-text-primary">
            <Box className="flex items-center gap-1">
              <HiOutlineClock size={16} className="text-text-secondary" />
              <Text className="text-sm">~{formatDurationMinutes(combo.totalDurationMin)}</Text>
            </Box>
            <Box className="flex items-baseline gap-2">
              <Text className="text-xs text-text-secondary line-through">{formatPriceShort(combo.originalPrice)}</Text>
              <Text className="text-base font-bold text-brand-dark">{formatPriceShort(combo.comboPrice)}</Text>
            </Box>
          </Box>

          <Box className="mt-4 border-t border-border-soft pt-3">
            <Text className="text-xs font-semibold uppercase tracking-widest text-text-secondary">Mô tả</Text>
            <Text className="mt-1 text-sm text-text-primary">{combo.description}</Text>
          </Box>

          <Box className="mt-4 border-t border-border-soft pt-3">
            <Text className="text-xs font-semibold uppercase tracking-widest text-text-secondary">Dịch vụ bao gồm</Text>
            <Box className="mt-1 flex flex-col gap-1">
              {childServices.map((service) => (
                <Text key={service.id} className="text-sm text-text-primary">
                  • {service.name}
                </Text>
              ))}
            </Box>
          </Box>
        </Box>

        <Box className="grid grid-cols-2 gap-2 border-t border-border-soft bg-surface-primary p-4">
          <button
            type="button"
            onClick={onClose}
            className="rounded-full border-none bg-surface-primary text-sm font-semibold text-brand-dark"
          >
            Đóng
          </button>
          <button
            type="button"
            onClick={handleAction}
            className="rounded-full border-none bg-button-primary-bg py-2.5 text-sm font-semibold text-button-primary-fg"
          >
            Đặt combo
          </button>
        </Box>
      </Box>
    </Sheet>
  )
}
