import React from 'react'
import { Box, Text } from 'zmp-ui'

import { getTierConfig, memberProfile } from '@/mocks/loyalty-data'
import { formatTime } from '@/utils/format'

export function ExpiryBanner() {
  if (!memberProfile.isTierExpiringSoon) return null

  const tier = getTierConfig(memberProfile.tier)
  const tierName = tier.label.replace(' MEMBER', '')
  const tierNameTitle = tierName.charAt(0) + tierName.slice(1).toLowerCase()

  return (
    <Box className="bg-status-warning-soft px-4 py-2.5">
      <Text className="text-center text-[13px] text-text-primary">
        Hạng <span className="font-semibold">{tierNameTitle}</span> của bạn sẽ reset vào{' '}
        {formatTime(memberProfile.tierExpiryDate, 'DD/MM/YYYY')}. Còn{' '}
        <span className="font-semibold">{memberProfile.daysUntilReset} ngày</span>
      </Text>
    </Box>
  )
}
