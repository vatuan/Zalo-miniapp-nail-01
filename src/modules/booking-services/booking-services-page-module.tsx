import React, { useMemo } from 'react'
import { useNavigate } from 'react-router-dom'
import { Box, Text } from 'zmp-ui'

import { useConfigurePageHeader } from '@/layouts/page-layout-context'
import { ROUTE_PATHS } from '@/routing/paths'
import { PageHeader } from '@/shared/components'

export function BookingServicesPageModule() {
  const navigate = useNavigate()

  const headerConfig = useMemo(
    () => ({
      content: <PageHeader title="Đặt Lịch: Chọn Dịch Vụ" onBack={() => navigate(ROUTE_PATHS.bookingBranch)} />,
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
