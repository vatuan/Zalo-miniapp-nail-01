import React from 'react'
import { Box } from 'zmp-ui'

function Block({ className }: { className: string }) {
  return <div className={`animate-pulse rounded-xl bg-surface-muted ${className}`} />
}

export function NailDetailSkeleton() {
  return (
    <Box className="flex flex-col pb-28">
      {/* hero */}
      <Block className="h-[420px] w-full rounded-none" />

      <Box className="flex flex-col gap-4 px-4 pt-4">
        {/* title */}
        <Block className="h-6 w-2/3" />

        {/* tags row */}
        <Box className="flex gap-2">
          <Block className="h-7 w-20 rounded-full" />
          <Block className="h-7 w-24 rounded-full" />
        </Box>

        {/* services section */}
        <Box className="flex flex-col gap-2">
          <Block className="h-4 w-1/3" />
          <Block className="h-16 w-full" />
          <Block className="h-16 w-full" />
        </Box>

        {/* related */}
        <Box className="flex flex-col gap-2">
          <Block className="h-4 w-1/4" />
          <Box className="flex gap-2">
            <Block className="h-24 w-24 shrink-0" />
            <Block className="h-24 w-24 shrink-0" />
            <Block className="h-24 w-24 shrink-0" />
          </Box>
        </Box>
      </Box>
    </Box>
  )
}
