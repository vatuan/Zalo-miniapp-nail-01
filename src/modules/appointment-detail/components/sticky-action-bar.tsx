import React from 'react'
import {
  HiOutlineArrowPath,
  HiOutlineChatBubbleLeftRight,
  HiOutlineExclamationTriangle,
  HiOutlineStar,
  HiOutlineXCircle,
} from 'react-icons/hi2'
import { Box, Text } from 'zmp-ui'

import { AppointmentRecord } from '@/mocks/appointment-data'
import { clsx } from '@/utils/clsx'

import { AppointmentTiming } from '../hooks/use-appointment-timing'

type StickyActionBarProps = {
  appointment: AppointmentRecord
  timing: AppointmentTiming
  onReschedule: () => void
  onCancel: () => void
  onRebook: () => void
  onReview: () => void
  onContactSalon: () => void
}

export function StickyActionBar({
  appointment,
  timing,
  onReschedule,
  onCancel,
  onRebook,
  onReview,
  onContactSalon,
}: StickyActionBarProps) {
  const { status } = appointment
  const isUpcoming = status === 'confirmed' || status === 'pending'
  const isCompleted = status === 'completed'
  const isCancelled = status === 'cancelled' || status === 'cancelled_by_salon'

  const showFeeWarning = isUpcoming && timing.isWithin2Hours && !timing.isWithin30Min
  const showStrongWarning = isUpcoming && timing.isWithin30Min
  const canReschedule = isUpcoming && !timing.isWithin30Min && appointment.branchSupportsOnlineReschedule

  return (
    <Box className="sticky -bottom-[0.5px] left-0 right-0 flex flex-col gap-2 border-t border-border-soft bg-surface-primary px-4 py-3 shadow-[0_-2px_8px_rgba(0,0,0,0.08)]">
      {showStrongWarning ? (
        <Box className="flex items-center gap-2 rounded-xl bg-status-error-soft px-3 py-2">
          <HiOutlineExclamationTriangle size={16} className="shrink-0 text-status-error" />
          <Text className="text-xs text-status-error">Lịch còn dưới 30 phút – không thể đổi lịch, hủy sẽ tính phí</Text>
        </Box>
      ) : null}

      {showFeeWarning ? (
        <Box className="flex items-center gap-2 rounded-xl bg-status-warning-soft px-3 py-2">
          <HiOutlineExclamationTriangle size={16} className="shrink-0 text-brand-dark" />
          <Text className="text-xs text-brand-dark">Đổi/Hủy trong 2 giờ trước giờ hẹn sẽ tính phí 20%</Text>
        </Box>
      ) : null}

      {isCompleted && !appointment.hasReviewed ? (
        <button
          type="button"
          onClick={onReview}
          className="flex w-full items-center justify-center gap-2 rounded-full border-none bg-brand-gold px-5 py-3 text-sm font-semibold text-text-inverse active:scale-[0.99]"
        >
          <HiOutlineStar size={18} /> Đánh giá ngay
        </button>
      ) : null}

      {isCompleted || isCancelled ? (
        <button
          type="button"
          onClick={onRebook}
          className="flex w-full items-center justify-center gap-2 rounded-full border-none bg-button-primary-bg px-5 py-3 text-sm font-semibold text-button-primary-fg active:scale-[0.99]"
        >
          <HiOutlineArrowPath size={18} /> {isCancelled ? 'Đặt lịch mới' : 'Đặt lại lịch tương tự'}
        </button>
      ) : null}

      {isUpcoming ? (
        <Box className="flex gap-2">
          {canReschedule ? (
            <button
              type="button"
              onClick={onReschedule}
              className="flex flex-1 items-center justify-center gap-2 rounded-full border border-brand-pink bg-surface-primary px-3 py-3 text-sm font-semibold text-brand-pink active:scale-[0.99]"
            >
              <HiOutlineArrowPath size={16} /> Đổi lịch
            </button>
          ) : !appointment.branchSupportsOnlineReschedule ? (
            <button
              type="button"
              onClick={onContactSalon}
              className="flex flex-1 items-center justify-center gap-2 rounded-full border border-brand-pink bg-surface-primary px-3 py-3 text-sm font-semibold text-brand-pink active:scale-[0.99]"
            >
              <HiOutlineChatBubbleLeftRight size={16} /> Nhắn tin salon để đổi lịch
            </button>
          ) : null}

          <button
            type="button"
            onClick={onCancel}
            className={clsx(
              'flex flex-1 items-center justify-center gap-2 rounded-full border border-status-error bg-status-error-soft px-3 py-3 text-sm font-semibold text-status-error active:scale-[0.99]',
            )}
          >
            <HiOutlineXCircle size={16} /> Hủy lịch
          </button>
        </Box>
      ) : null}
    </Box>
  )
}
