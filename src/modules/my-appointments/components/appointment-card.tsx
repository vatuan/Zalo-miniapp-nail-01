import React from 'react'
import {
  HiOutlineMapPin,
  HiOutlineSparkles,
  HiOutlineStar,
  HiOutlineUser,
} from 'react-icons/hi2'
import { Box, Text } from 'zmp-ui'

import { AppointmentRecord } from '@/mocks/appointment-data'
import { clsx } from '@/utils/clsx'

import { formatAppointmentDate } from '../utils/format-date'

import { StatusBadge } from './status-badge'

type AppointmentCardProps = {
  appointment: AppointmentRecord
  onOpenDetail: (id: string) => void
  onCancel?: (id: string) => void
  onRebook?: (id: string) => void
  onReview?: (id: string) => void
}

export function AppointmentCard({
  appointment,
  onOpenDetail,
  onCancel,
  onRebook,
  onReview,
}: AppointmentCardProps) {
  const isUpcoming = appointment.status === 'confirmed' || appointment.status === 'pending'
  const isCompleted = appointment.status === 'completed'
  const isCancelledBySalon = appointment.status === 'cancelled_by_salon'
  const showReviewCta = isCompleted && !appointment.hasReviewed

  return (
    <Box
      role="button"
      onClick={() => onOpenDetail(appointment.id)}
      className="flex flex-col gap-2 rounded-2xl border border-brand-pink-soft bg-card-surface p-4 shadow-sm transition-all active:scale-[0.99]"
    >
      <Box className="flex items-start justify-between gap-2">
        <StatusBadge status={appointment.status} />
        <Text className="text-[11px] text-text-secondary">#{appointment.id}</Text>
      </Box>

      <Text className="text-sm font-semibold text-text-primary">
        {formatAppointmentDate(appointment.dateIso)} – {appointment.startTime}
      </Text>

      <Box className="flex items-start gap-2">
        <HiOutlineSparkles size={14} className="mt-0.5 shrink-0 text-brand-pink" />
        <Text className="line-clamp-2 text-sm text-text-primary">
          {appointment.services.map((s) => s.name).join(' + ')}
        </Text>
      </Box>

      <Box className="flex items-center gap-2">
        <HiOutlineUser size={14} className="shrink-0 text-brand-pink" />
        <Text className="text-xs text-text-primary">{appointment.technicianName}</Text>
        <Text className="text-xs text-text-secondary">•</Text>
        <HiOutlineMapPin size={14} className="shrink-0 text-text-secondary" />
        <Text className="line-clamp-1 text-xs text-text-secondary">{appointment.branchName}</Text>
      </Box>

      {appointment.cancelReason ? (
        <Text className="text-xs italic text-text-secondary">Lý do: {appointment.cancelReason}</Text>
      ) : null}

      {showReviewCta ? (
        <button
          type="button"
          onClick={(event) => {
            event.stopPropagation()
            onReview?.(appointment.id)
          }}
          className="flex items-center justify-center gap-1 rounded-full border-none bg-brand-gold px-3 py-2 text-xs font-semibold text-text-inverse active:scale-[0.99]"
        >
          <HiOutlineStar size={14} /> Đánh giá ngay
        </button>
      ) : null}

      <Box className="flex gap-2 pt-1">
        <button
          type="button"
          onClick={(event) => {
            event.stopPropagation()
            onOpenDetail(appointment.id)
          }}
          className="flex-1 rounded-full border border-brand-pink-soft bg-surface-primary px-3 py-2 text-xs font-semibold text-text-primary active:scale-[0.99]"
        >
          Xem chi tiết
        </button>

        {isUpcoming && onCancel ? (
          <button
            type="button"
            onClick={(event) => {
              event.stopPropagation()
              onCancel(appointment.id)
            }}
            className={clsx(
              'flex-1 rounded-full border border-status-error bg-surface-primary px-3 py-2 text-xs font-semibold text-status-error active:scale-[0.99]',
            )}
          >
            Hủy lịch
          </button>
        ) : null}

        {isCompleted && onRebook ? (
          <button
            type="button"
            onClick={(event) => {
              event.stopPropagation()
              onRebook(appointment.id)
            }}
            className="flex-1 rounded-full border-none bg-brand-pink px-3 py-2 text-xs font-semibold text-text-inverse active:scale-[0.99]"
          >
            Đặt lại
          </button>
        ) : null}

        {isCancelledBySalon && onRebook ? (
          <button
            type="button"
            onClick={(event) => {
              event.stopPropagation()
              onRebook(appointment.id)
            }}
            className="flex-1 rounded-full border-none bg-brand-pink px-3 py-2 text-xs font-semibold text-text-inverse active:scale-[0.99]"
          >
            Đặt lịch mới
          </button>
        ) : null}
      </Box>
    </Box>
  )
}
