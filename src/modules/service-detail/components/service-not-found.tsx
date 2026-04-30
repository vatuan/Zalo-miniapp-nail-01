import React from 'react'
import { HiOutlineFaceFrown } from 'react-icons/hi2'
import { Box, Text } from 'zmp-ui'

type ServiceNotFoundProps = {
  onBack: () => void
}

export function ServiceNotFound({ onBack }: ServiceNotFoundProps) {
  return (
    <Box className="flex flex-1 flex-col items-center justify-center gap-3 px-6 py-10 text-center">
      <Box className="flex h-14 w-14 items-center justify-center rounded-full bg-brand-pink-soft text-brand-dark">
        <HiOutlineFaceFrown size={28} />
      </Box>
      <Text className="text-sm font-semibold text-text-primary">Không tìm thấy dịch vụ</Text>
      <Text className="text-xs text-text-secondary">Dịch vụ này không tồn tại hoặc đã bị gỡ.</Text>
      <button
        type="button"
        onClick={onBack}
        className="mt-2 rounded-full border-none bg-button-primary-bg px-5 py-2 text-xs font-semibold text-button-primary-fg"
      >
        Quay lại danh sách
      </button>
    </Box>
  )
}
