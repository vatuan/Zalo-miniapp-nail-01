import React from 'react'
import { HiOutlineSparkles } from 'react-icons/hi2'
import { Box, Text } from 'zmp-ui'

type PointsImpactProps = {
  pendingPoints: number
}

export function PointsImpact({ pendingPoints }: PointsImpactProps) {
  if (pendingPoints <= 0) return null
  return (
    <Box className="flex items-start gap-3 rounded-2xl border border-brand-gold bg-status-warning-soft p-4">
      <Box className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-brand-gold text-text-inverse">
        <HiOutlineSparkles size={18} />
      </Box>
      <Box className="min-w-0 flex-1">
        <Text className="text-[11px] font-semibold uppercase tracking-widest text-text-secondary">
          Tác động điểm thưởng
        </Text>
        <Text className="text-sm font-semibold text-text-primary">{pendingPoints} điểm pending sẽ mất</Text>
        <Text className="text-xs text-text-secondary">Điểm chỉ được cộng khi bạn hoàn thành dịch vụ</Text>
      </Box>
    </Box>
  )
}
