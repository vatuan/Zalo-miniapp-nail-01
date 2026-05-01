import React from 'react'
import { Box, Text } from 'zmp-ui'

import { BranchStatus } from '@/mocks/branch-data'
import { clsx } from '@/utils/clsx'

const STATUS_LABEL: Record<BranchStatus, string> = {
  open: 'Đang mở',
  closed: 'Đóng cửa',
  opening_soon: 'Chuẩn bị mở',
}

const STATUS_DOT: Record<BranchStatus, string> = {
  open: 'bg-brand-green',
  closed: 'bg-status-danger',
  opening_soon: 'bg-brand-gold',
}

type BranchStatusBadgeProps = {
  status: BranchStatus
}

export function BranchStatusBadge({ status }: BranchStatusBadgeProps) {
  return (
    <Box className="flex items-center gap-1">
      <span className={clsx('inline-block h-2 w-2 rounded-full', STATUS_DOT[status])} />
      <Text className="text-xs text-text-primary">{STATUS_LABEL[status]}</Text>
    </Box>
  )
}
