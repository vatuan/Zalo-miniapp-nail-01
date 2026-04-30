import React from 'react'
import {
  HiOutlineCalendarDays,
  HiOutlineClipboardDocument,
  HiOutlineMapPin,
  HiOutlineSparkles,
  HiOutlineUser,
} from 'react-icons/hi2'
import { Box, Text, useSnackbar } from 'zmp-ui'

import { ConfirmedBooking } from '@/stores/booking-store'
import { clsx } from '@/utils/clsx'

import { formatBookingDate } from '../utils/format-booking'

type BookingReferenceCardProps = {
  booking: ConfirmedBooking
}

function StatusBadge({ status }: { status: ConfirmedBooking['status'] }) {
  if (status === 'confirmed') {
    return (
      <Box className="rounded-full bg-status-success-soft px-2 py-0.5">
        <Text className="text-[11px] font-semibold text-status-success">Đã xác nhận</Text>
      </Box>
    )
  }
  return (
    <Box className="rounded-full bg-status-warning-soft px-2 py-0.5">
      <Text className="text-[11px] font-semibold text-brand-dark">Đang chờ xác nhận</Text>
    </Box>
  )
}

export function BookingReferenceCard({ booking }: BookingReferenceCardProps) {
  const { openSnackbar } = useSnackbar()

  const handleCopyId = async () => {
    try {
      if (typeof navigator !== 'undefined' && navigator.clipboard) {
        await navigator.clipboard.writeText(booking.id)
      }
      openSnackbar({ text: 'Đã sao chép mã lịch hẹn', type: 'success' })
    } catch {
      openSnackbar({ text: 'Không thể sao chép, vui lòng thử lại', type: 'error' })
    }
  }

  const serviceLabel = booking.services.length === 0 ? '—' : booking.services.map((s) => s.name).join(' + ')

  const timeLabel = booking.timeSlot
    ? `${formatBookingDate(booking.dateIso)} – ${booking.timeSlot}`
    : formatBookingDate(booking.dateIso)

  return (
    <Box className="flex flex-col gap-3 rounded-2xl border border-brand-pink-soft bg-card-surface p-4">
      <Box className="flex items-start justify-between gap-2">
        <Box className="min-w-0">
          <Text className="text-[11px] uppercase tracking-widest text-text-secondary">Mã lịch hẹn</Text>
          <button
            type="button"
            onClick={handleCopyId}
            className={clsx(
              'mt-0.5 flex items-center gap-1 rounded-full border-none bg-transparent p-0',
              'text-base font-bold text-brand-pink active:scale-[0.99]',
            )}
          >
            #{booking.id}
            <HiOutlineClipboardDocument size={16} className="text-brand-pink" />
          </button>
        </Box>
        <StatusBadge status={booking.status} />
      </Box>

      <Box className="flex flex-col gap-2 border-t border-border-soft pt-3">
        <Box className="flex items-start gap-2">
          <HiOutlineMapPin size={16} className="mt-0.5 shrink-0 text-brand-pink" />
          <Box className="min-w-0">
            <Text className="text-sm font-semibold text-text-primary">{booking.branch?.name ?? '—'}</Text>
            {booking.branch?.address ? (
              <Text className="text-xs text-text-secondary">{booking.branch.address}</Text>
            ) : null}
          </Box>
        </Box>

        <Box className="flex items-start gap-2">
          <HiOutlineSparkles size={16} className="mt-0.5 shrink-0 text-brand-pink" />
          <Text className="text-sm text-text-primary">{serviceLabel}</Text>
        </Box>

        <Box className="flex items-start gap-2">
          <HiOutlineCalendarDays size={16} className="mt-0.5 shrink-0 text-brand-pink" />
          <Text className="text-sm text-text-primary">{timeLabel}</Text>
        </Box>

        <Box className="flex items-start gap-2">
          <HiOutlineUser size={16} className="mt-0.5 shrink-0 text-brand-pink" />
          <Text className="text-sm text-text-primary">{booking.technicianName}</Text>
        </Box>
      </Box>
    </Box>
  )
}
