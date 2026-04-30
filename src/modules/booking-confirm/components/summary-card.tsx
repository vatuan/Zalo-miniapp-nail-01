import React from 'react'
import {
  HiOutlineCalendarDays,
  HiOutlineClock,
  HiOutlineMapPin,
  HiOutlineSparkles,
  HiOutlineUser,
} from 'react-icons/hi2'
import { Box, Text } from 'zmp-ui'

import { Branch } from '@/mocks/branch-data'
import { Service } from '@/mocks/service-data'

import { formatBookingDate, getEndTimeFromSlot } from '../utils/format-date'

type SummaryRowProps = {
  icon: React.ReactNode
  label: string
  primary: React.ReactNode
  secondary?: React.ReactNode
  onEdit: () => void
}

function SummaryRow({ icon, label, primary, secondary, onEdit }: SummaryRowProps) {
  return (
    <Box className="flex items-start gap-3 py-3">
      <Box className="mt-0.5 shrink-0 text-brand-pink">{icon}</Box>
      <Box className="min-w-0 flex-1">
        <Text className="text-[11px] uppercase tracking-widest text-text-secondary">{label}</Text>
        <Text className="text-sm font-semibold text-text-primary">{primary}</Text>
        {secondary ? <Text className="text-xs text-text-secondary">{secondary}</Text> : null}
      </Box>
      <button
        type="button"
        onClick={onEdit}
        className="shrink-0 rounded-full border-none bg-transparent text-xs font-semibold text-brand-pink hover:text-brand-dark"
      >
        Sửa
      </button>
    </Box>
  )
}

type SummaryCardProps = {
  branch: Branch | null
  services: Service[]
  technicianName: string
  totalDurationMin: number
  dateIso: string | null
  timeSlot: string | null
  onEditBranch: () => void
  onEditServices: () => void
  onEditTechnician: () => void
  onEditDate: () => void
}

export function SummaryCard({
  branch,
  services,
  technicianName,
  totalDurationMin,
  dateIso,
  timeSlot,
  onEditBranch,
  onEditServices,
  onEditTechnician,
  onEditDate,
}: SummaryCardProps) {
  const endTime = getEndTimeFromSlot(timeSlot, totalDurationMin)
  const timeRange = timeSlot ? `${timeSlot} – ${endTime}` : '—'

  return (
    <Box className="flex flex-col gap-2">
      <Text className="text-[11px] font-semibold uppercase tracking-widest text-text-secondary">Tóm tắt đặt lịch</Text>
      <Box className="divide-y divide-border-soft rounded-2xl border border-brand-pink-soft bg-card-surface px-4">
        <SummaryRow
          icon={<HiOutlineMapPin size={18} />}
          label="Chi nhánh"
          primary={branch?.name ?? '—'}
          secondary={branch?.address}
          onEdit={onEditBranch}
        />

        <SummaryRow
          icon={<HiOutlineSparkles size={18} />}
          label="Dịch vụ"
          primary={
            services.length === 0 ? (
              '—'
            ) : (
              <Box className="flex flex-col">
                {services.map((service) => (
                  <Text key={service.id} className="text-sm font-semibold text-text-primary">
                    • {service.name}
                  </Text>
                ))}
              </Box>
            )
          }
          secondary={totalDurationMin > 0 ? `Thời gian: ~${totalDurationMin} phút` : undefined}
          onEdit={onEditServices}
        />

        <SummaryRow
          icon={<HiOutlineUser size={18} />}
          label="Kỹ thuật viên"
          primary={technicianName}
          onEdit={onEditTechnician}
        />

        <SummaryRow
          icon={
            <Box className="flex flex-col gap-1">
              <HiOutlineCalendarDays size={18} />
              <HiOutlineClock size={18} />
            </Box>
          }
          label="Ngày & giờ"
          primary={formatBookingDate(dateIso)}
          secondary={timeRange}
          onEdit={onEditDate}
        />
      </Box>
    </Box>
  )
}
