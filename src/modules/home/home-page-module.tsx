import './home-page-module.scss'

import { useQuery, useQueryClient } from '@tanstack/react-query'
import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { HiOutlineArrowPath, HiOutlineSparkles, HiOutlineWifi } from 'react-icons/hi2'
import { useNavigate } from 'react-router-dom'
import { Box, Button, Text } from 'zmp-ui'

import { useConfigurePageHeader, useMainContentRef } from '@/layouts/page-layout-context'
import {
  FeaturedService,
  FlashSaleItem,
  GalleryItem,
  mockBanners,
  mockFlashSales,
  mockGallery,
  mockReviews,
  mockServices,
  PromotionBanner,
  ReviewItem,
} from '@/mocks/home-data'
import { ROUTE_PATHS } from '@/routing/paths'
import { SkeletonLoader } from '@/shared/components'

import { AppHeader } from './components/app-header'
import { AppointmentWidget } from './components/appointment-widget'
import { FeaturedServices } from './components/featured-services'
import { FlashSaleSection } from './components/flash-sale-section'
import { GreetingBar } from './components/greeting-bar'
import { PromotionCarousel } from './components/promotion-carousel'
import { QuickBookBanner } from './components/quick-book-banner'
import { ReviewSection } from './components/review-section'
import { TrendingGallery } from './components/trending-gallery'
import { useHomeStore } from './home-store'

type HomeDataPayload = {
  banners: PromotionBanner[]
  services: FeaturedService[]
  flashSales: FlashSaleItem[]
  gallery: GalleryItem[]
  reviews: ReviewItem[]
}

const sleep = (ms: number) => new Promise((resolve) => window.setTimeout(resolve, ms))

const cloneHomeData = (): HomeDataPayload => ({
  banners: mockBanners.map((banner) => ({ ...banner })),
  services: mockServices.map((service) => ({ ...service })),
  flashSales: mockFlashSales.map((item) => ({ ...item })),
  gallery: mockGallery.map((item) => ({ ...item })),
  reviews: mockReviews.map((item) => ({ ...item })),
})

async function fetchHomeData() {
  await sleep(700)
  return cloneHomeData()
}

