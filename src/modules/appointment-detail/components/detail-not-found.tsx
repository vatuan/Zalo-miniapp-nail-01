import React from 'react'
import { HiOutlineExclamationTriangle } from 'react-icons/hi2'
import { Box, Text } from 'zmp-ui'

type DetailNotFoundProps = {
  onBack: () => void
}

export function DetailNotFound({ onBack }: DetailNotFoundProps) {
  return (
    <Box className="flex flex-1 flex-col items-center justify-center gap-3 px-6 py-10 text-center">
      <Box className="flex h-12 w-12 items-center justify-center rounded-full bg-status-warning-soft text-brand-dark">
        <HiOutlineExclamationTriangle size={22} />
      </Box>
      <Text className="text-sm text-text-primary">Không tìm thấy lịch hẹn này</Text>
      <button
        type="button"
        onClick={onBack}
        className="rounded-full border-none bg-button-primary-bg px-5 py-2 text-sm font-semibold text-button-primary-fg active:scale-[0.99]"
      >
        Quay lại
      </button>
    </Box>
  )
}
