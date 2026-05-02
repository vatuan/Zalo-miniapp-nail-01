import React from 'react'
import { HiOutlineAdjustmentsHorizontal } from 'react-icons/hi2'
import { Text } from 'zmp-ui'

import {
  NAIL_OCCASION_LABEL,
  NAIL_STYLE_LABEL,
  NAIL_TECHNIQUE_LABEL,
  NailOccasion,
  NailStyle,
  NailTechnique,
} from '@/mocks/gallery-data'
import { clsx } from '@/utils/clsx'

import { GalleryFilters } from '../hooks/use-gallery-filters'

type QuickChip =
  | { kind: 'style'; value: NailStyle; label: string }
  | { kind: 'occasion'; value: NailOccasion; label: string }
  | { kind: 'technique'; value: NailTechnique; label: string }

const QUICK_CHIPS: QuickChip[] = [
  { kind: 'style', value: 'minimal', label: NAIL_STYLE_LABEL.minimal },
  { kind: 'style', value: 'glam', label: NAIL_STYLE_LABEL.glam },
  { kind: 'style', value: 'french', label: NAIL_STYLE_LABEL.french },
  { kind: 'occasion', value: 'wedding', label: NAIL_OCCASION_LABEL.wedding },
  { kind: 'occasion', value: 'tet', label: NAIL_OCCASION_LABEL.tet },
  { kind: 'technique', value: 'nail-art', label: NAIL_TECHNIQUE_LABEL['nail-art'] },
  { kind: 'technique', value: 'gel', label: NAIL_TECHNIQUE_LABEL.gel },
]

type FilterChipsRowProps = {
  filters: GalleryFilters
  hasActive: boolean
  activeFilterCount: number
  onToggleStyle: (style: NailStyle) => void
  onToggleOccasion: (occasion: NailOccasion) => void
  onToggleTechnique: (technique: NailTechnique) => void
  onClearAll: () => void
  onOpenSheet: () => void
}

function isChipActive(filters: GalleryFilters, chip: QuickChip): boolean {
  if (chip.kind === 'style') return filters.styles.includes(chip.value)
  if (chip.kind === 'occasion') return filters.occasions.includes(chip.value)
  return filters.techniques.includes(chip.value)
}

export function FilterChipsRow({
  filters,
  hasActive,
  activeFilterCount,
  onToggleStyle,
  onToggleOccasion,
  onToggleTechnique,
  onClearAll,
  onOpenSheet,
}: FilterChipsRowProps) {
  return (
    <div
      className="flex items-center gap-2 overflow-x-auto px-4 py-2 pb-4 [&::-webkit-scrollbar]:hidden"
      style={{ scrollbarWidth: 'none' }}
    >
      <div className="flex items-center flex-1 gap-3 overflow-x-auto p-1">
        <button
          type="button"
          onClick={onClearAll}
          className={clsx(
            'flex shrink-0 items-center rounded-full border-none px-4 py-1.5 transition-colors',
            !hasActive
              ? 'bg-brand-pink text-text-inverse ring-1 ring-brand-pink'
              : 'bg-surface-primary text-text-secondary ring-1 ring-gray-300',
          )}
        >
          <Text className="text-xs font-semibold">Tất cả</Text>
        </button>

        {QUICK_CHIPS.map((chip) => {
          const active = isChipActive(filters, chip)
          return (
            <button
              key={`${chip.kind}-${chip.value}`}
              type="button"
              onClick={() => {
                if (chip.kind === 'style') onToggleStyle(chip.value)
                else if (chip.kind === 'occasion') onToggleOccasion(chip.value)
                else onToggleTechnique(chip.value)
              }}
              className={clsx(
                'flex shrink-0 items-center rounded-full border-none px-4 py-1.5 transition-colors',
                active
                  ? 'bg-brand-pink text-text-inverse ring-1 ring-brand-pink'
                  : 'bg-surface-primary text-text-secondary ring-1 ring-gray-300',
              )}
            >
              <Text className="text-xs font-semibold">{chip.label}</Text>
            </button>
          )
        })}
      </div>

      <button
        type="button"
        onClick={onOpenSheet}
        className={clsx(
          'flex h-[28px] ml-auto shrink-0 items-center gap-1 rounded-full border-none px-4 py-1.5',
          activeFilterCount > 0
            ? 'bg-brand-dark text-text-inverse ring-1 ring-brand-dark'
            : 'bg-surface-primary text-text-primary ring-1 ring-brand-pink',
        )}
      >
        <HiOutlineAdjustmentsHorizontal size={14} />
        <Text className="text-xs font-semibold">Lọc{activeFilterCount > 0 ? ` (${activeFilterCount})` : ''}</Text>
      </button>
    </div>
  )
}
