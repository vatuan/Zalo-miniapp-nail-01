import React from 'react'

import { NailRelatedPreview } from '@/mocks/nail-detail-data'

type RelatedNailCardProps = {
  nail: NailRelatedPreview
  onClick: (id: string) => void
}

export function RelatedNailCard({ nail, onClick }: RelatedNailCardProps) {
  return (
    <button
      type="button"
      onClick={() => onClick(nail.id)}
      className="shrink-0 overflow-hidden rounded-xl active:opacity-80"
      style={{ width: 96, height: 96 }}
    >
      <img src={nail.imageUrl} alt={nail.id} className="h-full w-full object-cover" loading="lazy" />
    </button>
  )
}
