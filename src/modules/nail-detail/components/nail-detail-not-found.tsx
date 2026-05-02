import React from 'react'
import { HiOutlinePhoto } from 'react-icons/hi2'
import { Box, Text } from 'zmp-ui'

type NailDetailNotFoundProps = {
  onBack: () => void
}

export function NailDetailNotFound({ onBack }: NailDetailNotFoundProps) {
  return (
    <Box className="flex flex-1 flex-col items-center justify-center gap-4 px-8 py-16 text-center">
      <HiOutlinePhoto size={56} className="text-border-default" />
      <Box className="flex flex-col gap-1">
        <Text className="text-base font-semibold text-text-primary">Không tìm thấy mẫu nail</Text>
        <Text className="text-sm text-text-secondary">Mẫu này không tồn tại hoặc đã bị xoá.</Text>
      </Box>
      <button
        type="button"
        onClick={onBack}
        className="rounded-full border-none ring-1 ring-brand-pink bg-transparent px-6 py-2 text-sm font-semibold text-brand-pink"
      >
        Quay lại Gallery
      </button>
    </Box>
  )
}
