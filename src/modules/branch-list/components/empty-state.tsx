import React from 'react'
import { HiOutlineMagnifyingGlass } from 'react-icons/hi2'
import { Box, Text } from 'zmp-ui'

export function EmptyState() {
  return (
    <Box className="flex flex-col items-center gap-3 rounded-2xl border border-card-border bg-card-surface px-4 py-10 text-center">
      <Box className="flex h-12 w-12 items-center justify-center rounded-full bg-surface-muted text-text-secondary">
        <HiOutlineMagnifyingGlass size={22} />
      </Box>
      <Text className="text-[14px] text-text-primary">Không tìm thấy chi nhánh</Text>
    </Box>
  )
}
