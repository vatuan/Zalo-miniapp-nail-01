import React from 'react'
import { HiOutlineCalendarDays, HiOutlineSparkles, HiOutlineXCircle } from 'react-icons/hi2'
import { Box, Text } from 'zmp-ui'

import { AppointmentTab } from './tab-bar'

type EmptyStateProps = {
  tab: AppointmentTab
  onPrimaryAction?: () => void
}

const COPY: Record<AppointmentTab, { icon: React.ReactNode; text: string; cta?: string }> = {
  upcoming: {
    icon: <HiOutlineCalendarDays size={28} className="text-brand-pink" />,
    text: 'Chưa có lịch hẹn nào',
    cta: 'Đặt lịch ngay',
  },
  completed: {
    icon: <HiOutlineSparkles size={28} className="text-brand-pink" />,
    text: 'Chưa có lịch nào hoàn thành',
  },
  cancelled: {
    icon: <HiOutlineXCircle size={28} className="text-text-secondary" />,
    text: 'Không có lịch nào bị hủy',
  },
}

export function EmptyState({ tab, onPrimaryAction }: EmptyStateProps) {
  const copy = COPY[tab]
  return (
    <Box className="flex flex-col items-center gap-3 px-6 py-12 text-center">
      <Box className="flex h-16 w-16 items-center justify-center rounded-full bg-brand-pink-ultra-soft">
        {copy.icon}
      </Box>
      <Text className="text-sm text-text-primary">{copy.text}</Text>
      {copy.cta && onPrimaryAction ? (
        <button
          type="button"
          onClick={onPrimaryAction}
          className="rounded-full border-none bg-button-primary-bg px-5 py-2 text-sm font-semibold text-button-primary-fg active:scale-[0.99]"
        >
          {copy.cta}
        </button>
      ) : null}
    </Box>
  )
}
