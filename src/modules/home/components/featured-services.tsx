import React from 'react'
import { useNavigate } from 'react-router-dom'
import { Button, Text } from 'zmp-ui'

import { FeaturedService } from '@/mocks/home-data'
import { ROUTE_PATHS } from '@/routing/paths'

type FeaturedServicesProps = {
  services: FeaturedService[]
}

export function FeaturedServices({ services }: FeaturedServicesProps) {
  const navigate = useNavigate()

  return (
    <div>
      <div className="flex items-center justify-between mb-3">
        <Text size="large" className="text-sm font-bold tracking-wide text-text-primary">
          DỊCH VỤ NỔI BẬT
        </Text>
        <button
          className="text-sm border-none bg-transparent text-brand-dark p-0 h-max"
          onClick={() => navigate(ROUTE_PATHS.services)}
        >
          Xem tất cả
        </button>
      </div>

      <div className="hide-scrollbar flex gap-3 py-1 px-0.5 overflow-x-auto">
        {services.map((service) => {
          return (
            <button
              key={service.id}
              onClick={() => navigate(`${ROUTE_PATHS.services}?category=${service.id}`)}
              className="shrink-0 appearance-none border-none bg-white ring-1 ring-pink-400 rounded-full px-4 py-1.5 text-brand-pink"
            >
              {service.label}
            </button>
          )
        })}
      </div>
    </div>
  )
}
