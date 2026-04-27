import React from 'react'
import { HiSparkles } from 'react-icons/hi2'
import { Box, Text } from 'zmp-ui'

export function AppHeader() {
  return (
    <Box className="flex h-full items-center justify-between px-4">
      <Box className="flex items-center gap-2">
        <Box className="flex h-8 w-8 items-center justify-center rounded-full bg-brand-pink-soft text-brand-dark">
          <HiSparkles size={18} />
        </Box>
        <Text className="text-lg font-bold tracking-tight text-brand-dark">Nail Spa</Text>
      </Box>
    </Box>
  )
}
