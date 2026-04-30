import React from 'react'

import { NailSample } from '@/mocks/gallery-data'

import { HeartButton } from './heart-button'

type TrendingCardProps = {
  sample: NailSample
  isSaved: boolean
  onOpen: (id: string) => void
  onToggleSave: (id: string) => { ok: boolean }
  onGuestTap: () => void
}

export function TrendingCard({ sample, isSaved, onOpen, onToggleSave, onGuestTap }: TrendingCardProps) {
  const handleHeart = () => {
    const result = onToggleSave(sample.id)
    if (!result.ok) onGuestTap()
  }

  return (
    <div
      role="button"
      onClick={() => onOpen(sample.id)}
      className="relative aspect-[3/4] w-32 shrink-0 overflow-hidden rounded-xl bg-surface-muted active:scale-[0.99]"
    >
      <img src={sample.imageUrl} alt={sample.id} className="h-full w-full object-cover" loading="lazy" />
      <HeartButton isSaved={isSaved} onClick={handleHeart} />
    </div>
  )
}
