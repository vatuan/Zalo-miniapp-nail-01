import React from 'react'

import { useHeroCarousel } from '../hooks/use-hero-carousel'

type HeroCarouselProps = {
  images: string[]
  name: string
}

export function HeroCarousel({ images, name }: HeroCarouselProps) {
  const { containerRef, activeIndex, handleScroll } = useHeroCarousel(images.length)

  return (
    <div className="relative w-full overflow-hidden bg-surface-muted">
      <div
        ref={containerRef}
        onScroll={handleScroll}
        className="flex overflow-x-auto snap-x snap-mandatory scrollbar-none"
        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
      >
        {images.map((url, idx) => (
          <img
            key={url}
            src={url}
            alt={`${name} ${idx + 1}`}
            className="h-[420px] w-full shrink-0 snap-always snap-center object-cover"
            loading={idx === 0 ? 'eager' : 'lazy'}
          />
        ))}
      </div>

      {images.length > 1 ? (
        <div className="absolute bottom-3 right-3 rounded-full bg-black/40 px-2.5 py-0.5 text-[12px] font-medium text-white">
          {activeIndex + 1} / {images.length}
        </div>
      ) : null}
    </div>
  )
}
