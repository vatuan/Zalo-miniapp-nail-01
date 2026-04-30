import React, { useCallback, useEffect, useMemo, useState } from 'react'
import { HiMagnifyingGlass } from 'react-icons/hi2'
import { useNavigate } from 'react-router-dom'
import { Box, useSnackbar } from 'zmp-ui'

import { useConfigurePageHeader } from '@/layouts/page-layout-context'
import { ROUTE_PATHS } from '@/routing/paths'
import { PageHeader } from '@/shared/components'

import { FilterBottomSheet } from './components/filter-bottom-sheet'
import { FilterChipsRow } from './components/filter-chips-row'
import { GalleryEmptyState } from './components/gallery-empty-state'
import { GalleryLoadingGrid } from './components/gallery-loading-grid'
import { GallerySearchBar } from './components/gallery-search-bar'
import { InfiniteScrollSentinel } from './components/infinite-scroll-sentinel'
import { MasonryGrid } from './components/masonry-grid'
import { NailCard } from './components/nail-card'
import { SectionHeader } from './components/section-header'
import { TrendingSection } from './components/trending-section'
import { useGalleryFilters } from './hooks/use-gallery-filters'
import { useGalleryInfiniteScroll } from './hooks/use-gallery-infinite-scroll'
import { useSavedDesigns } from './hooks/use-saved-designs'

const LOADING_DURATION_MS = 600

export function GalleryPageModule() {
  const navigate = useNavigate()
  const { openSnackbar } = useSnackbar()

  const [isLoading, setIsLoading] = useState(true)
  const [isSearchOpen, setIsSearchOpen] = useState(false)
  const [isFilterSheetOpen, setIsFilterSheetOpen] = useState(false)

  const {
    filters,
    setFilters,
    reset,
    setQuery,
    toggleStyle,
    toggleOccasion,
    toggleTechnique,
    items,
    trending,
    count,
    hasActive,
  } = useGalleryFilters()

  const { isSaved, toggle } = useSavedDesigns()

  const filterSignature = useMemo(
    () =>
      [
        filters.query,
        filters.colors.slice().sort().join(','),
        filters.styles.slice().sort().join(','),
        filters.occasions.slice().sort().join(','),
        filters.techniques.slice().sort().join(','),
      ].join('|'),
    [filters],
  )

  const { visibleItems, hasMore, loadMore } = useGalleryInfiniteScroll(items, filterSignature)

  const activeFilterCount =
    filters.colors.length + filters.styles.length + filters.occasions.length + filters.techniques.length

  const headerConfig = useMemo(
    () => ({
      content: (
        <Box className="w-full">
          <PageHeader
            title="Gallery Mẫu Nail"
            onBack={() => navigate(ROUTE_PATHS.home)}
            rightSlot={
              <button
                type="button"
                onClick={() => setIsSearchOpen((v) => !v)}
                className="flex h-8 w-8 items-center justify-center rounded-full border-none bg-surface-primary text-text-primary"
                aria-label="Tìm kiếm"
              >
                <HiMagnifyingGlass size={18} />
              </button>
            }
          />
        </Box>
      ),
    }),
    [navigate],
  )

  useConfigurePageHeader(headerConfig)

  useEffect(() => {
    const timer = window.setTimeout(() => setIsLoading(false), LOADING_DURATION_MS)
    return () => window.clearTimeout(timer)
  }, [])

  const handleOpenNail = useCallback(
    (id: string) => {
      navigate(ROUTE_PATHS.nailDetailBase.replace(':nailId', id))
    },
    [navigate],
  )

  const handleLogin = useCallback(() => {
    navigate(ROUTE_PATHS.login)
  }, [navigate])

  const handleGuestTap = useCallback(() => {
    openSnackbar({ text: 'Đăng nhập để lưu mẫu yêu thích', type: 'warning' })
  }, [openSnackbar])

  return (
    <Box className="flex min-h-full flex-col bg-app-bg">
      <Box className="sticky -top-[0.5px] z-10 flex flex-col bg-app-bg shadow-sm">
        <GallerySearchBar
          isExpanded={isSearchOpen}
          query={filters.query}
          onChange={setQuery}
          onClose={() => setIsSearchOpen(false)}
        />
        <FilterChipsRow
          filters={filters}
          hasActive={hasActive}
          activeFilterCount={activeFilterCount}
          onToggleStyle={toggleStyle}
          onToggleOccasion={toggleOccasion}
          onToggleTechnique={toggleTechnique}
          onClearAll={reset}
          onOpenSheet={() => setIsFilterSheetOpen(true)}
        />
      </Box>

      {isLoading ? (
        <Box className="flex flex-col gap-4 pt-3 pb-6">
          <GalleryLoadingGrid />
        </Box>
      ) : (
        <Box className="flex flex-1 flex-col gap-4 pt-3 pb-6">
          {!hasActive && trending.length > 0 ? (
            <TrendingSection
              items={trending}
              isSaved={isSaved}
              onOpen={handleOpenNail}
              onToggleSave={toggle}
              onGuestTap={handleGuestTap}
            />
          ) : null}

          <Box className="flex flex-col gap-2 px-4">
            <SectionHeader title="Tất cả mẫu" count={count} />
          </Box>

          {count === 0 ? (
            <GalleryEmptyState onClearFilters={reset} />
          ) : (
            <Box className="px-4">
              <MasonryGrid>
                {visibleItems.map((sample) => (
                  <NailCard
                    key={sample.id}
                    sample={sample}
                    isSaved={isSaved(sample.id)}
                    onOpen={handleOpenNail}
                    onToggleSave={toggle}
                    onLogin={handleLogin}
                  />
                ))}
              </MasonryGrid>

              {hasMore ? <InfiniteScrollSentinel enabled={hasMore} onIntersect={loadMore} /> : null}
            </Box>
          )}
        </Box>
      )}

      <FilterBottomSheet
        isOpen={isFilterSheetOpen}
        filters={filters}
        onClose={() => setIsFilterSheetOpen(false)}
        onApply={(next) => setFilters(next)}
      />
    </Box>
  )
}
