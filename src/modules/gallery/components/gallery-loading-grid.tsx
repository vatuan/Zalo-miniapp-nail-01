import React from 'react'

import { SkeletonLoader } from '@/shared/components'

const SKELETON_HEIGHTS = ['h-44', 'h-56', 'h-40', 'h-48', 'h-52', 'h-44']

export function GalleryLoadingGrid() {
  return (
    <div className="columns-2 gap-3 px-4">
      {SKELETON_HEIGHTS.map((heightClass, index) => (
        <div key={index} className="mb-3 break-inside-avoid">
          <SkeletonLoader className={`${heightClass} w-full rounded-xl`} />
        </div>
      ))}
    </div>
  )
}
