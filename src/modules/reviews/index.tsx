import React, { useCallback, useMemo } from 'react'
import { useNavigate } from 'react-router-dom'
import { Box, Text } from 'zmp-ui'

import { useConfigurePageHeader } from '@/layouts/page-layout-context'
import { PageHeader } from '@/shared/components'

import { FilterChips } from './components/filter-chips'
import { LoadMoreButton } from './components/load-more-button'
import { RatingSummary } from './components/rating-summary'
import { ReviewList } from './components/review-list'
import { SortSelector } from './components/sort-selector'
import { useReviewsList } from './hooks/use-reviews-list'

export function ReviewsPageModule() {
  const navigate = useNavigate()
  const {
    summary,
    selectedFilter,
    sortOrder,
    visibleReviews,
    hasMore,
    totalFilteredCount,
    setFilter,
    setSortOrder,
    loadMore,
  } = useReviewsList()

  const handleBack = useCallback(() => navigate(-1), [navigate])

  const headerConfig = useMemo(
    () => ({
      content: (
        <Box className="w-full">
          <PageHeader title="Đánh giá khách hàng" onBack={handleBack} />
        </Box>
      ),
    }),
    [handleBack],
  )

  useConfigurePageHeader(headerConfig)

  return (
    <Box className="flex min-h-full flex-col gap-4 bg-app-bg pb-6">
      {summary ? (
        <Box className="px-4 pt-4">
          <RatingSummary summary={summary} />
        </Box>
      ) : null}

      <FilterChips selected={selectedFilter} onChange={setFilter} />

      <Box className="flex items-center justify-between px-4">
        <Text className="text-[13px] text-text-secondary">{totalFilteredCount} đánh giá</Text>
        <SortSelector value={sortOrder} onChange={setSortOrder} />
      </Box>

      <Box className="px-4">
        {visibleReviews.length === 0 ? (
          <Text className="py-10 text-center text-[13px] text-text-secondary">Không có đánh giá nào phù hợp</Text>
        ) : (
          <ReviewList reviews={visibleReviews} />
        )}
      </Box>

      {hasMore ? (
        <Box className="px-4">
          <LoadMoreButton onClick={loadMore} />
        </Box>
      ) : null}
    </Box>
  )
}
