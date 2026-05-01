import React from 'react'
import { Box, Text } from 'zmp-ui'

import { memberProfile, redeemOptions } from '@/mocks/loyalty-data'

import { RedeemCard } from './redeem-card'

export function RedeemSection() {
  const hasNoPoints = memberProfile.points === 0

  return (
    <Box className="flex flex-col gap-3">
      <Text className="text-[13px] font-semibold uppercase tracking-wide text-text-secondary">Đổi điểm</Text>

      {hasNoPoints ? (
        <Text className="rounded-xl bg-surface-muted px-3 py-2 text-[13px] text-text-secondary">
          Đặt lịch để tích điểm!
        </Text>
      ) : null}

      <Box className="flex flex-col gap-2.5">
        {redeemOptions.map((option) => (
          <RedeemCard key={option.id} option={option} />
        ))}
      </Box>
    </Box>
  )
}
