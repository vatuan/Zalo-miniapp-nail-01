import React from 'react'
import { Box, Text } from 'zmp-ui'

import { AppointmentRecord } from '@/mocks/appointment-data'

import { AppointmentCard } from './appointment-card'

type MonthGroupSectionProps = {
  monthLabel: string
  appointments: AppointmentRecord[]
  onOpenDetail: (id: string) => void
  onCancel?: (id: string) => void
  onRebook?: (id: string) => void
  onReview?: (id: string) => void
}

export function MonthGroupSection({
  monthLabel,
  appointments,
  onOpenDetail,
  onCancel,
  onRebook,
  onReview,
}: MonthGroupSectionProps) {
  return (
    <Box className="flex flex-col gap-2">
      <Box className="sticky top-11 z-[5] -mx-4 bg-app-bg px-4 py-2">
        <Text className="text-[11px] font-semibold uppercase tracking-widest text-text-secondary">{monthLabel}</Text>
      </Box>
      <Box className="flex flex-col gap-3">
        {appointments.map((appt) => (
          <AppointmentCard
            key={appt.id}
            appointment={appt}
            onOpenDetail={onOpenDetail}
            onCancel={onCancel}
            onRebook={onRebook}
            onReview={onReview}
          />
        ))}
      </Box>
    </Box>
  )
}
