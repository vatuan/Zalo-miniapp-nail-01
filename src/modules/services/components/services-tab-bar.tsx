import React, { useEffect, useRef } from 'react'
import { Text } from 'zmp-ui'

import { ServiceCategory, ServiceCategoryMeta } from '@/mocks/service-data'
import { clsx } from '@/utils/clsx'

import { CATEGORY_ICON } from '../category-icon-map'

type ServicesTabBarProps = {
  categories: ServiceCategoryMeta[]
  activeCategory: ServiceCategory
  onChange: (categoryId: ServiceCategory) => void
}

export function ServicesTabBar({ categories, activeCategory, onChange }: ServicesTabBarProps) {
  const tabRefs = useRef<Record<string, HTMLButtonElement | null>>({})
  const containerRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    const container = containerRef.current
    const node = tabRefs.current[activeCategory]
    if (!container || !node) return
    const targetLeft = node.offsetLeft - (container.clientWidth - node.clientWidth) / 2
    container.scrollTo({ left: targetLeft, behavior: 'smooth' })
  }, [activeCategory])

  return (
    <div
      ref={containerRef}
      className="flex gap-2 overflow-x-auto px-4 py-2 [&::-webkit-scrollbar]:hidden"
      style={{ scrollbarWidth: 'none' }}
    >
      {categories.map((category) => {
        const Icon = CATEGORY_ICON[category.iconKey]
        const isActive = category.id === activeCategory

        return (
          <button
            key={category.id}
            ref={(node) => {
              tabRefs.current[category.id] = node
            }}
            type="button"
            onClick={() => onChange(category.id)}
            className={clsx(
              'flex shrink-0 items-center gap-1.5 rounded-full border-none px-4 py-1.5 transition-colors',
              isActive
                ? 'ring-1 ring-brand-pink bg-pink-100 text-text-primary'
                : 'ring-1 ring-gray-300 bg-surface-primary text-text-secondary',
            )}
          >
            <Icon size={14} className={isActive ? 'text-brand-dark' : 'text-text-secondary'} />
            <Text className="text-xs font-semibold">{category.label}</Text>
          </button>
        )
      })}
    </div>
  )
}
