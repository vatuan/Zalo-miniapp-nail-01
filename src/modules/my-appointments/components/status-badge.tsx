import React from 'react'
import {
  HiCheckCircle,
  HiOutlineCheckCircle,
  HiOutlineClock,
  HiOutlineXCircle,
  HiXCircle,
} from 'react-icons/hi2'
import { Box, Text } from 'zmp-ui'

import { AppointmentStatus } from '@/mocks/appointment-data'

const STATUS_META: Record<
  AppointmentStatus,
  { label: string; bg: string; text: string; icon: React.ReactNode }
> = {
  confirmed: {
    label: 'Đã xác nhận',
    bg: 'bg-status-success-soft',
    text: 'text-status-success',
    icon: <HiCheckCircle size={12} />,
  },
  pending: {
    label: 'Đang chờ xác nhận',
    bg: 'bg-status-warning-soft',
    text: 'text-brand-dark',
    icon: <HiOutlineClock size={12} />,
  },
  completed: {
    label: 'Hoàn thành',
    bg: 'bg-border-soft',
    text: 'text-text-secondary',
    icon: <HiOutlineCheckCircle size={12} />,
  },
  cancelled: {
    label: 'Đã hủy',
    bg: 'bg-status-error-soft',
    text: 'text-status-error',
    icon: <HiOutlineXCircle size={12} />,
  },
  cancelled_by_salon: {
    label: 'Salon hủy',
    bg: 'bg-status-error-soft',
    text: 'text-status-error',
    icon: <HiXCircle size={12} />,
  },
}

type StatusBadgeProps = {
  status: AppointmentStatus
}

export function StatusBadge({ status }: StatusBadgeProps) {
  const meta = STATUS_META[status]
  return (
    <Box className={`inline-flex items-center gap-1 rounded-full px-2 py-0.5 ${meta.bg}`}>
      <Box className={meta.text}>{meta.icon}</Box>
      <Text className={`text-[11px] font-semibold ${meta.text}`}>{meta.label}</Text>
    </Box>
  )
}
