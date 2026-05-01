import React from 'react'
import { Box, Text } from 'zmp-ui'

import { Promo } from '@/mocks/promotions-data'

import { PromoCard } from './promo-card'

type PromoSectionProps = {
  title: string
  promos: Promo[]
}

export function PromoSection({ title, promos }: PromoSectionProps) {
  if (promos.length === 0) return null

  return (
    <Box className="flex flex-col gap-3">
      <Text className="text-[12px] font-bold uppercase tracking-wider text-text-secondary">{title}</Text>
      {promos.map((promo) => (
        <PromoCard key={promo.id} promo={promo} />
      ))}
    </Box>
  )
}
