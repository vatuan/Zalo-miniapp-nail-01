import React from 'react'
import { HiOutlineClock, HiStar } from 'react-icons/hi2'
import { Box, Text } from 'zmp-ui'

import { Branch } from '@/mocks/branch-data'

import { BranchActionButtons } from './branch-action-buttons'
import { BranchStatusBadge } from './branch-status-badge'

type BranchCardProps = {
  branch: Branch
  gpsGranted: boolean
  onDirections: (branch: Branch) => void
  onCall: (branch: Branch) => void
  onBook: (branch: Branch) => void
}

export function BranchCard({ branch, gpsGranted, onDirections, onCall, onBook }: BranchCardProps) {
  return (
    <Box className="flex flex-col gap-3 rounded-2xl border border-card-border bg-card-surface p-3 shadow-sm">
      <Box className="flex gap-3">
        <Box className="h-20 w-20 shrink-0 overflow-hidden rounded-xl bg-surface-muted">
          <img src={branch.imageUrl} alt={branch.name} className="h-full w-full object-cover" />
        </Box>

        <Box className="flex min-w-0 flex-1 flex-col gap-1">
          <Text className="truncate text-[14px] font-semibold text-text-primary">{branch.name}</Text>
          <Text className="line-clamp-2 text-[12px] text-text-secondary">{branch.address}</Text>

          <Box className="flex flex-wrap items-center gap-x-2 gap-y-1 text-xs">
            <BranchStatusBadge status={branch.status} />

            <Box className="flex items-center gap-1">
              <HiOutlineClock size={12} className="text-text-secondary" />
              <Text className="text-[12px] text-text-secondary">
                {branch.openingTime}–{branch.closingTime}
              </Text>
            </Box>
          </Box>

          <Box className="flex items-center gap-3 text-xs">
            <Box className="flex items-center gap-1">
              <HiStar size={12} className="text-brand-gold" />
              <Text className="text-[12px] text-text-primary">{branch.rating.toFixed(1)}</Text>
            </Box>

            {gpsGranted && branch.distanceKm !== null ? (
              <Text className="text-[12px] text-text-secondary">{branch.distanceKm.toFixed(1)} km</Text>
            ) : null}
          </Box>
        </Box>
      </Box>

      <BranchActionButtons
        onDirections={() => onDirections(branch)}
        onCall={() => onCall(branch)}
        onBook={() => onBook(branch)}
      />
    </Box>
  )
}
