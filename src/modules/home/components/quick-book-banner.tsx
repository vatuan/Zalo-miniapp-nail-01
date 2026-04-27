import React from 'react'
import { HiOutlineArrowLongRight } from 'react-icons/hi2'
import { useNavigate } from 'react-router-dom'
import { Box, Text } from 'zmp-ui'

import { ROUTE_PATHS } from '@/routing/paths'

export function QuickBookBanner() {
  const navigate = useNavigate()

  return (
    <Box
      role="button"
      className="rounded-xl bg-gradient-to-r from-brand-pink to-brand-dark p-4 shadow-sm transition-transform active:scale-[0.99]"
      onClick={() => navigate(ROUTE_PATHS.booking)}
    >
      <Box className="flex items-center justify-center text-text-inverse">
        <Text className="text-sm font-semibold tracking-wide text-text-inverse">ĐẶT LỊCH NGAY</Text>
      </Box>
    </Box>
  )
}
