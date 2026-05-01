import React, { useCallback, useMemo } from 'react'
import { useNavigate } from 'react-router-dom'
import { Box } from 'zmp-ui'

import { useConfigurePageHeader } from '@/layouts/page-layout-context'
import { PageHeader } from '@/shared/components'

import { BenefitsList } from './components/benefits-list'
import { ExpiryBanner } from './components/expiry-banner'
import { MembershipCard } from './components/membership-card'
import { PointHistory } from './components/point-history'
import { RedeemSection } from './components/redeem-section'
import { TierProgress } from './components/tier-progress'

export function LoyaltyPageModule() {
  const navigate = useNavigate()
  const handleBack = useCallback(() => navigate(-1), [navigate])

  const headerConfig = useMemo(
    () => ({
      content: (
        <Box className="w-full">
          <PageHeader title="Thành viên thân thiết" onBack={handleBack} />
        </Box>
      ),
    }),
    [handleBack],
  )

  useConfigurePageHeader(headerConfig)

  return (
    <Box className="flex min-h-full flex-col bg-app-bg">
      <ExpiryBanner />

      <Box className="flex flex-col gap-4 px-4 py-4 pb-8">
        <MembershipCard />
        <TierProgress />
        <BenefitsList />
        <RedeemSection />
        <PointHistory />
      </Box>
    </Box>
  )
}
