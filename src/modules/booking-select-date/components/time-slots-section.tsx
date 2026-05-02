import React from 'react'
import { HiOutlineSparkles } from 'react-icons/hi2'
import { Box, Text } from 'zmp-ui'

import { DAY_PART_LABEL, DayPart } from '@/mocks/service-data'
import { SkeletonLoader } from '@/shared/components'

import { formatVietnameseDate } from '../utils/date'
import { TimeSlot } from '../utils/slots'
import { TimeSlotChip } from './time-slot-chip'

type TimeSlotGroupProps = {
  dayPart: DayPart
  slots: TimeSlot[]
  onSelect: (slot: TimeSlot) => void
}

function TimeSlotGroup({ dayPart, slots, onSelect }: TimeSlotGroupProps) {
  if (slots.length === 0) return null
  return (
    <Box className="flex flex-col gap-2">
      <Text className="text-xs font-semibold uppercase tracking-widest text-brand-pink">{DAY_PART_LABEL[dayPart]}</Text>
      <Box className="grid grid-cols-4 gap-2">
        {slots.map((slot) => (
          <TimeSlotChip key={slot.value} slot={slot} onClick={onSelect} />
        ))}
      </Box>
    </Box>
  )
}

type TimeSlotsSectionProps = {
  pickedDate: Date
  totalDurationMin: number
  slots: TimeSlot[]
  isLoading: boolean
  isHoliday: boolean
  hasAnyAvailable: boolean
  onSelect: (slot: TimeSlot) => void
}

export function TimeSlotsSection({
  pickedDate,
  totalDurationMin,
  slots,
  isLoading,
  isHoliday,
  hasAnyAvailable,
  onSelect,
}: TimeSlotsSectionProps) {
  const morningSlots = slots.filter((s) => s.dayPart === 'morning')
  const afternoonSlots = slots.filter((s) => s.dayPart === 'afternoon')
  const eveningSlots = slots.filter((s) => s.dayPart === 'evening')

  return (
    <Box className="flex flex-col gap-3">
      <Box className="flex items-baseline justify-between">
        <Text className="text-sm font-semibold uppercase tracking-widest text-brand-dark">
          Chọn giờ – {formatVietnameseDate(pickedDate)}
        </Text>
        {totalDurationMin > 0 ? (
          <Text className="rounded-md shadow-md ring-1 px-3 py-1 ring-brand-dark text-xs text-brand-dark">
            ~{totalDurationMin} phút
          </Text>
        ) : null}
      </Box>

      {isLoading ? (
        <Box className="flex flex-col gap-2">
          <SkeletonLoader className="h-9 rounded-full" />
          <SkeletonLoader className="h-9 rounded-full" />
          <SkeletonLoader className="h-9 rounded-full" />
        </Box>
      ) : isHoliday ? (
        <Box className="flex flex-col items-center gap-2 rounded-2xl bg-card-surface px-4 py-8 text-center">
          <HiOutlineSparkles size={20} className="text-brand-dark" />
          <Text className="text-sm text-text-primary">Salon nghỉ ngày này, chọn ngày khác</Text>
        </Box>
      ) : !hasAnyAvailable ? (
        <Box className="flex flex-col items-center gap-2 rounded-2xl bg-card-surface px-4 py-8 text-center">
          <HiOutlineSparkles size={20} className="text-brand-dark" />
          <Text className="text-sm text-text-primary">Ngày này đã kín, chọn ngày khác</Text>
        </Box>
      ) : (
        <Box className="flex flex-col gap-6">
          <TimeSlotGroup dayPart="morning" slots={morningSlots} onSelect={onSelect} />
          <TimeSlotGroup dayPart="afternoon" slots={afternoonSlots} onSelect={onSelect} />
          <TimeSlotGroup dayPart="evening" slots={eveningSlots} onSelect={onSelect} />
        </Box>
      )}
    </Box>
  )
}
