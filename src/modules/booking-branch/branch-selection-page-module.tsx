import React, { useEffect, useMemo, useState } from 'react'
import { LuSearchX } from 'react-icons/lu'
import { useNavigate } from 'react-router-dom'
import { Box, Button, Text, useSnackbar } from 'zmp-ui'

import { useConfigurePageHeader } from '@/layouts/page-layout-context'
import { Branch, mockBranches, mockGpsAvailable } from '@/mocks/branch-data'
import { ROUTE_PATHS } from '@/routing/paths'
import { BookingProgressBar, PageHeader, SkeletonLoader } from '@/shared/components'
import { useBookingStore } from '@/stores/booking-store'
import { clsx } from '@/utils/clsx'

import { BranchCard } from './components/branch-card'
import { BranchSearchInput } from './components/branch-search-input'
import { GpsPermissionBanner } from './components/gps-permission-banner'

const LOADING_DURATION_MS = 300

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

  const handleToggle = (branch: Branch) => {
    if (branch.status === 'closed') {
      openSnackbar({
        text: 'Chi nhánh này đang đóng cửa',
        type: 'warning',
      })
      return
    }

    if (selectedBranch?.id === branch.id) {
      setSelectedBranch(null)
      return
    }

    setSelectedBranch(branch)
  }

  const handleConfirm = () => {
    if (!selectedBranch) {
      return
    }

    navigate(ROUTE_PATHS.bookingServices)
  }

  const isSearching = searchQuery.trim().length > 0
  const filteredBranches = useMemo(
    () => mockBranches.filter((branch) => matchesSearch(branch, searchQuery)),
    [searchQuery],
  )
  const nearbyBranches = useMemo(() => mockBranches.filter((branch) => branch.isNearby), [])
  const showNearbySection = gpsGranted && nearbyBranches.length > 0 && !isSearching

  const isConfirmDisabled = !selectedBranch

  return (
    <Box className="flex min-h-full flex-col bg-app-bg">
      <Box className="flex flex-1 flex-col gap-4 px-4 pb-5 pt-4">
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
                <Box className="flex h-12 w-12 items-center justify-center rounded-full bg-brand-pink-ultra-soft text-text-secondary">
                  <LuSearchX size={22} />
                </Box>
                <Text className="text-sm text-text-primary">Không tìm thấy chi nhánh phù hợp</Text>
                <button
                  className="rounded-full border-none px-4 py-1.5 ring-1 ring-brand-pink text-brand-pink bg-transparent text-xs font-semibold"
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
                    isSelected={selectedBranch?.id === branch.id}
                    onSelect={handleToggle}
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
                      isSelected={selectedBranch?.id === branch.id}
                      onSelect={handleToggle}
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
                    isSelected={selectedBranch?.id === branch.id}
                    onSelect={handleToggle}
                  />
                ))}
              </Box>
            </Box>
          </>
        )}
      </Box>

      <Box className="sticky -bottom-[0.5px] left-0 right-0 border-t border-border-soft bg-surface-primary px-4 py-3 shadow-[0_-4px_12px_rgba(0,0,0,0.04)]">
        <Button
          // type="button"
          disabled={isConfirmDisabled}
          onClick={handleConfirm}
          className={clsx(
            'w-full rounded-full px-4 py-3 text-sm font-semibold transition-all',
            isConfirmDisabled
              ? 'cursor-not-allowed bg-border-soft text-text-secondary'
              : 'bg-button-primary-bg text-button-primary-fg active:scale-[0.99]',
          )}
        >
          Xác nhận chi nhánh
        </Button>
      </Box>
    </Box>
  )
}
