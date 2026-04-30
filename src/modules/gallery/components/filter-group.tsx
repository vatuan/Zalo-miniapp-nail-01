import React, { useState } from 'react'
import { Box, Text } from 'zmp-ui'

import { FilterTagPill } from './filter-tag-pill'

type Option<V extends string> = {
  value: V
  label: string
  swatchHex?: string
}

type FilterGroupProps<V extends string> = {
  title: string
  options: Option<V>[]
  selected: V[]
  collapseAfter?: number
  onToggle: (value: V) => void
}

export function FilterGroup<V extends string>({
  title,
  options,
  selected,
  collapseAfter,
  onToggle,
}: FilterGroupProps<V>) {
  const [isExpanded, setIsExpanded] = useState(false)

  const shouldCollapse = typeof collapseAfter === 'number' && options.length > collapseAfter
  const visibleOptions = shouldCollapse && !isExpanded ? options.slice(0, collapseAfter) : options
  const hiddenCount = shouldCollapse && !isExpanded ? options.length - (collapseAfter ?? 0) : 0

  return (
    <Box className="flex flex-col gap-2">
      <Text className="text-xs font-semibold uppercase tracking-widest text-text-secondary">{title}</Text>

      <Box className="flex flex-wrap gap-2">
        {visibleOptions.map((option) => (
          <FilterTagPill
            key={option.value}
            label={option.label}
            isSelected={selected.includes(option.value)}
            swatchHex={option.swatchHex}
            onToggle={() => onToggle(option.value)}
          />
        ))}

        {shouldCollapse ? (
          <button
            type="button"
            onClick={() => setIsExpanded((v) => !v)}
            className="inline-flex items-center rounded-full border-none bg-surface-primary px-3 py-1.5 text-text-secondary ring-1 ring-dashed ring-border-default"
          >
            <Text className="text-xs font-semibold">{isExpanded ? 'Thu gọn' : `+${hiddenCount}`}</Text>
          </button>
        ) : null}
      </Box>
    </Box>
  )
}
