import { useCallback, useState } from 'react'

import { useAuthStore } from '@/stores/auth-store'

export type ToggleResult = { ok: true } | { ok: false; reason: 'guest' }

export function useSavedDesigns() {
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated)
  const [savedIds, setSavedIds] = useState<Set<string>>(() => new Set())

  const isSaved = useCallback((id: string) => savedIds.has(id), [savedIds])

  const toggle = useCallback(
    (id: string): ToggleResult => {
      if (!isAuthenticated) return { ok: false, reason: 'guest' }
      setSavedIds((prev) => {
        const next = new Set(prev)
        if (next.has(id)) next.delete(id)
        else next.add(id)
        return next
      })
      return { ok: true }
    },
    [isAuthenticated],
  )

  return { isSaved, toggle, isAuthenticated }
}
