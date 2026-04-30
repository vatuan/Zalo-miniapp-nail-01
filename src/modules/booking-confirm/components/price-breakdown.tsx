import React from 'react'
import { Box, Text } from 'zmp-ui'

import { Service } from '@/mocks/service-data'
import { formatMoney } from '@/utils/format'

type PriceBreakdownProps = {
  services: Service[]
  voucherDiscount: number
  voucherLabel: string | null
  pointsDiscount: number
  total: number
}

export function PriceBreakdown({
  services,
  voucherDiscount,
  voucherLabel,
  pointsDiscount,
  total,
}: PriceBreakdownProps) {
  return (
    <Box className="flex flex-col gap-2">
      <Text className="text-[11px] font-semibold uppercase tracking-widest text-text-secondary">
        Chi phí ước tính
      </Text>

      <Box className="flex flex-col gap-2 rounded-2xl border border-brand-pink-soft bg-card-surface p-4">
        {services.map((service) => (
          <Box key={service.id} className="flex items-center justify-between gap-2">
            <Text className="line-clamp-1 text-sm text-text-primary">{service.name}</Text>
            <Text className="text-sm text-text-primary">{formatMoney(service.price)}</Text>
          </Box>
        ))}

        {voucherDiscount > 0 ? (
          <Box className="flex items-center justify-between gap-2">
            <Text className="line-clamp-1 text-sm text-status-success">Voucher {voucherLabel ?? ''}</Text>
            <Text className="text-sm font-semibold text-status-success">−{formatMoney(voucherDiscount)}</Text>
          </Box>
        ) : null}

        {pointsDiscount > 0 ? (
          <Box className="flex items-center justify-between gap-2">
            <Text className="text-sm text-status-success">Điểm thưởng</Text>
            <Text className="text-sm font-semibold text-status-success">−{formatMoney(pointsDiscount)}</Text>
          </Box>
        ) : null}

        <Box className="border-t border-border-soft pt-2">
          <Box className="flex items-center justify-between gap-2">
            <Text className="text-sm font-semibold text-text-primary">Tổng ước tính</Text>
            <Text className="text-base font-bold text-brand-pink">{formatMoney(total)}</Text>
          </Box>
        </Box>

        <Text className="italic text-[11px] text-text-secondary">
          Giá có thể thay đổi theo thực tế sản phẩm sử dụng. Thanh toán tại salon.
        </Text>
      </Box>
    </Box>
  )
}
