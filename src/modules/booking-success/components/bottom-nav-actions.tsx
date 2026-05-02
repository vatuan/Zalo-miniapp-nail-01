import React from 'react'
import { HiOutlineCalendarDays, HiOutlineHome } from 'react-icons/hi2'
import { Box } from 'zmp-ui'

import { clsx } from '@/utils/clsx'

type BottomNavActionsProps = {
  onGoHome: () => void
  onViewAppointments: () => void
}

export function BottomNavActions({ onGoHome, onViewAppointments }: BottomNavActionsProps) {
  return (
    <Box className="sticky -bottom-[0.5px] left-0 right-0 flex flex-col gap-2 border-t border-border-soft bg-surface-primary px-4 py-3 shadow-[0_-2px_8px_rgba(0,0,0,0.08)]">
      <button
        type="button"
        onClick={onGoHome}
        className={clsx(
          'flex px-4 items-center justify-center gap-2 rounded-full border-none py-3 text-sm font-semibold',
          'bg-button-primary-bg text-button-primary-fg active:scale-[0.99]',
        )}
      >
        <HiOutlineHome size={18} /> Về trang chủ
      </button>
      <button
        type="button"
        onClick={onViewAppointments}
        className={clsx(
          'flex items-center justify-center gap-2 rounded-full border-none ring-1 ring-brand-pink bg-surface-primary py-3 text-sm font-semibold text-brand-pink active:scale-[0.99]',
        )}
      >
        <HiOutlineCalendarDays size={18} /> Xem lịch hẹn của tôi
      </button>
    </Box>
  )
}
