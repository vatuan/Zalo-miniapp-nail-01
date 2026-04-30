import { useCallback } from 'react'
import { useSnackbar } from 'zmp-ui'

import { ConfirmedBooking } from '@/stores/booking-store'

import { formatBookingDateLong } from '../utils/format-booking'

function buildShareText(booking: ConfirmedBooking): string {
  const lines: string[] = [
    `Lịch hẹn #${booking.id}`,
    booking.branch?.name ? `Chi nhánh: ${booking.branch.name}` : null,
    booking.services.length > 0 ? `Dịch vụ: ${booking.services.map((s) => s.name).join(', ')}` : null,
    `Ngày: ${formatBookingDateLong(booking.dateIso)}`,
    booking.timeSlot ? `Giờ: ${booking.timeSlot}` : null,
    `KTV: ${booking.technicianName}`,
  ].filter(Boolean) as string[]
  return lines.join('\n')
}

type UseBookingShareResult = {
  addToCalendar: () => void
  shareToZalo: () => void
}

export function useBookingShare(booking: ConfirmedBooking | null): UseBookingShareResult {
  const { openSnackbar } = useSnackbar()

  const addToCalendar = useCallback(() => {
    if (!booking) return
    openSnackbar({ text: 'Đang mở lịch điện thoại...', type: 'success' })
  }, [booking, openSnackbar])

  const shareToZalo = useCallback(() => {
    if (!booking) return
    const text = buildShareText(booking)
    if (typeof navigator !== 'undefined' && navigator.clipboard) {
      navigator.clipboard.writeText(text).catch(() => {})
    }
    openSnackbar({ text: 'Đang mở Zalo để chia sẻ...', type: 'success' })
  }, [booking, openSnackbar])

  return { addToCalendar, shareToZalo }
}
