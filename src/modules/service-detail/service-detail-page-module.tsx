import React, { useCallback, useMemo, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { Box, useSnackbar } from 'zmp-ui'

import { useConfigurePageHeader } from '@/layouts/page-layout-context'
import { Service } from '@/mocks/service-data'
import { ROUTE_PATHS } from '@/routing/paths'
import { PageHeader } from '@/shared/components'
import { useBookingStore } from '@/stores/booking-store'

import { BeforeYouCome } from './components/before-you-come'
import { BookNowBar } from './components/book-now-bar'
import { ExpandableDescription } from './components/expandable-description'
import { HeroImage } from './components/hero-image'
import { PriceVariantAccordion } from './components/price-variant-accordion'
import { RatingAggregate } from './components/rating-aggregate'
import { RelatedColorsGallery } from './components/related-colors-gallery'
import { ReviewsSection } from './components/reviews-section'
import { ServiceInfoRow } from './components/service-info-row'
import { ServiceNotFound } from './components/service-not-found'
import { useServiceDetail } from './hooks/use-service-detail'

export function ServiceDetailPageModule() {
  const navigate = useNavigate()
  const { id } = useParams<{ id: string }>()
  const { openSnackbar } = useSnackbar()

  const setSelectedBranch = useBookingStore((state) => state.setSelectedBranch)
  const setSelectedServices = useBookingStore((state) => state.setSelectedServices)
  const setSelectedComboIds = useBookingStore((state) => state.setSelectedComboIds)
  const clearBooking = useBookingStore((state) => state.clearBooking)

  const resolved = useServiceDetail(id)

  const [selectedVariantId, setSelectedVariantId] = useState<string | null>(() => resolved?.defaultVariantId ?? null)

  const headerConfig = useMemo(
    () => ({
      content: (
        <Box className="w-full">
          <PageHeader
            title={resolved?.service.name ?? 'Chi tiết dịch vụ'}
            onBack={() => navigate(ROUTE_PATHS.services)}
          />
        </Box>
      ),
    }),
    [navigate, resolved?.service.name],
  )

  useConfigurePageHeader(headerConfig)

  const handleSeeAllReviews = useCallback(() => {
    if (!resolved) return
    navigate(ROUTE_PATHS.serviceReviewsBase.replace(':id', resolved.service.id))
  }, [navigate, resolved])

  const handleSeeAllColors = useCallback(() => {
    openSnackbar({ text: 'Xem tất cả màu sơn (sắp ra mắt)', type: 'success' })
  }, [openSnackbar])

  const handleBook = useCallback(() => {
    if (!resolved) return
    const { service, hasVariants } = resolved

    if (!service.isAvailable) {
      openSnackbar({ text: 'Dịch vụ đang tạm ngưng', type: 'warning' })
      return
    }

    if (!hasVariants && service.price <= 0) {
      openSnackbar({ text: 'Vui lòng liên hệ salon để được tư vấn báo giá.', type: 'success' })
      return
    }

    const selectedVariant =
      hasVariants && service.priceVariants
        ? (service.priceVariants.find((v) => v.id === selectedVariantId) ?? service.priceVariants[0])
        : null

    const bookingService: Service = {
      id: selectedVariant ? `${service.id}::${selectedVariant.id}` : service.id,
      categoryId: service.categoryId,
      name: selectedVariant ? `${service.name} — ${selectedVariant.label}` : service.name,
      description: service.description,
      durationMin: selectedVariant ? selectedVariant.durationMin : service.durationMin,
      durationMax: selectedVariant ? selectedVariant.durationMax : service.durationMax,
      price: selectedVariant ? selectedVariant.price : service.price,
      imageUrl: service.imageUrl ?? '',
      isPopular: service.isPopular,
      isAvailable: service.isAvailable,
    }

    clearBooking()
    setSelectedBranch(null)
    setSelectedServices([bookingService])
    setSelectedComboIds([])
    navigate(ROUTE_PATHS.bookingBranch)
  }, [
    clearBooking,
    navigate,
    openSnackbar,
    resolved,
    selectedVariantId,
    setSelectedBranch,
    setSelectedComboIds,
    setSelectedServices,
  ])

  if (!resolved) {
    return (
      <Box className="flex min-h-full flex-col bg-app-bg">
        <ServiceNotFound onBack={() => navigate(ROUTE_PATHS.services)} />
      </Box>
    )
  }

  const { service, reviews, relatedColors, hasVariants } = resolved
  const variants = service.priceVariants ?? []
  const selectedVariant = hasVariants ? (variants.find((v) => v.id === selectedVariantId) ?? variants[0]) : null
  const hasNoPrice = !hasVariants && service.price <= 0
  const displayPrice = selectedVariant ? selectedVariant.price : hasNoPrice ? null : service.price
  const variantMinPrice = variants.length > 0 ? Math.min(...variants.map((v) => v.price)) : null

  return (
    <Box className="flex min-h-full flex-col bg-app-bg">
      <Box className="flex flex-1 flex-col gap-4 pb-28">
        <HeroImage imageUrl={service.imageUrl} alt={service.name} />

        <Box className="flex flex-col gap-3 px-4">
          <Box className="flex flex-col gap-1">
            <h1 className="m-0 text-xl font-bold text-text-primary">{service.name}</h1>
            <RatingAggregate ratingAvg={service.ratingAvg} ratingCount={service.ratingCount} />
          </Box>

          <ServiceInfoRow
            price={service.price}
            hasVariants={hasVariants}
            variantMinPrice={variantMinPrice}
            durationMin={service.durationMin}
            durationMax={service.durationMax}
            includes={service.includes}
          />

          {hasVariants ? (
            <PriceVariantAccordion
              variants={variants}
              selectedId={selectedVariantId ?? variants[0].id}
              onSelect={setSelectedVariantId}
            />
          ) : null}

          <ExpandableDescription text={service.description} />

          <BeforeYouCome notes={service.beforeYouCome} />

          <RelatedColorsGallery colors={relatedColors} onSeeAll={handleSeeAllColors} />

          <ReviewsSection
            ratingAvg={service.ratingAvg}
            ratingCount={service.ratingCount}
            reviews={reviews}
            onSeeAll={handleSeeAllReviews}
          />
        </Box>
      </Box>

      <BookNowBar
        isAvailable={service.isAvailable}
        hasNoPrice={hasNoPrice}
        displayPrice={displayPrice}
        variantLabel={selectedVariant ? selectedVariant.label : null}
        onBook={handleBook}
      />
    </Box>
  )
}
