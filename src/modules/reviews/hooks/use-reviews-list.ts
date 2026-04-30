import { useCallback, useMemo, useState } from 'react'
import { useSearchParams } from 'react-router-dom'

import {
  getReviewsForService,
  getReviewSummaryForService,
  ReviewFilterKind,
  ReviewSortOrder,
} from '@/mocks/reviews-data'

const PAGE_SIZE = 10

export function useReviewsList() {
  const [searchParams] = useSearchParams()
  const serviceId = searchParams.get('serviceId') ?? ''

  const [selectedFilter, setSelectedFilter] = useState<ReviewFilterKind>('all')
  const [sortOrder, setSortOrder] = useState<ReviewSortOrder>('newest')
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE)

  const allReviews = useMemo(() => getReviewsForService(serviceId), [serviceId])
  const summary = useMemo(() => getReviewSummaryForService(serviceId), [serviceId])

  const filteredReviews = useMemo(() => {
    switch (selectedFilter) {
      case '5':
        return allReviews.filter((r) => r.rating === 5)
      case '4':
        return allReviews.filter((r) => r.rating === 4)
      case 'photo':
        return allReviews.filter((r) => r.photos.length > 0)
      default:
        return allReviews
    }
  }, [allReviews, selectedFilter])

  const sortedReviews = useMemo(() => {
    const arr = [...filteredReviews]
    switch (sortOrder) {
      case 'newest':
        return arr.sort((a, b) => b.dateIso.localeCompare(a.dateIso))
      case 'oldest':
        return arr.sort((a, b) => a.dateIso.localeCompare(b.dateIso))
      case 'highest':
        return arr.sort((a, b) => b.rating - a.rating)
      case 'lowest':
        return arr.sort((a, b) => a.rating - b.rating)
      default:
        return arr
    }
  }, [filteredReviews, sortOrder])

  const visibleReviews = useMemo(() => sortedReviews.slice(0, visibleCount), [sortedReviews, visibleCount])
  const hasMore = visibleCount < sortedReviews.length

  const setFilter = useCallback((filter: ReviewFilterKind) => {
    setSelectedFilter(filter)
    setVisibleCount(PAGE_SIZE)
  }, [])

  const handleSortChange = useCallback((order: ReviewSortOrder) => {
    setSortOrder(order)
    setVisibleCount(PAGE_SIZE)
  }, [])

  const loadMore = useCallback(() => {
    setVisibleCount((prev) => prev + PAGE_SIZE)
  }, [])

  return {
    summary,
    selectedFilter,
    sortOrder,
    visibleReviews,
    hasMore,
    totalFilteredCount: sortedReviews.length,
    setFilter,
    setSortOrder: handleSortChange,
    loadMore,
  }
}
