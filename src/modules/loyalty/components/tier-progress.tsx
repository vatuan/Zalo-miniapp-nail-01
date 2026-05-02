import React from 'react'
import { Box, Text } from 'zmp-ui'

import { getTierConfig, memberProfile, nextTierProgress } from '@/mocks/loyalty-data'
import { formatMoney } from '@/utils/format'

export function TierProgress() {
  if (!nextTierProgress.nextTier) return null

  const currentTier = getTierConfig(memberProfile.tier)
  const nextTier = getTierConfig(nextTierProgress.nextTier)

  const currentName = formatTierName(currentTier.label)
  const nextName = formatTierName(nextTier.label)

  return (
    <Box className="flex flex-col gap-3 rounded-2xl border border-border-soft bg-surface-primary p-4">
      <Text className="text-[13px] font-semibold uppercase tracking-wide text-text-secondary">Lộ trình nâng hạng</Text>

      <Box className="flex items-center justify-between">
        <Text className="text-[14px] font-semibold text-text-primary">
          {currentTier.icon} {currentName}
        </Text>
        <Text className="text-[14px] font-semibold text-text-primary">
          {nextName} {nextTier.icon}
        </Text>
      </Box>

      <Box className="relative h-2.5 w-full overflow-hidden rounded-full bg-brand-pink-ultra-soft">
        <Box className="h-full rounded-full bg-brand-pink" style={{ width: `${nextTierProgress.progressPercent}%` }} />
      </Box>

      <Text className="text-[13px] text-text-secondary">
        Còn thiếu: <span className="font-semibold text-text-primary">{formatMoney(nextTierProgress.amountToNext)}</span>
      </Text>

      <Text className="text-[13px] text-brand-pink">
        Đặt thêm {nextTierProgress.bookingsToNext} lần nữa để lên hạng {nextName}! 🎉
      </Text>
    </Box>
  )
}

function formatTierName(label: string) {
  const name = label.replace(' MEMBER', '')
  return name.charAt(0) + name.slice(1).toLowerCase()
}
