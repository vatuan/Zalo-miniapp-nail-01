import React from 'react'
import { HiOutlineClock, HiOutlineScissors } from 'react-icons/hi2'
import { Box, Text } from 'zmp-ui'

import { NailDetailService } from '@/mocks/nail-detail-data'
import { formatMoney } from '@/utils/format'

type RequiredServicesSectionProps = {
  services: NailDetailService[]
  totalDurationMin: number
  priceFrom: number
}

function ServiceRow({ service }: { service: NailDetailService }) {
  return (
    <Box className="flex items-center gap-3 rounded-xl border border-border-soft bg-surface-primary px-3 py-2.5">
      <HiOutlineScissors size={16} className="shrink-0 text-brand-pink" />
      <Box className="flex flex-1 flex-col gap-0.5">
        <Text className="text-[13px] font-medium text-text-primary">{service.name}</Text>
        <Box className="flex items-center gap-1 text-text-secondary">
          <HiOutlineClock size={12} />
          <Text className="text-[12px]">{service.durationMin} phút</Text>
        </Box>
      </Box>
    </Box>
  )
}

export function RequiredServicesSection({ services, totalDurationMin, priceFrom }: RequiredServicesSectionProps) {
  return (
    <Box className="flex flex-col gap-3">
      <Box className="flex items-center justify-between">
        <Text className="text-[13px] font-semibold uppercase tracking-wide text-text-secondary">Dịch vụ cần thiết</Text>
        <Box className="flex items-center gap-1 text-text-secondary">
          <HiOutlineClock size={13} />
          <Text className="text-[12px]">{totalDurationMin} phút</Text>
        </Box>
      </Box>

      <Box className="flex flex-col gap-2">
        {services.map((svc) => (
          <ServiceRow key={svc.id} service={svc} />
        ))}
      </Box>

      <Box className="flex items-center justify-between rounded-xl bg-brand-cream px-3 py-2">
        <Text className="text-[13px] text-text-secondary">Giá từ</Text>
        <Text className="text-[15px] font-bold text-brand-pink">{formatMoney(priceFrom)}</Text>
      </Box>
    </Box>
  )
}
