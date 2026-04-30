import React, { useEffect, useState } from 'react'
import { HiOutlineXMark } from 'react-icons/hi2'
import { Box, Text } from 'zmp-ui'

import {
  NAIL_COLOR_HEX,
  NAIL_COLOR_LABEL,
  NAIL_OCCASION_LABEL,
  NAIL_STYLE_LABEL,
  NAIL_TECHNIQUE_LABEL,
  NailColor,
  NailOccasion,
  NailStyle,
  NailTechnique,
} from '@/mocks/gallery-data'

import { countFiltered, emptyFilters, GalleryFilters } from '../hooks/use-gallery-filters'
import { FilterGroup } from './filter-group'
import { FilterSheetFooter } from './filter-sheet-footer'

const COLOR_ORDER: NailColor[] = [
  'red',
  'pink',
  'white',
  'nude',
  'black',
  'purple',
  'blue',
  'yellow',
  'orange',
  'green',
  'silver',
  'pastel-pink',
  'brown',
]

const STYLE_ORDER: NailStyle[] = ['minimal', 'glam', 'pattern', 'ombre', 'french', 'grunge']

const OCCASION_ORDER: NailOccasion[] = ['casual', 'office', 'wedding', 'tet', 'halloween', 'birthday']

const TECHNIQUE_ORDER: NailTechnique[] = ['gel', 'acrylic', 'nail-art', 'rhinestone', 'hand-paint']

type FilterBottomSheetProps = {
  isOpen: boolean
  filters: GalleryFilters
  onClose: () => void
  onApply: (filters: GalleryFilters) => void
}

export function FilterBottomSheet({ isOpen, filters, onClose, onApply }: FilterBottomSheetProps) {
  const [pending, setPending] = useState<GalleryFilters>(filters)

  useEffect(() => {
    if (isOpen) setPending(filters)
  }, [filters, isOpen])

  useEffect(() => {
    if (!isOpen) return
    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = previousOverflow
    }
  }, [isOpen])

  if (!isOpen) return null

  const toggleArrayValue = <T extends string>(arr: T[], value: T): T[] =>
    arr.includes(value) ? arr.filter((v) => v !== value) : [...arr, value]

  const toggleColor = (color: NailColor) =>
    setPending((prev) => ({ ...prev, colors: toggleArrayValue(prev.colors, color) }))
  const toggleStyle = (style: NailStyle) =>
    setPending((prev) => ({ ...prev, styles: toggleArrayValue(prev.styles, style) }))
  const toggleOccasion = (occasion: NailOccasion) =>
    setPending((prev) => ({ ...prev, occasions: toggleArrayValue(prev.occasions, occasion) }))
  const toggleTechnique = (technique: NailTechnique) =>
    setPending((prev) => ({ ...prev, techniques: toggleArrayValue(prev.techniques, technique) }))

  const handleReset = () => setPending({ ...emptyFilters(), query: pending.query })

  const handleApply = () => {
    onApply(pending)
    onClose()
  }

  const resultCount = countFiltered(pending)

  return (
    <div className="fixed inset-0 z-50 flex flex-col justify-end bg-overlay-backdrop" onClick={onClose}>
      <div onClick={(e) => e.stopPropagation()} className="flex max-h-[85vh] flex-col rounded-t-2xl bg-surface-primary">
        <Box className="flex items-center justify-between border-b border-border-soft px-4 py-3">
          <Text className="text-base font-semibold text-text-primary">Bộ lọc</Text>
          <button
            type="button"
            onClick={onClose}
            className="flex h-8 w-8 items-center justify-center rounded-full border-none bg-transparent text-text-secondary"
            aria-label="Đóng"
          >
            <HiOutlineXMark size={20} />
          </button>
        </Box>

        <Box className="flex flex-1 flex-col gap-4 overflow-y-auto px-4 py-4">
          <FilterGroup
            title="Màu sắc"
            options={COLOR_ORDER.map((c) => ({
              value: c,
              label: NAIL_COLOR_LABEL[c],
              swatchHex: NAIL_COLOR_HEX[c],
            }))}
            selected={pending.colors}
            collapseAfter={7}
            onToggle={toggleColor}
          />

          <FilterGroup
            title="Phong cách"
            options={STYLE_ORDER.map((s) => ({ value: s, label: NAIL_STYLE_LABEL[s] }))}
            selected={pending.styles}
            onToggle={toggleStyle}
          />

          <FilterGroup
            title="Dịp"
            options={OCCASION_ORDER.map((o) => ({ value: o, label: NAIL_OCCASION_LABEL[o] }))}
            selected={pending.occasions}
            onToggle={toggleOccasion}
          />

          <FilterGroup
            title="Kỹ thuật"
            options={TECHNIQUE_ORDER.map((t) => ({ value: t, label: NAIL_TECHNIQUE_LABEL[t] }))}
            selected={pending.techniques}
            onToggle={toggleTechnique}
          />
        </Box>

        <FilterSheetFooter resultCount={resultCount} onReset={handleReset} onApply={handleApply} />
      </div>
    </div>
  )
}
