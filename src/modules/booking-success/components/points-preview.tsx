import React from 'react'
import { HiOutlineSparkles } from 'react-icons/hi2'
import { Box, Text } from 'zmp-ui'

type PointsPreviewProps = {
  points: number
}

export function PointsPreview({ points }: PointsPreviewProps) {
  if (points <= 0) return null
  return (
    <Box className="flex items-start gap-3 rounded-2xl border border-brand-gold bg-status-warning-soft p-4">
      <Box className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-brand-gold text-text-inverse">
        <HiOutlineSparkles size={18} />
      </Box>
      <Box className="min-w-0 flex-1">
        <Text className="text-sm font-semibold text-text-primary">+{points} điểm sẽ được cộng</Text>
        <Text className="text-xs text-text-secondary">Sau khi bạn hoàn thành lịch hẹn này</Text>
      </Box>
    </Box>
  )
}
