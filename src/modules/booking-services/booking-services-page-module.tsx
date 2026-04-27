import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { HiOutlineExclamationTriangle, HiOutlineSparkles } from 'react-icons/hi2'
import { useLocation, useNavigate } from 'react-router-dom'
import { Box, Button, Text, useSnackbar } from 'zmp-ui'

import { useConfigurePageHeader, useMainContentRef } from '@/layouts/page-layout-context'
import { Combo, mockCategories, mockCombos, mockServices, Service, ServiceCategory } from '@/mocks/service-data'
import { ROUTE_PATHS } from '@/routing/paths'
import { BookingProgressBar, PageHeader, SkeletonLoader } from '@/shared/components'
import { useBookingStore } from '@/stores/booking-store'
import { clsx } from '@/utils/clsx'

import { CATEGORY_ICON } from './category-icon-map'
import { CategoryTabBar } from './components/category-tab-bar'
import { ComboCard } from './components/combo-card'
import { SelectionSummaryBar } from './components/selection-summary-bar'
import { ServiceDetailSheet } from './components/service-detail-sheet'
import { ServiceItem } from './components/service-item'

const LOADING_DURATION_MS = 800
const DURATION_BUFFER_MIN = 15
const OVER_TIME_THRESHOLD_MIN = 240

function getServicesForCategory(categoryId: ServiceCategory): Service[] {
  return mockServices.filter((service) => service.categoryId === categoryId)
}

function uniqueById<T extends { id: string }>(items: T[]): T[] {
  const seen = new Set<string>()
  const result: T[] = []
  items.forEach((item) => {
    if (!seen.has(item.id)) {
      seen.add(item.id)
      result.push(item)
    }
  })
  return result
}

