import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { HiMagnifyingGlass } from 'react-icons/hi2'
import { useNavigate } from 'react-router-dom'
import { Box, useSnackbar } from 'zmp-ui'

import { useConfigurePageHeader, useMainContentRef } from '@/layouts/page-layout-context'
import { Combo, Service, ServiceCategory } from '@/mocks/service-data'
import { ROUTE_PATHS } from '@/routing/paths'
import { PageHeader } from '@/shared/components'
import { useBookingStore } from '@/stores/booking-store'

import { ComboCard } from './components/combo-card'
import { ComboDetailSheet } from './components/combo-detail-sheet'
import { EmptySearchState } from './components/empty-search-state'
import { ServiceCard } from './components/service-card'
import { ServiceDetailSheet } from './components/service-detail-sheet'
import { ServiceSection } from './components/service-section'
import { ServicesSearchBar } from './components/services-search-bar'
import { ServicesTabBar } from './components/services-tab-bar'
import { getComboChildServices, useServicesCatalog } from './hooks/use-services-catalog'

export function ServicesPageModule() {
  const navigate = useNavigate()
  const { openSnackbar } = useSnackbar()
  const mainContentRef = useMainContentRef()

  const setSelectedBranch = useBookingStore((state) => state.setSelectedBranch)
  const setSelectedServices = useBookingStore((state) => state.setSelectedServices)
  const setSelectedComboIds = useBookingStore((state) => state.setSelectedComboIds)
  const clearBooking = useBookingStore((state) => state.clearBooking)

  const [isSearchExpanded, setIsSearchExpanded] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const [activeCategory, setActiveCategory] = useState<ServiceCategory | null>(null)
  const [detailService, setDetailService] = useState<Service | null>(null)
  const [detailCombo, setDetailCombo] = useState<Combo | null>(null)

  const isProgrammaticScrollRef = useRef(false)
  const sectionRefs = useRef<Partial<Record<ServiceCategory, HTMLDivElement | null>>>({})

  const { categories, sections, totalResults } = useServicesCatalog(searchQuery)

  useEffect(() => {
    if (categories.length === 0) {
      setActiveCategory(null)
      return
    }
    if (!activeCategory || !categories.some((c) => c.id === activeCategory)) {
      setActiveCategory(categories[0].id)
    }
  }, [activeCategory, categories])

  const headerConfig = useMemo(
    () => ({
      content: (
        <Box className="w-full">
          <PageHeader
            title="Dịch vụ"
            onBack={() => navigate(ROUTE_PATHS.home)}
            rightSlot={
              <button
                type="button"
                onClick={() => setIsSearchExpanded((v) => !v)}
                className="flex h-8 w-8 items-center justify-center rounded-full border-none bg-surface-primary text-text-primary"
                aria-label="Tìm kiếm"
              >
                <HiMagnifyingGlass size={18} />
              </button>
            }
          />
        </Box>
      ),
    }),
    [navigate],
  )

  useConfigurePageHeader(headerConfig)

  useEffect(() => {
    const root = mainContentRef.current
    if (!root || sections.length === 0) return

    const observer = new IntersectionObserver(
      (entries) => {
        if (isProgrammaticScrollRef.current) return
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0]
        if (visible) {
          const categoryId = visible.target.getAttribute('data-category') as ServiceCategory | null
          if (categoryId) setActiveCategory(categoryId)
        }
      },
      { root, threshold: [0.3, 0.6] },
    )

    Object.entries(sectionRefs.current).forEach(([, node]) => {
      if (node) observer.observe(node)
    })

    return () => observer.disconnect()
  }, [mainContentRef, sections])

  const handleTabChange = useCallback((categoryId: ServiceCategory) => {
    const node = sectionRefs.current[categoryId]
    isProgrammaticScrollRef.current = true
    setActiveCategory(categoryId)
    if (node) {
      node.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
    window.setTimeout(() => {
      isProgrammaticScrollRef.current = false
    }, 600)
  }, [])

  const startBookingFlow = useCallback(() => {
    clearBooking()
    setSelectedBranch(null)
    navigate(ROUTE_PATHS.bookingBranch)
  }, [clearBooking, navigate, setSelectedBranch])

  const handleBookService = useCallback(
    (service: Service) => {
      if (service.price <= 0) {
        openSnackbar({ text: 'Vui lòng liên hệ salon để được tư vấn báo giá.', type: 'success' })
        return
      }
      clearBooking()
      setSelectedBranch(null)
      setSelectedServices([service])
      setSelectedComboIds([])
      navigate(ROUTE_PATHS.bookingBranch)
    },
    [clearBooking, navigate, openSnackbar, setSelectedBranch, setSelectedComboIds, setSelectedServices],
  )

  const handleBookCombo = useCallback(
    (combo: Combo) => {
      const childServices = getComboChildServices(combo)
      clearBooking()
      setSelectedBranch(null)
      setSelectedServices(childServices)
      setSelectedComboIds([combo.id])
      navigate(ROUTE_PATHS.bookingBranch)
    },
    [clearBooking, navigate, setSelectedBranch, setSelectedComboIds, setSelectedServices],
  )

  const showEmpty = searchQuery.trim().length > 0 && totalResults === 0

  return (
    <Box className="flex min-h-full flex-col bg-app-bg">
      <Box className="sticky -top-[0.5px] z-10 flex flex-col bg-app-bg shadow-sm">
        {isSearchExpanded ? (
          <ServicesSearchBar
            isExpanded={isSearchExpanded}
            query={searchQuery}
            onChange={setSearchQuery}
            onToggle={() => setIsSearchExpanded(true)}
            onClose={() => {
              setIsSearchExpanded(false)
              setSearchQuery('')
            }}
          />
        ) : null}

        {categories.length > 0 ? (
          <ServicesTabBar
            categories={categories}
            activeCategory={activeCategory ?? categories[0].id}
            onChange={handleTabChange}
          />
        ) : null}
      </Box>

      {showEmpty ? (
        <EmptySearchState query={searchQuery} />
      ) : (
        <Box className="flex flex-1 flex-col gap-6 px-4 pt-3 pb-6">
          {sections.map((section) => (
            <ServiceSection
              key={section.category.id}
              ref={(node) => {
                sectionRefs.current[section.category.id] = node
              }}
              categoryId={section.category.id}
              iconKey={section.category.iconKey}
              label={section.category.id === 'combo' ? 'Combo đề xuất' : section.category.label}
            >
              {section.kind === 'combos'
                ? section.combos.map((combo) => (
                    <ComboCard
                      key={combo.id}
                      combo={combo}
                      childServices={getComboChildServices(combo)}
                      onOpenDetail={setDetailCombo}
                      onBook={handleBookCombo}
                    />
                  ))
                : section.services.map((service) => (
                    <ServiceCard
                      key={service.id}
                      service={service}
                      onOpenDetail={setDetailService}
                      onBook={handleBookService}
                    />
                  ))}
            </ServiceSection>
          ))}
        </Box>
      )}

      <ServiceDetailSheet
        service={detailService}
        isOpen={detailService !== null}
        onClose={() => setDetailService(null)}
        onBook={handleBookService}
      />

      <ComboDetailSheet
        combo={detailCombo}
        childServices={detailCombo ? getComboChildServices(detailCombo) : []}
        isOpen={detailCombo !== null}
        onClose={() => setDetailCombo(null)}
        onBook={handleBookCombo}
      />
    </Box>
  )
}
