import React from 'react'
import { HiOutlineExclamationTriangle } from 'react-icons/hi2'
import { Box, Text } from 'zmp-ui'

import { AppointmentRecord } from '@/mocks/appointment-data'

import { formatAppointmentDate } from '../utils/format-date'

type WarningCardProps = {
  appointment: AppointmentRecord
}

export function WarningCard({ appointment }: WarningCardProps) {
  const serviceText = appointment.services.map((s) => s.name).join(' + ')
  return (
    <Box className="flex items-start gap-3 rounded-2xl bg-status-warning-soft px-4 py-3">
      <Box className="mt-0.5 shrink-0 text-brand-dark">
        <HiOutlineExclamationTriangle size={22} />
      </Box>
      <Box className="min-w-0 flex-1">
        <Text className="text-sm font-bold text-brand-dark">Bạn muốn hủy lịch này?</Text>
        <Text className="text-xs text-text-primary">
          {formatAppointmentDate(appointment.dateIso)} – {appointment.startTime}
        </Text>
        <Text className="text-xs text-text-secondary">{serviceText}</Text>
      </Box>
    </Box>
  )
}
