import React from 'react'
import { HiOutlineCalendarDays, HiOutlineClock } from 'react-icons/hi2'
import { useNavigate } from 'react-router-dom'
import { Box, Text } from 'zmp-ui'

import { Promo } from '@/mocks/promotions-data'
import { ROUTE_PATHS } from '@/routing/paths'
import { formatTime } from '@/utils/format'

import { EndingSoonBadge } from './ending-soon-badge'

type PromoCardProps = {
  promo: Promo
}

export function PromoCard({ promo }: PromoCardProps) {
  const navigate = useNavigate()

  return (
    <Box className="overflow-hidden rounded-xl border border-border-soft bg-surface-primary">
      <img
        src={promo.bannerUrl}
        alt={promo.title}
        className="block w-full object-cover"
        style={{ height: 160 }}
        loading="lazy"
      />

      <Box className="flex flex-col gap-2.5 p-3">
        {promo.isExpiringSoon && promo.daysLeft !== undefined ? <EndingSoonBadge daysLeft={promo.daysLeft} /> : null}

        <Text className="text-[15px] font-bold text-text-primary">{promo.title}</Text>

        <Box className="flex items-center gap-1.5">
          <HiOutlineCalendarDays size={13} className="shrink-0 text-text-secondary" />
          <Text className="text-[12px] text-text-secondary">Áp dụng: {promo.applicableDays}</Text>
        </Box>

        <Box className="flex items-center gap-1.5">
          <HiOutlineClock size={13} className="shrink-0 text-text-secondary" />
          <Text className="text-[12px] text-text-secondary">Hết hạn: {formatTime(promo.expiryDate, 'DD/MM/YYYY')}</Text>
        </Box>

        <button
          type="button"
          onClick={() => navigate(ROUTE_PATHS.bookingBranch)}
          className="mt-1 w-full rounded-full border-none bg-button-primary-bg py-2.5 text-[13px] font-semibold text-button-primary-fg active:opacity-90"
        >
          Đặt lịch ngay
        </button>
      </Box>
    </Box>
  )
}
