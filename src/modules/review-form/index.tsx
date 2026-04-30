import React, { useCallback, useMemo } from 'react'
import { useNavigate } from 'react-router-dom'
import { Box } from 'zmp-ui'

import { useConfigurePageHeader } from '@/layouts/page-layout-context'
import { PageHeader } from '@/shared/components'

import { AlreadyReviewedBanner } from './components/already-reviewed-banner'
import { BookingReferenceBlock } from './components/booking-reference-block'
import { FollowUpCheckbox } from './components/follow-up-checkbox'
import { PhotoUploadSection } from './components/photo-upload-section'
import { QuickTagsSection } from './components/quick-tags-section'
import { StarRatingInput } from './components/star-rating-input'
import { SubmitButton } from './components/submit-button'
import { TextReviewSection } from './components/text-review-section'
import { useReviewForm } from './hooks/use-review-form'

export function ReviewFormPageModule() {
  const navigate = useNavigate()
  const {
    bookingRef,
    alreadyReviewed,
    rating,
    handleStarTap,
    selectedTags,
    toggleTag,
    reviewText,
    handleTextChange,
    charCount,
    maxTextLength,
    photos,
    maxPhotos,
    handleAddPhoto,
    handleRemovePhoto,
    wantsFollowUp,
    setWantsFollowUp,
    showLowRatingFollowUp,
    canSubmit,
    isSubmitting,
    handleSubmit,
  } = useReviewForm()

  const handleBack = useCallback(() => navigate(-1), [navigate])

  const headerConfig = useMemo(
    () => ({
      content: (
        <Box className="w-full">
          <PageHeader title="Đánh giá trải nghiệm" onBack={handleBack} />
        </Box>
      ),
    }),
    [handleBack],
  )

  useConfigurePageHeader(headerConfig)

  if (alreadyReviewed) {
    return <AlreadyReviewedBanner onBack={handleBack} />
  }

  return (
    <Box className="flex min-h-full flex-col gap-5 bg-app-bg px-4 pb-10 pt-4">
      {bookingRef ? <BookingReferenceBlock bookingRef={bookingRef} /> : null}

      <StarRatingInput rating={rating} onTap={handleStarTap} />

      <QuickTagsSection selectedTags={selectedTags} onToggle={toggleTag} />

      <TextReviewSection
        value={reviewText}
        charCount={charCount}
        maxLength={maxTextLength}
        onChange={handleTextChange}
      />

      <PhotoUploadSection photos={photos} maxPhotos={maxPhotos} onAdd={handleAddPhoto} onRemove={handleRemovePhoto} />

      {showLowRatingFollowUp ? <FollowUpCheckbox checked={wantsFollowUp} onChange={setWantsFollowUp} /> : null}

      <SubmitButton canSubmit={canSubmit} isSubmitting={isSubmitting} onSubmit={handleSubmit} />
    </Box>
  )
}
