import React from 'react'
import { Box, Text } from 'zmp-ui'

import { getTierConfig, memberProfile } from '@/mocks/loyalty-data'
import { clsx } from '@/utils/clsx'

export function MembershipCard() {
  const tier = getTierConfig(memberProfile.tier)

  return (
    <Box
      className={clsx(
        'flex flex-col gap-3 rounded-2xl bg-gradient-to-br p-5 text-text-inverse shadow-md',
        tier.gradient,
      )}
    >
      <Box className="flex items-center gap-2">
        <span className="text-2xl leading-none">{tier.icon}</span>
        <Text className="text-[15px] font-bold tracking-wide text-text-inverse">{tier.label}</Text>
      </Box>

      <Text className="text-xl font-semibold text-text-inverse">{memberProfile.name}</Text>

      <Box className="flex items-end justify-between">
        <Box className="flex flex-col gap-0.5">
          <Text className="text-[12px] uppercase tracking-wide text-text-inverse/80">Điểm hiện có</Text>
          <Text className="text-[22px] font-bold leading-none text-text-inverse">✦ {memberProfile.points} điểm</Text>
        </Box>
      </Box>

      <Text className="text-[12px] text-text-inverse/85">Thành viên từ: {memberProfile.memberSince}</Text>
    </Box>
  )
}
