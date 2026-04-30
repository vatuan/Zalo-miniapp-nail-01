import React, { useState } from 'react'

import { PhotoLightbox } from './photo-lightbox'

type ReviewPhotoStripProps = {
  photos: string[]
  isPhotoReported: boolean
}

export function ReviewPhotoStrip({ photos, isPhotoReported }: ReviewPhotoStripProps) {
  const [lightboxUrl, setLightboxUrl] = useState<string | null>(null)

  if (isPhotoReported || photos.length === 0) return null

  return (
    <>
      <div className="flex gap-2 overflow-x-auto" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
        {photos.map((url) => (
          <button
            key={url}
            type="button"
            onClick={() => setLightboxUrl(url)}
            className="shrink-0 overflow-hidden rounded-lg border border-border-soft active:opacity-80"
          >
            <img src={url} alt="Ảnh đánh giá" className="h-16 w-16 object-cover" loading="lazy" />
          </button>
        ))}
      </div>

      {lightboxUrl ? <PhotoLightbox url={lightboxUrl} onClose={() => setLightboxUrl(null)} /> : null}
    </>
  )
}
