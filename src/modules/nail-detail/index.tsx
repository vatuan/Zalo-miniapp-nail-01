import React, { useCallback, useMemo } from 'react'
import { useNavigate } from 'react-router-dom'
import { Box, Text } from 'zmp-ui'

import { useConfigurePageHeader } from '@/layouts/page-layout-context'
import { ROUTE_PATHS } from '@/routing/paths'
import { PageHeader } from '@/shared/components'

import { HeroCarousel } from './components/hero-carousel'
import { NailDetailNotFound } from './components/nail-detail-not-found'
import { NailDetailSkeleton } from './components/nail-detail-skeleton'
import { RelatedNailsSection } from './components/related-nails-section'
import { RequiredServicesSection } from './components/required-services-section'
import { StickyActionBar } from './components/sticky-action-bar'
import { TagsRow } from './components/tags-row'
import { useNailDetail } from './hooks/use-nail-detail'

export function NailDetailPageModule() {
  const navigate = useNavigate()
  const { detail, notFound } = useNailDetail()

  const handleBack = useCallback(() => navigate(ROUTE_PATHS.gallery), [navigate])

  const handleOpenRelated = useCallback(
    (id: string) => {
      navigate(ROUTE_PATHS.nailDetailBase.replace(':nailId', id))
    },
    [navigate],
  )

  const headerConfig = useMemo(
    () => ({
      content: (
        <Box className="w-full">
          <PageHeader title="Chi tiết mẫu nail" onBack={handleBack} />
        </Box>
      ),
    }),
    [handleBack],
  )

  useConfigurePageHeader(headerConfig)

  if (notFound) {
    return <NailDetailNotFound onBack={handleBack} />
  }

  if (!detail) {
    return <NailDetailSkeleton />
  }

  return (
    <Box className="flex min-h-full flex-col bg-app-bg pb-28">
      <HeroCarousel images={detail.images} name={detail.name} />

      <Box className="flex flex-col gap-5 px-4 pt-4">
        <Text className="text-xl font-bold text-text-primary">{detail.name}</Text>

        <TagsRow tags={detail.tags} />

        <RequiredServicesSection
          services={detail.services}
          totalDurationMin={detail.durationMin}
          priceFrom={detail.priceFrom}
        />

        <RelatedNailsSection nails={detail.relatedNails} onOpen={handleOpenRelated} />
      </Box>

      <StickyActionBar detail={detail} />
    </Box>
  )
}
