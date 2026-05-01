import { useMemo, useState } from 'react'

import { Branch, mockBranches } from '@/mocks/branch-data'
import { normalizeText } from '@/utils/normalize-text'

function matchesQuery(branch: Branch, query: string) {
  const normalized = normalizeText(query.trim())
  if (!normalized) return true
  return normalizeText(branch.name).includes(normalized) || normalizeText(branch.district).includes(normalized)
}

export function useBranchSearch(gpsGranted: boolean) {
  const [searchQuery, setSearchQuery] = useState('')

  const baseList = useMemo<Branch[]>(() => {
    if (!gpsGranted) return mockBranches
    return [...mockBranches].sort((a, b) => (a.distanceKm ?? Infinity) - (b.distanceKm ?? Infinity))
  }, [gpsGranted])

  const filtered = useMemo(
    () => baseList.filter((branch) => matchesQuery(branch, searchQuery)),
    [baseList, searchQuery],
  )

  return { searchQuery, setSearchQuery, filtered }
}
