import React, { useMemo } from 'react'
import { useNavigate } from 'react-router-dom'
import { Box, Text } from 'zmp-ui'

import { useConfigurePageHeader } from '@/layouts/page-layout-context'

import { PageHeader } from './page-header'

type ComingSoonPageProps = {
  title: string
}

export function ComingSoonPage({ title }: ComingSoonPageProps) {
  const navigate = useNavigate()

  const headerConfig = useMemo(
    () => ({
      content: <PageHeader title={title} onBack={() => navigate(-1)} />,
    }),
    [navigate, title],
  )

  useConfigurePageHeader(headerConfig)

  return (
    <Box className="flex min-h-[60vh] items-center justify-center px-4 py-6">
      <Text className="text-base text-text-secondary">Coming soon</Text>
    </Box>
  )
}