export function HomePageModule() {
  const navigate = useNavigate()
  const queryClient = useQueryClient()
  const mainContentRef = useMainContentRef()
  const startYRef = useRef(0)
  const trackingPullRef = useRef(false)

  const [refreshSeed, setRefreshSeed] = useState(0)
  const [isRefreshing, setIsRefreshing] = useState(false)
  const [pullDistance, setPullDistance] = useState(0)

  const headerConfig = useMemo(
    () => ({
      content: <AppHeader />,
    }),
    [],
  )

  useConfigurePageHeader(headerConfig)

  const { user, upcomingAppointment, isOffline, setOffline, clearUpcomingAppointment, resetHomeData } = useHomeStore(
    (state) => ({
      user: state.user,
      upcomingAppointment: state.upcomingAppointment,
      isOffline: state.isOffline,
      setOffline: state.setOffline,
      clearUpcomingAppointment: state.clearUpcomingAppointment,
      resetHomeData: state.resetHomeData,
    }),
  )

  const homeQuery = useQuery({
    queryKey: ['home-data', refreshSeed],
    queryFn: fetchHomeData,
    enabled: !isOffline,
    staleTime: 1000 * 60,
  })

  const data = useMemo(() => homeQuery.data ?? cloneHomeData(), [homeQuery.data])

  useEffect(() => {
    const syncNetworkState = () => {
      setOffline(!window.navigator.onLine)
    }

    syncNetworkState()
    window.addEventListener('online', syncNetworkState)
    window.addEventListener('offline', syncNetworkState)

    return () => {
      window.removeEventListener('online', syncNetworkState)
      window.removeEventListener('offline', syncNetworkState)
    }
  }, [setOffline])

  const onRefresh = useCallback(async () => {
    if (isRefreshing) {
      return
    }

    setIsRefreshing(true)
    await sleep(1500)
    resetHomeData()
    await queryClient.invalidateQueries({ queryKey: ['home-data'] })
    await homeQuery.refetch()
    setPullDistance(0)
    setIsRefreshing(false)
  }, [homeQuery, isRefreshing, queryClient, resetHomeData])

  const handleRetry = useCallback(async () => {
    setRefreshSeed((prev) => prev + 1)

    if (!window.navigator.onLine) {
      return
    }

    setOffline(false)
    await onRefresh()
  }, [onRefresh, setOffline])

  const onTouchStart = (event: React.TouchEvent<HTMLDivElement>) => {
    const container = mainContentRef.current

    if (!container || container.scrollTop > 0 || isRefreshing || isOffline) {
      return
    }

    trackingPullRef.current = true
    startYRef.current = event.touches[0].clientY
  }

  const onTouchMove = (event: React.TouchEvent<HTMLDivElement>) => {
    if (!trackingPullRef.current || isRefreshing || isOffline) {
      return
    }

    const rawDistance = event.touches[0].clientY - startYRef.current

    if (rawDistance <= 0) {
      setPullDistance(0)
      return
    }

    const nextDistance = Math.min(rawDistance * 0.45, 80)
    setPullDistance(nextDistance)

    if (nextDistance > 0) {
      event.preventDefault()
    }
  }

  const onTouchEnd = () => {
    if (!trackingPullRef.current) {
      return
    }

    trackingPullRef.current = false

    if (pullDistance >= 60) {
      void onRefresh()
      return
    }

    setPullDistance(0)
  }

  const isFirstLoading = homeQuery.isPending || (homeQuery.isFetching && !homeQuery.data)

  if (isOffline) {
    return (
      <Box className="flex min-h-[60vh] flex-col items-center justify-center px-6 py-8 text-center" key={refreshSeed}>
        <Box className="mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-surface-muted text-brand-dark">
          <HiOutlineWifi size={24} />
        </Box>
        <Text className="mb-1 text-xl font-semibold text-text-primary">Mất kết nối</Text>
        <Text className="mb-4 text-sm text-text-secondary">Vui lòng kiểm tra mạng và thử lại.</Text>
        <Button
          className="rounded-full bg-button-primary-bg px-6 text-button-primary-fg"
          prefixIcon={<HiOutlineArrowPath className="flex mt-0.5 mr-0.5 items-center" size={20} />}
          onClick={() => void handleRetry()}
        >
          Thử lại
        </Button>
      </Box>
    )
  }

  return (
    <div
      className="home-page-root bg-gradient-to-b from-surface-muted to-app-bg px-4 py-4"
      onTouchStart={onTouchStart}
      onTouchMove={onTouchMove}
      onTouchEnd={onTouchEnd}
    >
      <Box
        className="pull-refresh-indicator"
        style={{ maxHeight: `${Math.max(pullDistance, isRefreshing ? 56 : 0)}px` }}
      >
        <Box className="flex h-14 items-center justify-center gap-1 text-text-secondary">
          {isRefreshing ? <HiOutlineArrowPath size={14} /> : <HiOutlineSparkles size={14} />}
          <Text className="text-xs font-medium">
            {isRefreshing ? 'Đang làm mới...' : pullDistance >= 60 ? 'Thả để làm mới' : 'Kéo xuống để làm mới'}
          </Text>
        </Box>
      </Box>

      <Box className="space-y-6 pb-4">
        {isFirstLoading ? (
          <>
            <SkeletonLoader className="h-24 rounded-xl" />
            <SkeletonLoader className="h-36 rounded-xl" />
            <SkeletonLoader className="h-14 rounded-xl" />
            <SkeletonLoader className="h-[160px] rounded-xl" />
            <SkeletonLoader className="h-[56px] rounded-xl" />
            <SkeletonLoader className="h-[190px] rounded-xl" />
            <SkeletonLoader className="h-[160px] rounded-xl" />
            <SkeletonLoader className="h-[190px] rounded-xl" />
          </>
        ) : (
          <>
            <GreetingBar user={user} />

            {user.isLoggedIn && upcomingAppointment ? (
              <AppointmentWidget appointment={upcomingAppointment} onConfirmCancel={clearUpcomingAppointment} />
            ) : null}

            {user.isLoggedIn && !upcomingAppointment ? (
              <Box className="rounded-xl border border-card-border bg-card-surface p-4 shadow-sm">
                <Box className="mb-2 flex items-center gap-2 text-text-primary">
                  <HiOutlineSparkles size={18} />
                  <Text className="text-sm font-medium">Đặt lịch đầu tiên của bạn</Text>
                </Box>

                <Button
                  size="small"
                  className="rounded-full bg-button-primary-bg px-4 text-button-primary-fg"
                  onClick={() => navigate(ROUTE_PATHS.booking)}
                >
                  Đặt lịch ngay
                </Button>
              </Box>
            ) : null}

            <QuickBookBanner />

            <PromotionCarousel banners={data.banners} />

            <FeaturedServices services={data.services} />

            <FlashSaleSection flashSales={data.flashSales} />

            <TrendingGallery gallery={data.gallery} />

            <ReviewSection reviews={data.reviews} />
          </>
        )}
      </Box>
    </div>
  )
}
