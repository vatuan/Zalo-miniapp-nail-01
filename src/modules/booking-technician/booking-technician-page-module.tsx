import React, { useMemo } from 'react'
import { useNavigate } from 'react-router-dom'
import { Box, Text } from 'zmp-ui'

import { useConfigurePageHeader } from '@/layouts/page-layout-context'
import { ROUTE_PATHS } from '@/routing/paths'
import { BookingProgressBar, PageHeader } from '@/shared/components'

export function BookingTechnicianPageModule() {
  const navigate = useNavigate()

  const headerConfig = useMemo(
    () => ({
      content: (
        <Box className="w-full">
          <PageHeader title="Đặt Lịch: Chọn Kỹ Thuật Viên" onBack={() => navigate(ROUTE_PATHS.bookingServices)} />
          <BookingProgressBar currentStep={3} totalSteps={5} />
        </Box>
      ),
    }),
    [navigate],
  )

  useConfigurePageHeader(headerConfig)

  return (
    <Box className="flex min-h-[60vh] items-center justify-center px-4 py-6">
      <Text className="text-base text-text-secondary">Coming soon</Text>
    </Box>
  )
}
