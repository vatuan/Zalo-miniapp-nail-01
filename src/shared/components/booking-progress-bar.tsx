import React from 'react'
import { Box, Text } from 'zmp-ui'

type BookingProgressBarProps = {
  currentStep: number
  totalSteps?: number
}

export function BookingProgressBar({ currentStep, totalSteps = 5 }: BookingProgressBarProps) {
  const safeStep = Math.max(1, Math.min(currentStep, totalSteps))
  const percent = Math.round((safeStep / totalSteps) * 100)

  return (
    <Box className="px-4 pt-4">
      <Box className="mb-1 flex items-center justify-end">
        <Text className="text-xs font-medium text-text-secondary">
          Bước {safeStep}/{totalSteps}
        </Text>
      </Box>
      <Box className="h-1 w-full overflow-hidden rounded bg-brand-pink-ultra-soft">
        <Box className="h-full rounded bg-brand-pink transition-all duration-300" style={{ width: `${percent}%` }} />
      </Box>
    </Box>
  )
}
