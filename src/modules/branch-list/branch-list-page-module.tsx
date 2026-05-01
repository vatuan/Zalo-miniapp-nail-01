import React, { useCallback, useMemo } from 'react'
import { useNavigate } from 'react-router-dom'
import { Box } from 'zmp-ui'

import { useConfigurePageHeader } from '@/layouts/page-layout-context'
import { PageHeader } from '@/shared/components'

import { BranchCard } from './components/branch-card'
import { BranchSearch } from './components/branch-search'
import { EmptyState } from './components/empty-state'
import { GpsBanner } from './components/gps-banner'
import { useBranchActions } from './hooks/use-branch-actions'
import { useBranchSearch } from './hooks/use-branch-search'
import { useGpsPermission } from './hooks/use-gps-permission'

export function BranchListPageModule() {
  const navigate = useNavigate()
  const { gpsGranted, requestGps } = useGpsPermission()
  const { searchQuery, setSearchQuery, filtered } = useBranchSearch(gpsGranted)
  const { openDirections, callBranch, bookBranch } = useBranchActions()

  const handleBack = useCallback(() => navigate(-1), [navigate])

  const headerConfig = useMemo(
    () => ({
      content: (
        <Box className="w-full">
          <PageHeader title="Chi nhánh" onBack={handleBack} />
        </Box>
      ),
    }),
    [handleBack],
  )

  useConfigurePageHeader(headerConfig)

  return (
    <Box className="flex min-h-full flex-col bg-app-bg">
      <Box className="flex flex-col gap-3 px-4 pt-4 pb-8">
        {!gpsGranted ? <GpsBanner onEnable={requestGps} /> : null}

        <BranchSearch value={searchQuery} onChange={setSearchQuery} />

        {filtered.length === 0 ? (
          <EmptyState />
        ) : (
          <Box className="flex flex-col gap-3">
            {filtered.map((branch) => (
              <BranchCard
                key={branch.id}
                branch={branch}
                gpsGranted={gpsGranted}
                onDirections={openDirections}
                onCall={callBranch}
                onBook={bookBranch}
              />
            ))}
          </Box>
        )}
      </Box>
    </Box>
  )
}
