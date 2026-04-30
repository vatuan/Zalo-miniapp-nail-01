import React from 'react'
import { HiOutlineXCircle } from 'react-icons/hi2'
import { Box, Text } from 'zmp-ui'

type AlreadyCancelledStateProps = {
  reason?: string
  onBack: () => void
}

export function AlreadyCancelledState({ reason, onBack }: AlreadyCancelledStateProps) {
  return (
    <Box className="flex flex-1 flex-col items-center justify-center gap-3 px-6 py-10 text-center">
      <Box className="flex h-12 w-12 items-center justify-center rounded-full bg-status-error-soft text-status-error">
        <HiOutlineXCircle size={22} />
      </Box>
      <Text className="text-sm font-semibold text-text-primary">Lịch này đã được salon hủy trước đó</Text>
      {reason ? <Text className="text-xs text-text-secondary">Lý do: {reason}</Text> : null}
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
