import React from 'react'
import { HiOutlineCalendarDays } from 'react-icons/hi2'
import { Box, Text } from 'zmp-ui'

import { AppointmentRecord } from '@/mocks/appointment-data'

import { formatLongDate } from '../utils/format'

import { SectionCard } from './section-card'

type TimeSectionProps = {
  appointment: AppointmentRecord
}

export function TimeSection({ appointment }: TimeSectionProps) {
  return (
    <SectionCard icon={<HiOutlineCalendarDays size={18} />} title="Thời gian">
      <Text className="text-sm font-semibold text-text-primary">{formatLongDate(appointment.dateIso)}</Text>
      <Text className="text-sm text-text-secondary">
        {appointment.startTime} – {appointment.endTime} ({appointment.durationMin} phút)
      </Text>
    </SectionCard>
  )
}
