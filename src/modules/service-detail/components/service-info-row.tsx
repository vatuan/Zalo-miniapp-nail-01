import React from 'react'
import { HiOutlineBanknotes, HiOutlineClock, HiOutlineListBullet } from 'react-icons/hi2'
import { Box, Text } from 'zmp-ui'

import { formatDurationRange, formatPrice, formatPriceShort } from '@/modules/services/service-format'
import { clsx } from '@/utils/clsx'

type ServiceInfoRowProps = {
  price: number
  hasVariants: boolean
  variantMinPrice: number | null
  durationMin: number
  durationMax: number
  includes: string[]
}

export function ServiceInfoRow({
  price,
  hasVariants,
  variantMinPrice,
  durationMin,
  durationMax,
  includes,
}: ServiceInfoRowProps) {
  const hasNoPrice = !hasVariants && price <= 0

  return (
    <Box className="flex flex-col gap-2 rounded-xl bg-card-surface p-3 shadow-sm">
      {!hasVariants ? (
        <Box className="flex items-center gap-2">
          <HiOutlineBanknotes size={18} className="shrink-0 text-text-secondary" />
          <Text className={clsx('text-sm font-semibold', hasNoPrice ? 'italic text-text-secondary' : 'text-brand-dark')}>
            {formatPrice(price)}
          </Text>
        </Box>
      ) : (
        <Box className="flex items-center gap-2">
          <HiOutlineBanknotes size={18} className="shrink-0 text-text-secondary" />
          <Text className="text-sm font-semibold text-brand-dark">
            Từ {variantMinPrice !== null ? formatPriceShort(variantMinPrice) : '—'}
          </Text>
          <Text className="text-xs text-text-secondary">(xem bảng giá)</Text>
        </Box>
      )}

      <Box className="flex items-center gap-2">
        <HiOutlineClock size={18} className="shrink-0 text-text-secondary" />
        <Text className="text-sm text-text-primary">{formatDurationRange(durationMin, durationMax)}</Text>
      </Box>

      <Box className="flex items-start gap-2">
        <HiOutlineListBullet size={18} className="mt-0.5 shrink-0 text-text-secondary" />
        <Text className="text-sm text-text-primary">Bao gồm: {includes.join(', ')}</Text>
      </Box>
    </Box>
  )
}
