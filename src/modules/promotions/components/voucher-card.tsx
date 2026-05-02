import React from 'react'
import { useNavigate } from 'react-router-dom'
import { Box, Text } from 'zmp-ui'

import { UserVoucher } from '@/mocks/promotions-data'
import { ROUTE_PATHS } from '@/routing/paths'
import { clsx } from '@/utils/clsx'
import { formatMoney, formatTime } from '@/utils/format'

import { ExpiringTodayBadge } from './expiring-today-badge'
import { VoucherCodeReveal } from './voucher-code-reveal'

type VoucherCardProps = {
  voucher: UserVoucher
}

export function VoucherCard({ voucher }: VoucherCardProps) {
  const navigate = useNavigate()
  const isActive = voucher.status === 'active'

  const handleUseNow = () => {
    navigate(ROUTE_PATHS.bookingBranch, { state: { voucherCode: voucher.code } })
  }

  return (
    <Box
      className={clsx(
        'flex overflow-hidden rounded-xl border border-border-soft bg-surface-primary',
        !isActive && 'opacity-60',
      )}
    >
      {/* Colored left accent bar */}
      <div className={clsx('w-1.5 shrink-0', isActive ? 'bg-brand-pink' : 'bg-border-default')} />

      <Box className="flex flex-1 flex-col gap-2.5 p-3">
        {/* Top row: discount + badge */}
        <Box className="flex items-start justify-between gap-2">
          <Box className="flex flex-col gap-0.5">
            <Text className="text-[22px] font-bold leading-none text-brand-pink">
              -{formatMoney(voucher.discountAmount)}
            </Text>
            {voucher.minOrder > 0 ? (
              <Text className="text-[11px] text-text-secondary">Đơn tối thiểu: {formatMoney(voucher.minOrder)}</Text>
            ) : null}
          </Box>

          {voucher.isExpiringToday ? <ExpiringTodayBadge /> : null}
          {voucher.status === 'used' ? (
            <span className="rounded-full bg-surface-muted px-2.5 py-0.5 text-[11px] text-text-secondary">Đã dùng</span>
          ) : null}
          {voucher.status === 'expired' ? (
            <span className="rounded-full bg-surface-muted px-2.5 py-0.5 text-[11px] text-text-secondary">Hết hạn</span>
          ) : null}
        </Box>

        {/* Expiry date */}
        <Text className="text-[12px] text-text-secondary">HSD: {formatTime(voucher.expiryDate, 'DD/MM/YYYY')}</Text>

        {/* Masked code + copy */}
        <VoucherCodeReveal code={voucher.code} />

        {/* CTA — active only */}
        {isActive ? (
          <button
            type="button"
            onClick={handleUseNow}
            className="mt-0.5 w-full rounded-full border-none ring-1 ring-brand-pink bg-transparent py-3 text-[13px] font-semibold text-brand-pink active:bg-brand-pink-ultra-soft"
          >
            Dùng ngay
          </button>
        ) : null}
      </Box>
    </Box>
  )
}
