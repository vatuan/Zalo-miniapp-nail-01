import React from 'react'
import { HiOutlineMagnifyingGlassMinus } from 'react-icons/hi2'
import { Box, Text } from 'zmp-ui'

type EmptySearchStateProps = {
  query: string
}

export function EmptySearchState({ query }: EmptySearchStateProps) {
  return (
    <Box className="flex flex-col items-center justify-center gap-2 px-6 py-12 text-center">
      <Box className="flex h-14 w-14 items-center justify-center rounded-full bg-brand-pink-soft">
        <HiOutlineMagnifyingGlassMinus size={28} className="text-brand-dark" />
      </Box>
      <Text className="text-sm font-semibold text-text-primary">Không tìm thấy dịch vụ</Text>
      <Text className="text-xs text-text-secondary">
        Không có kết quả phù hợp với “{query}”. Thử từ khóa khác nhé.
      </Text>
    </Box>
  )
}
