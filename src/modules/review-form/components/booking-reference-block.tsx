import React from 'react'
import { HiOutlineCalendarDays, HiOutlineScissors } from 'react-icons/hi2'
import { Box, Text } from 'zmp-ui'

import { BookingRef } from '@/mocks/review-form-data'
import { formatTime } from '@/utils/format'

type BookingReferenceBlockProps = {
  bookingRef: BookingRef
}

export function BookingReferenceBlock({ bookingRef }: BookingReferenceBlockProps) {
  return (
    <Box className="flex flex-col gap-2 rounded-xl border border-border-soft bg-surface-primary p-4">
      <Box className="flex items-center gap-2">
        <HiOutlineScissors size={14} className="shrink-0 text-brand-pink" />
        <Text className="text-[13px] font-medium text-text-primary">
          {bookingRef.serviceName} • {bookingRef.ktvName}
        </Text>
      </Box>
      <Box className="flex items-center gap-2">
        <HiOutlineCalendarDays size={14} className="shrink-0 text-text-secondary" />
        <Text className="text-[12px] text-text-secondary">
          {formatTime(bookingRef.dateIso, 'DD/MM/YYYY')}
        </Text>
      </Box>
    </Box>
  )
}
