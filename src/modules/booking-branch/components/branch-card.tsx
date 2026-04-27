import React from 'react'
import { HiCheck, HiOutlineClock, HiOutlineExclamationTriangle, HiStar } from 'react-icons/hi2'
import { Box, Text } from 'zmp-ui'

import { Branch, BranchStatus } from '@/mocks/branch-data'
import { clsx } from '@/utils/clsx'

type BranchCardProps = {
  branch: Branch
  isSelected: boolean
  onSelect: (branch: Branch) => void
}

const STATUS_LABEL: Record<BranchStatus, string> = {
  open: 'Đang mở',
  closed: 'Đã đóng',
  opening_soon: 'Sắp mở',
}

const STATUS_DOT_CLASS: Record<BranchStatus, string> = {
  open: 'bg-brand-green',
  closed: 'bg-status-danger',
  opening_soon: 'bg-brand-gold',
}

function formatDistance(distanceKm: number) {
  return `${distanceKm.toFixed(1)} km`
}

export function BranchCard({ branch, isSelected, onSelect }: BranchCardProps) {
  const isClosed = branch.status === 'closed'
  const statusLabel =
    branch.status === 'opening_soon' && branch.openingHint ? branch.openingHint : STATUS_LABEL[branch.status]
  const showFarWarning = branch.distanceKm !== null && branch.distanceKm > 50

  const handleClick = () => {
    onSelect(branch)
  }

  return (
    <Box
      role="button"
      aria-disabled={isClosed}
      onClick={handleClick}
      className={clsx(
        'relative w-full rounded-lg border bg-card-surface p-3 shadow-sm transition-all',
        isSelected ? 'border-2 border-brand-pink' : 'border border-card-border',
        isClosed ? 'opacity-70' : 'active:scale-[0.99]',
      )}
    >
      {isSelected ? (
        <Box className="absolute right-2 top-2 flex h-6 w-6 items-center justify-center rounded-full bg-brand-pink text-text-inverse">
          <HiCheck size={14} />
        </Box>
      ) : null}

      <Box className="flex gap-3">
        <Box className="h-16 w-16 shrink-0 overflow-hidden rounded-lg bg-surface-muted">
          <img src={branch.imageUrl} alt={branch.name} className="h-full w-full object-cover" />
        </Box>

        <Box className="min-w-0 flex-1">
          <Text className="truncate text-sm font-semibold text-text-primary">{branch.name}</Text>
          <Text className="mt-0.5 truncate text-xs text-text-secondary">{branch.address}</Text>

          <Box className="mt-1.5 flex items-center gap-2 text-xs text-text-secondary">
            <Box className="flex items-center gap-1">
              <span className={clsx('inline-block h-2 w-2 rounded-full', STATUS_DOT_CLASS[branch.status])} />
              <Text className="text-xs text-text-primary">{statusLabel}</Text>
            </Box>
            {branch.distanceKm !== null ? (
              <>
                <Text className="text-xs text-text-secondary">|</Text>
                <Box className="flex items-center gap-1">
                  {showFarWarning ? (
                    <span className="text-brand-dark">
                      <HiOutlineExclamationTriangle size={12} />
                    </span>
                  ) : null}
                  <Text className="text-xs text-text-secondary">{formatDistance(branch.distanceKm)}</Text>
                </Box>
              </>
            ) : null}
          </Box>

          <Box className="mt-1 flex items-center gap-1 text-xs text-text-secondary">
            <span className="text-brand-gold">
              <HiStar size={12} />
            </span>
            <Text className="text-xs text-text-primary">{branch.rating.toFixed(1)}</Text>
            <Text className="text-xs text-text-secondary">({branch.reviewCount} đánh giá)</Text>
          </Box>

          <Box className="mt-1 flex items-center gap-1 text-xs text-text-secondary">
            <HiOutlineClock size={12} />
            <Text className="text-xs text-text-secondary">
              Giờ: {branch.openingTime} – {branch.closingTime}
            </Text>
          </Box>
        </Box>
      </Box>
    </Box>
  )
}
