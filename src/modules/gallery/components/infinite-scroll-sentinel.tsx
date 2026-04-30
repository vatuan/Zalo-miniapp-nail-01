import React, { useEffect, useRef } from 'react'

import { useMainContentRef } from '@/layouts/page-layout-context'

type InfiniteScrollSentinelProps = {
  onIntersect: () => void
  enabled: boolean
}

export function InfiniteScrollSentinel({ onIntersect, enabled }: InfiniteScrollSentinelProps) {
  const sentinelRef = useRef<HTMLDivElement>(null)
  const rootRef = useMainContentRef()
  const callbackRef = useRef(onIntersect)

  useEffect(() => {
    callbackRef.current = onIntersect
  }, [onIntersect])

  useEffect(() => {
    if (!enabled) return
    const sentinel = sentinelRef.current
    const root = rootRef.current
    if (!sentinel) return

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) callbackRef.current()
        })
      },
      { root: root ?? null, rootMargin: '200px 0px', threshold: 0 },
    )

    observer.observe(sentinel)
    return () => observer.disconnect()
  }, [enabled, rootRef])

  return <div ref={sentinelRef} className="h-8 w-full" aria-hidden />
}
