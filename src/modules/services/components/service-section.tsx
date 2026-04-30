import React, { forwardRef, ReactNode } from 'react'
import { Box, Text } from 'zmp-ui'

import { ServiceCategory } from '@/mocks/service-data'

import { CATEGORY_ICON } from '../category-icon-map'

type ServiceSectionProps = {
  categoryId: ServiceCategory
  iconKey: ServiceCategory
  label: string
  children: ReactNode
}

export const ServiceSection = forwardRef<HTMLDivElement, ServiceSectionProps>(function ServiceSection(
  { categoryId, iconKey, label, children },
  ref,
) {
  const Icon = CATEGORY_ICON[iconKey]

  return (
    <div ref={ref} data-category={categoryId} className="flex scroll-mt-20 flex-col gap-2">
      <Box className="flex items-center gap-1.5">
        <Icon size={14} className="text-brand-dark" />
        <Text className="text-xs font-semibold uppercase tracking-widest text-text-secondary">{label}</Text>
      </Box>
      <Box className="flex flex-col gap-3">{children}</Box>
    </div>
  )
})
