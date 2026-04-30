import React from 'react'
import { HiCheckCircle, HiOutlineCheckCircle, HiOutlineClock, HiOutlineXCircle, HiXCircle } from 'react-icons/hi2'
import { Box, Text } from 'zmp-ui'

import { AppointmentStatus } from '@/mocks/appointment-data'

const META: Record<AppointmentStatus, { label: string; bg: string; text: string; icon: React.ReactNode }> = {
  confirmed: {
    label: 'Đã xác nhận',
    bg: 'bg-status-success-soft',
    text: 'text-status-success',
    icon: <HiCheckCircle size={22} />,
  },
  pending: {
    label: 'Đang chờ xác nhận',
    bg: 'bg-status-warning-soft',
    text: 'text-brand-dark',
    icon: <HiOutlineClock size={22} />,
  },
  completed: {
    label: 'Đã hoàn thành',
    bg: 'bg-border-soft',
    text: 'text-text-secondary',
    icon: <HiOutlineCheckCircle size={22} />,
  },
  cancelled: {
    label: 'Khách đã hủy',
    bg: 'bg-status-error-soft',
    text: 'text-status-error',
    icon: <HiOutlineXCircle size={22} />,
  },
  cancelled_by_salon: {
    label: 'Salon đã hủy',
    bg: 'bg-status-error-soft',
    text: 'text-status-error',
    icon: <HiXCircle size={22} />,
  },
}

type StatusBannerProps = {
  status: AppointmentStatus
}

export function StatusBanner({ status }: StatusBannerProps) {
  const meta = META[status]
  return (
    <Box className={`flex items-center gap-3 rounded-2xl px-4 py-3 ${meta.bg}`}>
      <Box className={meta.text}>{meta.icon}</Box>
      <Text className={`text-base font-bold uppercase tracking-wide ${meta.text}`}>{meta.label}</Text>
    </Box>
  )
}
