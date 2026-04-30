import React from 'react'
import { HiOutlineMapPin } from 'react-icons/hi2'
import { Box, Text } from 'zmp-ui'

import { AppointmentRecord } from '@/mocks/appointment-data'

import { SectionCard } from './section-card'

type LocationSectionProps = {
  appointment: AppointmentRecord
  onOpenDirections: () => void
}

export function LocationSection({ appointment, onOpenDirections }: LocationSectionProps) {
  return (
    <SectionCard icon={<HiOutlineMapPin size={18} />} title="Địa điểm">
      <Text className="text-sm font-semibold text-text-primary">{appointment.branchName}</Text>
      <Text className="text-xs text-text-secondary">{appointment.branchAddress}</Text>
      <button
        type="button"
        onClick={onOpenDirections}
        className="mt-1 inline-flex w-fit items-center gap-1 rounded-full border border-brand-pink bg-surface-primary px-3 py-1 text-xs font-semibold text-brand-pink active:scale-[0.99]"
      >
        <HiOutlineMapPin size={14} /> Chỉ đường
      </button>
    </SectionCard>
  )
}
