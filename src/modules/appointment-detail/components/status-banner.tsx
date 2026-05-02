import React from 'react'
import { HiCheckCircle, HiOutlineCheckCircle, HiOutlineClock, HiOutlineXCircle, HiXCircle } from 'react-icons/hi2'
import { Box, Text } from 'zmp-ui'

import { AppointmentStatus } from '@/mocks/appointment-data'

const META: Record<AppointmentStatus, { label: string; bg: string; text: string; icon: React.ReactNode }> = {
  confirmed: {
    label: 'Đã xác nhận',
    bg: 'bg-status-success-soft',
    text: 'text-green-500',
    icon: <HiCheckCircle size={22} className="flex items-center" />,
  },
  pending: {
    label: 'Đang chờ xác nhận',
    bg: 'bg-status-warning-soft',
    text: 'text-brand-dark',
    icon: <HiOutlineClock size={22} />,
  },
  completed: {
    label: 'Đã hoàn thành',
    bg: 'bg-green-500',
    text: 'text-white',
    icon: <HiOutlineCheckCircle size={22} className="flex items-center" />,
  },
  cancelled: {
    label: 'Khách đã hủy',
    bg: 'bg-red-100',
    text: 'text-red-500',
    icon: <HiOutlineXCircle size={22} className="flex items-center" />,
  },
  cancelled_by_salon: {
    label: 'Salon đã hủy',
    bg: 'bg-red-100',
    text: 'text-red-500',
    icon: <HiXCircle size={22} className="flex items-center" />,
  },
}

type StatusBannerProps = {
  status: AppointmentStatus
}

export function StatusBanner({ status }: StatusBannerProps) {
  const meta = META[status]
  return (
    <Box className={`flex items-center gap-2 rounded-2xl px-4 py-3 ${meta.bg}`}>
      <Box className={meta.text}>{meta.icon}</Box>
      <Text className={`text-base font-bold uppercase tracking-wide ${meta.text}`}>{meta.label}</Text>
    </Box>
  )
}
