import React, { useEffect, useRef } from 'react'
import { Text } from 'zmp-ui'

import { ServiceCategory, ServiceCategoryMeta } from '@/mocks/service-data'
import { clsx } from '@/utils/clsx'

type CategoryTabBarProps = {
  categories: ServiceCategoryMeta[]
  activeCategory: ServiceCategory
  onChange: (categoryId: ServiceCategory) => void
}

export function CategoryTabBar({ categories, activeCategory, onChange }: CategoryTabBarProps) {
  const tabRefs = useRef<Record<string, HTMLButtonElement | null>>({})

  useEffect(() => {
    const node = tabRefs.current[activeCategory]
    if (node) {
      node.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' })
    }
  }, [activeCategory])

  return (
    <div
      className="flex gap-2 overflow-x-auto px-4 py-3 [&::-webkit-scrollbar]:hidden"
      style={{ scrollbarWidth: 'none' }}
    >
      {categories.map((category) => {
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
              'flex shrink-0 items-center rounded-full border-none px-4 py-1.5 text-xs font-semibold transition-colors',
              isActive
                ? 'ring-1 ring-brand-pink bg-brand-pink text-text-inverse'
                : 'ring-1 ring-brand-pink-soft bg-surface-primary text-text-secondary',
            )}
          >
            <Text className="text-xs font-semibold">{category.label}</Text>
          </button>
        )
      })}
    </div>
  )
}
