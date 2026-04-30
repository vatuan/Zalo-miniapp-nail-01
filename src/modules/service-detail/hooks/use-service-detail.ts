import { useMemo } from 'react'

import {
  getNailColorsByIds,
  getServiceDetailById,
  getServiceReviewsForService,
  NailColor,
  ServiceDetail,
  ServiceReview,
} from '@/mocks/service-detail-data'

export type ResolvedServiceDetail = {
  service: ServiceDetail
  reviews: ServiceReview[]
  relatedColors: NailColor[]
  hasVariants: boolean
  defaultVariantId: string | null
}

export function useServiceDetail(id: string | undefined): ResolvedServiceDetail | null {
  return useMemo(() => {
    if (!id) return null
    const service = getServiceDetailById(id)
    if (!service) return null

    const reviews = getServiceReviewsForService(service.id)
    const relatedColors = getNailColorsByIds(service.relatedColorIds)
    const hasVariants = Boolean(service.priceVariants && service.priceVariants.length > 0)
    const defaultVariantId = hasVariants && service.priceVariants ? service.priceVariants[0].id : null

    return { service, reviews, relatedColors, hasVariants, defaultVariantId }
  }, [id])
}
