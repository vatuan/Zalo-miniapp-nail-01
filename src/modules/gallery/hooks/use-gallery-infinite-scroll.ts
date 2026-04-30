import { useCallback, useEffect, useMemo, useState } from 'react'

import { NailSample } from '@/mocks/gallery-data'

const PAGE_SIZE = 20

export function useGalleryInfiniteScroll(items: NailSample[], resetSignature: string) {
  const [page, setPage] = useState(1)

  useEffect(() => {
    setPage(1)
  }, [resetSignature])

  const visibleItems = useMemo(() => items.slice(0, page * PAGE_SIZE), [items, page])
  const hasMore = visibleItems.length < items.length

  const loadMore = useCallback(() => {
    setPage((p) => p + 1)
  }, [])

  return { visibleItems, hasMore, loadMore }
}