export function BookingServicesPageModule() {
  const navigate = useNavigate()
  const location = useLocation()
  const { openSnackbar } = useSnackbar()
  const mainContentRef = useMainContentRef()

  const selectedBranch = useBookingStore((state) => state.selectedBranch)
  const selectedServices = useBookingStore((state) => state.selectedServices)
  const selectedComboIds = useBookingStore((state) => state.selectedComboIds)
  const setSelectedServices = useBookingStore((state) => state.setSelectedServices)
  const setSelectedComboIds = useBookingStore((state) => state.setSelectedComboIds)

  const [isLoading, setIsLoading] = useState(true)
  const [activeCategory, setActiveCategory] = useState<ServiceCategory>('nail')
  const [detailService, setDetailService] = useState<Service | null>(null)
  const [overtimeDismissed, setOvertimeDismissed] = useState(false)

  // Internal flag to suppress IO updates while we programmatically scroll.
  const isProgrammaticScrollRef = useRef(false)
  const sectionRefs = useRef<Partial<Record<ServiceCategory, HTMLDivElement | null>>>({})

  // Derive available categories (hide categories with zero services / combos).
  const availableCategories = useMemo(
    () =>
      mockCategories.filter((category) => {
        if (category.id === 'combo') {
          return mockCombos.length > 0
        }
        return getServicesForCategory(category.id).length > 0
      }),
    [],
  )

  const headerConfig = useMemo(
    () => ({
      content: (
        <Box className="w-full">
          <PageHeader title="Chọn dịch vụ" onBack={() => navigate(ROUTE_PATHS.bookingBranch)} />
          <BookingProgressBar currentStep={2} totalSteps={5} />
        </Box>
      ),
    }),
    [navigate],
  )

  useConfigurePageHeader(headerConfig)

  // Guard: if no branch selected (e.g. deep-link), kick back to step 1.
  useEffect(() => {
    if (!selectedBranch) {
      navigate(ROUTE_PATHS.bookingBranch, { replace: true })
    }
  }, [navigate, selectedBranch])

  // Read ?category=... query param to auto-jump to a specific section.
  useEffect(() => {
    const params = new URLSearchParams(location.search)
    const requested = params.get('category') as ServiceCategory | null
    if (requested && availableCategories.some((c) => c.id === requested)) {
      setActiveCategory(requested)
    }
  }, [availableCategories, location.search])

  // Skeleton loading.
  useEffect(() => {
    const timer = window.setTimeout(() => setIsLoading(false), LOADING_DURATION_MS)
    return () => window.clearTimeout(timer)
  }, [])

  // IntersectionObserver: sync activeCategory as user scrolls.
  useEffect(() => {
    if (isLoading) {
      return
    }

    const root = mainContentRef.current
    if (!root) {
      return
    }

    const observer = new IntersectionObserver(
      (entries) => {
        if (isProgrammaticScrollRef.current) {
          return
        }
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0]
        if (visible) {
          const categoryId = visible.target.getAttribute('data-category') as ServiceCategory | null
          if (categoryId) {
            setActiveCategory(categoryId)
          }
        }
      },
      { root, threshold: [0.3, 0.6] },
    )

    Object.entries(sectionRefs.current).forEach(([, node]) => {
      if (node) {
        observer.observe(node)
      }
    })

    return () => observer.disconnect()
  }, [isLoading, mainContentRef])

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

  const handleToggleService = useCallback(
    (service: Service) => {
      if (!service.isAvailable) {
        openSnackbar({ text: 'Dịch vụ này tạm ngưng', type: 'warning' })
        return
      }

      const wasSelected = selectedServices.some((s) => s.id === service.id)
      if (!wasSelected) {
        setSelectedServices([...selectedServices, service])
        return
      }

      // Removing a service. Detect if it cascades into combo deselection.
      const affectedCombos = mockCombos.filter(
        (combo) => selectedComboIds.includes(combo.id) && combo.serviceIds.includes(service.id),
      )

      setSelectedServices(selectedServices.filter((s) => s.id !== service.id))

      if (affectedCombos.length > 0) {
        const remainingComboIds = selectedComboIds.filter((id) => !affectedCombos.some((c) => c.id === id))
        setSelectedComboIds(remainingComboIds)
        affectedCombos.forEach((combo) => {
          openSnackbar({
            text: `Đã bỏ chọn combo ${combo.name}. Bạn vẫn có thể chọn dịch vụ lẻ.`,
            type: 'warning',
          })
        })
      }
    },
    [openSnackbar, selectedComboIds, selectedServices, setSelectedComboIds, setSelectedServices],
  )

  const handleToggleCombo = useCallback(
    (combo: Combo) => {
      const isComboSelected = selectedComboIds.includes(combo.id)

      if (isComboSelected) {
        // Deselect: drop combo + drop child services that aren't shared with another selected combo.
        const remainingCombos = mockCombos.filter((c) => selectedComboIds.includes(c.id) && c.id !== combo.id)
        const sharedServiceIds = new Set(remainingCombos.flatMap((c) => c.serviceIds))
        setSelectedServices(
          selectedServices.filter((s) => !combo.serviceIds.includes(s.id) || sharedServiceIds.has(s.id)),
        )
        setSelectedComboIds(selectedComboIds.filter((id) => id !== combo.id))
        return
      }

      // Select: add child services (dedup) + add combo id.
      const childServices = combo.serviceIds
        .map((id) => mockServices.find((s) => s.id === id))
        .filter((s): s is Service => Boolean(s))

      setSelectedServices(uniqueById([...selectedServices, ...childServices]))
      setSelectedComboIds([...selectedComboIds, combo.id])
    },
    [selectedComboIds, selectedServices, setSelectedComboIds, setSelectedServices],
  )

  const handleExpandService = useCallback((service: Service) => {
    setDetailService(service)
  }, [])

  const handleCloseDetail = useCallback(() => {
    setDetailService(null)
  }, [])

  // Derived totals for summary bar.
  const { totalDurationMin, totalPrice } = useMemo(() => {
    const selectedComboServiceIds = new Set(
      mockCombos.filter((combo) => selectedComboIds.includes(combo.id)).flatMap((combo) => combo.serviceIds),
    )

    const standaloneServices = selectedServices.filter((s) => !selectedComboServiceIds.has(s.id))

    const standalonePrice = standaloneServices.reduce((acc, s) => acc + s.price, 0)
    const comboPrice = mockCombos
      .filter((c) => selectedComboIds.includes(c.id))
      .reduce((acc, c) => acc + c.comboPrice, 0)

    const durationFromServices = selectedServices.reduce((acc, s) => acc + s.durationMin, 0)
    const totalDuration = selectedServices.length > 0 ? durationFromServices + DURATION_BUFFER_MIN : 0

    return {
      totalDurationMin: totalDuration,
      totalPrice: standalonePrice + comboPrice,
    }
  }, [selectedComboIds, selectedServices])

  const handleContinue = useCallback(() => {
    if (selectedServices.length === 0) {
      return
    }
    navigate(ROUTE_PATHS.bookingTechnician)
  }, [navigate, selectedServices.length])

  const isOvertime = totalDurationMin > OVER_TIME_THRESHOLD_MIN
  const showOvertimeBanner = isOvertime && !overtimeDismissed

  // Empty state: branch has no services at all (defensive — mocks always have some).
  const hasAnyServices = mockServices.length > 0 || mockCombos.length > 0

  if (!selectedBranch) {
    // While the redirect effect runs, render nothing to avoid flicker.
    return null
  }

  return (
    <Box className="flex min-h-full flex-col bg-app-bg">
      {isLoading ? (
        <Box className="flex flex-col gap-3 px-4 py-4">
          <SkeletonLoader className="h-9 rounded-full" />
          <SkeletonLoader className="h-20 rounded-xl" />
          <SkeletonLoader className="h-20 rounded-xl" />
          <SkeletonLoader className="h-20 rounded-xl" />
          <SkeletonLoader className="h-20 rounded-xl" />
        </Box>
      ) : !hasAnyServices ? (
        <Box className="flex flex-1 flex-col items-center justify-center gap-3 px-6 py-10 text-center">
          <Text className="text-sm text-text-primary">Chi nhánh chưa cập nhật dịch vụ</Text>
          <Text className="text-xs text-text-secondary">Vui lòng thử lại sau hoặc chọn chi nhánh khác.</Text>
          <Button
            size="small"
            className="rounded-full bg-button-primary-bg text-button-primary-fg"
            onClick={() => navigate(ROUTE_PATHS.bookingBranch)}
          >
            Đổi chi nhánh
          </Button>
        </Box>
      ) : (
        <>
          <Box className="sticky -top-[0.5px] z-10 bg-app-bg">
            <CategoryTabBar
              categories={availableCategories}
              activeCategory={activeCategory}
              onChange={handleTabChange}
            />
          </Box>

          <Box className="flex flex-1 flex-col gap-6 px-4 pt-2 pb-5">
            {availableCategories.map((category) => {
              const Icon = CATEGORY_ICON[category.iconKey]
              // Combo list
              if (category.id === 'combo') {
                return (
                  <div
                    key={category.id}
                    ref={(node) => {
                      sectionRefs.current[category.id] = node
                    }}
                    data-category={category.id}
                    className="flex flex-col gap-2 scroll-mt-16"
                  >
                    <Box className="flex items-center gap-1.5">
                      <Icon size={14} className="text-brand-dark" />
                      <Text className="text-xs font-semibold uppercase tracking-widest text-text-secondary">
                        Combo đề xuất
                      </Text>
                    </Box>
                    <Box className="flex flex-col gap-3">
                      {mockCombos.map((combo) => {
                        const childServices = combo.serviceIds
                          .map((id) => mockServices.find((s) => s.id === id))
                          .filter((s): s is Service => Boolean(s))
                        return (
                          <ComboCard
                            key={combo.id}
                            combo={combo}
                            isSelected={selectedComboIds.includes(combo.id)}
                            childServices={childServices}
                            onToggle={handleToggleCombo}
                          />
                        )
                      })}
                    </Box>
                  </div>
                )
              }

              const services = getServicesForCategory(category.id)
              // Service list
              return (
                <div
                  key={category.id}
                  ref={(node) => {
                    sectionRefs.current[category.id] = node
                  }}
                  data-category={category.id}
                  className="flex flex-col gap-2 scroll-mt-16"
                >
                  <Box className="flex items-center gap-1.5">
                    <Icon size={14} className="text-brand-dark" />
                    <Text className="text-xs font-semibold uppercase tracking-widest text-text-secondary">
                      {category.label}
                    </Text>
                  </Box>
                  <Box className="flex flex-col gap-3">
                    {services.map((service) => (
                      <ServiceItem
                        key={service.id}
                        service={service}
                        isSelected={selectedServices.some((s) => s.id === service.id)}
                        onToggle={handleToggleService}
                        onExpand={handleExpandService}
                      />
                    ))}
                  </Box>
                </div>
              )
            })}
          </Box>

          {showOvertimeBanner ? (
            <Box className="sticky bottom-[72px] left-0 right-0 z-10 mx-4 mb-2 flex items-center gap-2 rounded-xl border border-brand-gold bg-status-warning-soft px-3 py-2 shadow-xl">
              <HiOutlineExclamationTriangle size={18} className="shrink-0 text-brand-dark" />
              <Text className="flex-1 text-xs text-text-primary">
                Tổng thời gian trên 4 tiếng. Bạn có muốn tách thành 2 lịch hẹn?
              </Text>
              <button
                type="button"
                onClick={() => setOvertimeDismissed(true)}
                className="shrink-0 border-none rounded-full bg-brand-pink px-3 py-1 text-xs font-semibold text-text-inverse"
              >
                Tôi hiểu
              </button>
            </Box>
          ) : null}

          <SelectionSummaryBar
            serviceCount={selectedServices.length}
            totalDurationMin={totalDurationMin}
            totalPrice={totalPrice}
            onContinue={handleContinue}
          />
        </>
      )}

      <ServiceDetailSheet
        service={detailService}
        isOpen={detailService !== null}
        isSelected={detailService ? selectedServices.some((s) => s.id === detailService.id) : false}
        onClose={handleCloseDetail}
        onSelect={handleToggleService}
      />
    </Box>
  )
}
