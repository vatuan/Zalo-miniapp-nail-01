import { useCallback } from 'react'
import { openShareSheet } from 'zmp-sdk'

export function useZaloShare() {
  const share = useCallback(async (title: string, imageUrl?: string) => {
    try {
      await openShareSheet({
        type: 'zmp',
        data: { title, thumbnail: imageUrl ?? '' },
      })
    } catch {
      // share cancelled or unavailable — fail silently
    }
  }, [])

  return { share }
}
