import { useCallback, useMemo, useState } from 'react'

import {
  mockNailSamples,
  NailColor,
  NailOccasion,
  NailSample,
  NailStyle,
  NailTechnique,
} from '@/mocks/gallery-data'

export type GalleryFilters = {
  query: string
  colors: NailColor[]
  styles: NailStyle[]
  occasions: NailOccasion[]
  techniques: NailTechnique[]
}

export function emptyFilters(): GalleryFilters {
  return { query: '', colors: [], styles: [], occasions: [], techniques: [] }
}

export function isFiltersEmpty(filters: GalleryFilters): boolean {
  return (
    filters.query.trim().length === 0 &&
    filters.colors.length === 0 &&
    filters.styles.length === 0 &&
    filters.occasions.length === 0 &&
    filters.techniques.length === 0
  )
}

function normalize(value: string): string {
  return value
    .toLowerCase()
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .trim()
}

export function applyFilters(items: NailSample[], filters: GalleryFilters): NailSample[] {
  const q = normalize(filters.query)

  return items.filter((item) => {
    if (filters.colors.length > 0 && !filters.colors.some((c) => item.colors.includes(c))) return false
    if (filters.styles.length > 0 && !filters.styles.includes(item.style)) return false
    if (filters.occasions.length > 0 && !filters.occasions.includes(item.occasion)) return false
    if (filters.techniques.length > 0 && !filters.techniques.includes(item.technique)) return false

    if (q) {
      const hay = `${item.id} ${item.style} ${item.occasion} ${item.technique} ${item.colors.join(' ')}`
      if (!normalize(hay).includes(q)) return false
    }
    return true
  })
}

export function countFiltered(filters: GalleryFilters): number {
  return applyFilters(mockNailSamples, filters).length
}

export function useGalleryFilters() {
  const [filters, setFilters] = useState<GalleryFilters>(emptyFilters())

  const items = useMemo(() => applyFilters(mockNailSamples, filters), [filters])
  const trending = useMemo(() => mockNailSamples.filter((s) => s.isTrending), [])

  const reset = useCallback(() => setFilters(emptyFilters()), [])

  const setQuery = useCallback((query: string) => {
    setFilters((prev) => ({ ...prev, query }))
  }, [])

  const toggleStyle = useCallback((style: NailStyle) => {
    setFilters((prev) => ({
      ...prev,
      styles: prev.styles.includes(style) ? prev.styles.filter((s) => s !== style) : [...prev.styles, style],
    }))
  }, [])

  const toggleOccasion = useCallback((occasion: NailOccasion) => {
    setFilters((prev) => ({
      ...prev,
      occasions: prev.occasions.includes(occasion)
        ? prev.occasions.filter((o) => o !== occasion)
        : [...prev.occasions, occasion],
    }))
  }, [])

  const toggleTechnique = useCallback((technique: NailTechnique) => {
    setFilters((prev) => ({
      ...prev,
      techniques: prev.techniques.includes(technique)
        ? prev.techniques.filter((t) => t !== technique)
        : [...prev.techniques, technique],
    }))
  }, [])

  return {
    filters,
    setFilters,
    reset,
    setQuery,
    toggleStyle,
    toggleOccasion,
    toggleTechnique,
    items,
    trending,
    count: items.length,
    hasActive: !isFiltersEmpty(filters),
  }
}
