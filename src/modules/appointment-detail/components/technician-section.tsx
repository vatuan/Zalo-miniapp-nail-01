import React from 'react'
import { HiOutlineUser, HiStar } from 'react-icons/hi2'
import { Box, Text } from 'zmp-ui'

import { AppointmentRecord } from '@/mocks/appointment-data'

import { SectionCard } from './section-card'

type TechnicianSectionProps = {
  appointment: AppointmentRecord
  onOpenProfile: () => void
}

export function TechnicianSection({ appointment, onOpenProfile }: TechnicianSectionProps) {
  const initial = appointment.technicianName.trim().slice(0, 1).toUpperCase() || 'K'

  return (
    <SectionCard icon={<HiOutlineUser size={18} />} title="Kỹ thuật viên">
      <button
        type="button"
        onClick={onOpenProfile}
        disabled={!appointment.technicianId}
        className="flex items-center gap-3 border-none bg-transparent p-0 active:scale-[0.99]"
      >
        <Box className="flex h-12 w-12 shrink-0 items-center justify-center overflow-hidden rounded-full bg-brand-pink text-text-inverse">
          {appointment.technicianAvatar ? (
            <img
              src={appointment.technicianAvatar}
              alt={appointment.technicianName}
              className="h-full w-full object-cover"
            />
          ) : (
            <Text className="text-base font-bold text-text-inverse">{initial}</Text>
          )}
        </Box>
        <Box className="text-left">
          <Text className="text-sm font-semibold text-text-primary">{appointment.technicianName}</Text>
          {appointment.technicianRating ? (
            <Box className="mt-0.5 flex items-center gap-1">
              <HiStar size={12} className="text-brand-gold" />
              <Text className="text-xs text-text-primary">{appointment.technicianRating.toFixed(1)}</Text>
            </Box>
          ) : (
            <Text className="text-xs text-text-secondary">Salon sẽ phân công KTV phù hợp</Text>
          )}
        </Box>
      </button>
    </SectionCard>
  )
}
