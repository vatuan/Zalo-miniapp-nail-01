import 'react-calendar/dist/Calendar.css'

import React from 'react'
import Calendar from 'react-calendar'
import { HiChevronLeft, HiChevronRight, HiOutlineExclamationTriangle } from 'react-icons/hi2'
import { Box, Text } from 'zmp-ui'

import { getMockBookedSlots, isHoliday } from '@/mocks/service-data'

import { isSameDay, toIsoDate } from '../utils/date'

type CalendarSectionProps = {
  pickedDate: Date
  today: Date
  holidayLabel: string | null
  onSelectDate: (date: Date) => void
}

export function CalendarSection({ pickedDate, today, holidayLabel, onSelectDate }: CalendarSectionProps) {
  const isDateDisabled = (date: Date) => {
    if (date.getTime() < today.getTime() && !isSameDay(date, today)) return true
    return isHoliday(toIsoDate(date))
  }

  const renderTileContent = ({ date, view }: { date: Date; view: string }) => {
    if (view !== 'month') return null
    const iso = toIsoDate(date)
    if (isHoliday(iso)) return null
    if (date.getTime() < today.getTime() && !isSameDay(date, today)) return null
    const booked = getMockBookedSlots(iso)
    if (booked.length >= 16) return null
    return <span className="mx-auto mt-0.5 block h-1 w-1 rounded-full bg-brand-pink" aria-hidden />
  }

  return (
    <Box
      className={[
        'flex flex-col gap-2',
        '[&_.react-calendar]:!w-full [&_.react-calendar]:!border-none [&_.react-calendar]:!bg-transparent [&_.react-calendar]:!font-inherit',
        '[&_.react-calendar__navigation]:!mb-2 [&_.react-calendar__navigation_button]:!text-text-primary [&_.react-calendar__navigation_button]:!min-w-[36px] [&_.react-calendar__navigation_button]:!bg-transparent',
        '[&_.react-calendar__navigation_button:disabled]:!opacity-40',
        '[&_.react-calendar__month-view__weekdays]:!text-[10px] [&_.react-calendar__month-view__weekdays]:!font-semibold [&_.react-calendar__month-view__weekdays]:!uppercase [&_.react-calendar__month-view__weekdays]:!text-text-secondary',
        '[&_.react-calendar__month-view__weekdays_abbr]:!no-underline',
        '[&_.react-calendar__tile]:!rounded-full [&_.react-calendar__tile]:!py-2 [&_.react-calendar__tile]:!text-text-primary',
        '[&_.react-calendar__tile:disabled]:!bg-transparent [&_.react-calendar__tile:disabled]:!text-text-secondary [&_.react-calendar__tile:disabled]:!opacity-40 [&_.react-calendar__tile:disabled]:!line-through',
        '[&_.react-calendar__tile:enabled:hover]:!bg-brand-pink-ultra-soft',
        '[&_.react-calendar__tile--now]:!bg-brand-pink-ultra-soft [&_.react-calendar__tile--now]:!text-brand-pink [&_.react-calendar__tile--now]:!font-semibold',
        '[&_.react-calendar__tile--active]:!bg-brand-pink [&_.react-calendar__tile--active]:!text-text-inverse',
        '[&_.react-calendar__tile--active:enabled:hover]:!bg-brand-pink',
        '[&_.react-calendar__tile--active_.bg-brand-pink]:!bg-text-inverse',
      ].join(' ')}
    >
      <Text className="font-semibold text-sm uppercase tracking-widest text-brand-dark">Chọn ngày</Text>
      <Box className="rounded-md border border-brand-pink-soft bg-card-surface p-2">
        <Calendar
          value={pickedDate}
          onChange={(value) => {
            const next = Array.isArray(value) ? value[0] : value
            if (next instanceof Date) onSelectDate(next)
          }}
          tileDisabled={({ date, view }) => view === 'month' && isDateDisabled(date)}
          tileContent={renderTileContent}
          locale="vi-VN"
          minDetail="month"
          maxDetail="month"
          showNeighboringMonth={false}
          minDate={today}
          prevLabel={<HiChevronLeft size={16} />}
          nextLabel={<HiChevronRight size={16} />}
          prev2Label={null}
          next2Label={null}
        />
      </Box>
      {holidayLabel ? (
        <Box className="flex items-center gap-2 rounded-xl bg-status-warning-soft px-3 py-2">
          <HiOutlineExclamationTriangle size={16} className="shrink-0 text-brand-dark" />
          <Text className="text-xs font-semibold text-brand-dark">{holidayLabel} — Salon đóng cửa</Text>
        </Box>
      ) : null}
    </Box>
  )
}
