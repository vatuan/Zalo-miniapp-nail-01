import { useMemo } from 'react'

import {
  Combo,
  mockCategories,
  mockCombos,
  mockServices,
  Service,
  ServiceCategory,
  ServiceCategoryMeta,
} from '@/mocks/service-data'

export type CatalogSection =
  | { kind: 'services'; category: ServiceCategoryMeta; services: Service[] }
  | { kind: 'combos'; category: ServiceCategoryMeta; combos: Combo[] }

export type ServicesCatalog = {
  categories: ServiceCategoryMeta[]
  sections: CatalogSection[]
  totalResults: number
}

function normalize(value: string): string {
  return value.toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '').trim()
}

function matchesQuery(haystack: string, needle: string): boolean {
  if (!needle) return true
  return normalize(haystack).includes(normalize(needle))
}

function getServicesForCategory(categoryId: ServiceCategory): Service[] {
  return mockServices.filter((service) => service.categoryId === categoryId)
}

export function useServicesCatalog(query: string): ServicesCatalog {
  return useMemo(() => {
    const trimmed = query.trim()

    const sections: CatalogSection[] = []
    let totalResults = 0

    mockCategories.forEach((category) => {
      if (category.id === 'combo') {
        const combos = mockCombos.filter((c) => matchesQuery(`${c.name} ${c.description}`, trimmed))
        if (combos.length > 0) {
          sections.push({ kind: 'combos', category, combos })
          totalResults += combos.length
        }
        return
      }

      const services = getServicesForCategory(category.id).filter((s) =>
        matchesQuery(`${s.name} ${s.description}`, trimmed),
      )
      if (services.length > 0) {
        sections.push({ kind: 'services', category, services })
        totalResults += services.length
      }
    })

    const categories = sections.map((s) => s.category)

    return { categories, sections, totalResults }
  }, [query])
}

export function getComboChildServices(combo: Combo): Service[] {
  return combo.serviceIds.map((id) => mockServices.find((s) => s.id === id)).filter((s): s is Service => Boolean(s))
}
