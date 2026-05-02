import React from 'react'
import { HiCheck } from 'react-icons/hi2'
import { Box, Text } from 'zmp-ui'

export function SuccessAnimation() {
  return (
    <Box className="flex flex-col items-center gap-3 pt-2">
      <Box className="relative flex h-16 w-16 items-center justify-center">
        <Box className="absolute inset-0 animate-ping rounded-full bg-green-300" />
        <Box className="relative flex h-16 w-16 items-center justify-center rounded-full bg-status-success">
          <HiCheck size={35} className="text-text-inverse" strokeWidth={3} />
        </Box>
      </Box>
      <Box className="flex flex-col items-center gap-1 px-6 text-center">
        <Text className="text-lg font-bold text-text-primary">Đặt lịch thành công!</Text>
        <Text className="text-sm text-text-secondary">Salon sẽ xác nhận lại qua Zalo trong ít phút</Text>
      </Box>
    </Box>
  )
}
