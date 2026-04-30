import React from 'react'
import { HiOutlineSparkles } from 'react-icons/hi2'
import { Box, Text } from 'zmp-ui'

import { AppointmentRecord } from '@/mocks/appointment-data'
import { formatMoney } from '@/utils/format'

import { SectionCard } from './section-card'

type ServicesSectionProps = {
  appointment: AppointmentRecord
}

export function ServicesSection({ appointment }: ServicesSectionProps) {
  return (
    <SectionCard icon={<HiOutlineSparkles size={18} />} title="Dịch vụ">
      <Box className="flex flex-col gap-1">
        {appointment.services.map((service) => (
          <Box key={service.name} className="flex items-center justify-between gap-2">
            <Text className="line-clamp-1 text-sm text-text-primary">{service.name}</Text>
            <Text className="text-sm text-text-primary">{formatMoney(service.price)}</Text>
          </Box>
        ))}
      </Box>
      <Box className="mt-1 flex items-center justify-between border-t border-border-soft pt-2">
        <Text className="text-sm font-semibold text-text-primary">Tổng ước tính</Text>
        <Text className="text-base font-bold text-brand-pink">{formatMoney(appointment.totalPrice)}</Text>
      </Box>
    </SectionCard>
  )
}
