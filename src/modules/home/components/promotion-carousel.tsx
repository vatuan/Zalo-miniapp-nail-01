import React, { useEffect, useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Text } from 'zmp-ui'

import { PromotionBanner } from '@/mocks/home-data'
import { clsx } from '@/utils/clsx'

type PromotionCarouselProps = {
  banners: PromotionBanner[]
}

export function PromotionCarousel({ banners }: PromotionCarouselProps) {
  const navigate = useNavigate()
  const [activeIndex, setActiveIndex] = useState(0)
  const total = banners.length

  useEffect(() => {
    if (total <= 1) {
      return
    }

    const timer = window.setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % total)
    }, 5000)

    return () => {
      window.clearInterval(timer)
    }
  }, [total])

  useEffect(() => {
    if (!total) {
      setActiveIndex(0)
      return
    }

    if (activeIndex > total - 1) {
      setActiveIndex(0)
    }
  }, [activeIndex, total])

  const translateX = useMemo(() => `translateX(-${activeIndex * 100}%)`, [activeIndex])

  if (!total) {
    return null
  }

  return (
    <div>
      <div className="overflow-hidden rounded-xl shadow-sm">
        <div className="flex transition-transform duration-500" style={{ transform: translateX }}>
          {banners.map((banner) => (
            <button
              key={banner.id}
              type="button"
              className="relative border-none w-full shrink-0 border-0 bg-transparent p-0"
              onClick={() => navigate(banner.link)}
              aria-label={banner.title}
            >
              <img src={banner.imageUrl} alt={banner.title} className="aspect-[16/6] w-full h-full object-cover" />

              <div className="absolute inset-x-0 bottom-0 bg-overlay-backdrop px-3 py-2 text-left">
                <Text className="text-sm font-semibold text-text-inverse">{banner.title}</Text>
              </div>
            </button>
          ))}
        </div>
      </div>

      <div className="mt-2 flex justify-center gap-1.5">
        {banners.map((banner, index) => (
          <button
            key={banner.id}
            type="button"
            className={clsx(
              'h-1 rounded-full border-none transition-all',
              index === activeIndex ? 'w-6 bg-brand-pink' : 'w-2 bg-brand-pink-soft',
            )}
            onClick={() => setActiveIndex(index)}
            aria-label={`Banner ${index + 1}`}
          />
        ))}
      </div>
    </div>
  )
}
