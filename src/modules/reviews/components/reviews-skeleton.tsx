import React from 'react'
import { Box } from 'zmp-ui'

function Block({ className }: { className: string }) {
  return <div className={`animate-pulse rounded-xl bg-surface-muted ${className}`} />
}

function ReviewCardSkeleton() {
  return (
    <Box className="flex flex-col gap-2.5 rounded-xl border border-border-soft bg-surface-primary p-3">
      <Box className="flex items-center gap-2">
        <Block className="h-9 w-9 shrink-0 rounded-full" />
        <Box className="flex flex-1 flex-col gap-1.5">
          <Block className="h-3.5 w-24" />
          <Block className="h-3 w-16" />
        </Box>
        <Block className="h-3 w-14" />
      </Box>
      <Block className="h-5 w-32 rounded-full" />
      <Box className="flex flex-col gap-1.5">
        <Block className="h-3.5 w-full" />
        <Block className="h-3.5 w-5/6" />
        <Block className="h-3.5 w-3/4" />
      </Box>
    </Box>
  )
}

export function ReviewsSkeleton() {
  return (
    <Box className="flex flex-col gap-3">
      {[1, 2, 3].map((i) => (
        <ReviewCardSkeleton key={i} />
      ))}
    </Box>
  )
}
