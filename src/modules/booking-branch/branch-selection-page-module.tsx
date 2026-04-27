import React, { useEffect, useMemo, useState } from 'react'
import { HiOutlineMagnifyingGlass } from 'react-icons/hi2'
import { useNavigate } from 'react-router-dom'
import { Box, Text, useSnackbar } from 'zmp-ui'

import { useConfigurePageHeader } from '@/layouts/page-layout-context'
import { Branch, mockBranches, mockGpsAvailable } from '@/mocks/branch-data'
import { ROUTE_PATHS } from '@/routing/paths'
import { PageHeader, SkeletonLoader } from '@/shared/components'
import { useBookingStore } from '@/stores/booking-store'

import { BookingProgressBar } from './components/booking-progress-bar'
import { BranchCard } from './components/branch-card'
import { BranchSearchInput } from './components/branch-search-input'
import { GpsPermissionBanner } from './components/gps-permission-banner'

const LOADING_DURATION_MS = 1000
const SELECT_NAVIGATE_DELAY_MS = 300

const COMBINING_DIACRITICS = /[̀-ͯ]/g

function normalizeText(value: string) {
  return value.toLowerCase().normalize('NFD').replace(COMBINING_DIACRITICS, '').replace(/đ/g, 'd')
}

function matchesSearch(branch: Branch, query: string) {
  const normalizedQuery = normalizeText(query.trim())

  if (!normalizedQuery) {
    return true
  }

  return (
    normalizeText(branch.name).includes(normalizedQuery) || normalizeText(branch.district).includes(normalizedQuery)
  )
}

export function BranchSelectionPageModule() {
  const navigate = useNavigate()
  const { openSnackbar } = useSnackbar()

  const selectedBranch = useBookingStore((state) => state.selectedBranch)
  const setSelectedBranch = useBookingStore((state) => state.setSelectedBranch)

  const [isLoading, setIsLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState('')
  const [gpsGranted, setGpsGranted] = useState(mockGpsAvailable)
  const [pendingSelectionId, setPendingSelectionId] = useState<string | null>(selectedBranch?.id ?? null)

  const headerConfig = useMemo(
    () => ({
      content: (
        <Box className="w-full">
          <PageHeader title="Đặt lịch" onBack={() => navigate(-1)} />
          <BookingProgressBar currentStep={1} totalSteps={5} />
        </Box>
      ),
    }),
    [navigate],
  )

  useConfigurePageHeader(headerConfig)

  useEffect(() => {
    if (mockBranches.length === 1) {
      const onlyBranch = mockBranches[0]
      setSelectedBranch(onlyBranch)
      openSnackbar({
        text: `Đã chọn chi nhánh: ${onlyBranch.name}`,
        type: 'success',
      })
      navigate(ROUTE_PATHS.bookingServices, { replace: true })
      return
    }

    const timer = window.setTimeout(() => setIsLoading(false), LOADING_DURATION_MS)
    return () => window.clearTimeout(timer)
  }, [navigate, openSnackbar, setSelectedBranch])

  const handleSelect = (branch: Branch) => {
    if (branch.status === 'closed') {
      openSnackbar({
        text: 'Chi nhánh này đang đóng cửa',
        type: 'warning',
      })
      return
    }

    setPendingSelectionId(branch.id)
    setSelectedBranch(branch)

    window.setTimeout(() => {
      navigate(ROUTE_PATHS.bookingServices)
    }, SELECT_NAVIGATE_DELAY_MS)
  }

  const isSearching = searchQuery.trim().length > 0
  const filteredBranches = useMemo(
    () => mockBranches.filter((branch) => matchesSearch(branch, searchQuery)),
    [searchQuery],
  )
  const nearbyBranches = useMemo(() => mockBranches.filter((branch) => branch.isNearby), [])
  const showNearbySection = gpsGranted && nearbyBranches.length > 0 && !isSearching

  return (
    <Box className="flex flex-col gap-4 bg-app-bg px-4 pb-6 pt-4">
      <Box className="flex flex-col gap-3">
        <Text className="text-base font-semibold text-text-primary">Chọn chi nhánh</Text>
        <BranchSearchInput value={searchQuery} onChange={setSearchQuery} />
        {!gpsGranted ? <GpsPermissionBanner onEnable={() => setGpsGranted(true)} /> : null}
      </Box>

      {isLoading ? (
        <Box className="flex flex-col gap-3">
          <SkeletonLoader className="h-24 rounded-lg" />
          <SkeletonLoader className="h-24 rounded-lg" />
          <SkeletonLoader className="h-24 rounded-lg" />
        </Box>
      ) : isSearching ? (
        <Box className="flex flex-col gap-3">
          <Text className="text-xs font-semibold uppercase tracking-widest text-text-secondary">
            Kết quả tìm kiếm ({filteredBranches.length})
          </Text>
          {filteredBranches.length === 0 ? (
            <Box className="flex flex-col items-center gap-3 rounded-xl border border-card-border bg-card-surface px-4 py-8 text-center">
              <Box className="flex h-12 w-12 items-center justify-center rounded-full bg-surface-muted text-text-secondary">
                <HiOutlineMagnifyingGlass size={22} />
              </Box>
              <Text className="text-sm text-text-primary">Không tìm thấy chi nhánh phù hợp</Text>
              <button
                type="button"
                className="rounded-full bg-button-primary-bg px-4 py-1.5 text-xs font-semibold text-button-primary-fg"
                onClick={() => setSearchQuery('')}
              >
                Xóa tìm kiếm
              </button>
            </Box>
          ) : (
            <Box className="flex flex-col gap-3">
              {filteredBranches.map((branch) => (
                <BranchCard
                  key={branch.id}
                  branch={branch}
                  isSelected={pendingSelectionId === branch.id}
                  onSelect={handleSelect}
                />
              ))}
            </Box>
          )}
        </Box>
      ) : (
        <>
          {showNearbySection ? (
            <Box className="flex flex-col gap-3">
              <Box className="flex items-center gap-2">
                <Text className="text-xs font-semibold uppercase tracking-widest text-text-secondary">
                  Gần bạn nhất
                </Text>
              </Box>
              <Box className="flex flex-col gap-3">
                {nearbyBranches.map((branch) => (
                  <BranchCard
                    key={branch.id}
                    branch={branch}
                    isSelected={pendingSelectionId === branch.id}
                    onSelect={handleSelect}
                  />
                ))}
              </Box>
            </Box>
          ) : null}

          <Box className="flex flex-col gap-3">
            <Text className="text-xs font-semibold uppercase tracking-widest text-text-secondary">
              Tất cả chi nhánh
            </Text>
            <Box className="flex flex-col gap-3">
              {mockBranches.map((branch) => (
                <BranchCard
                  key={branch.id}
                  branch={branch}
                  isSelected={pendingSelectionId === branch.id}
                  onSelect={handleSelect}
                />
              ))}
            </Box>
          </Box>
        </>
      )}
    </Box>
  )
}
