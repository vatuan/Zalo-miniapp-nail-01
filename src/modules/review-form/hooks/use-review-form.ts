import { useCallback, useMemo, useState } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { chooseImage } from 'zmp-sdk'
import { useSnackbar } from 'zmp-ui'

import { getBookingRefById } from '@/mocks/review-form-data'
import { sleep } from '@/utils/sleep'

const MAX_PHOTOS = 3
const MAX_TEXT_LENGTH = 500
const SUBMIT_DELAY_MS = 800

export function useReviewForm() {
  const [searchParams] = useSearchParams()
  const navigate = useNavigate()
  const { openSnackbar } = useSnackbar()

  const bookingId = searchParams.get('bookingId') ?? ''
  const bookingRef = useMemo(() => getBookingRefById(bookingId), [bookingId])

  const [rating, setRating] = useState(0)
  const [selectedTags, setSelectedTags] = useState<string[]>([])
  const [reviewText, setReviewText] = useState('')
  const [photos, setPhotos] = useState<string[]>([])
  const [wantsFollowUp, setWantsFollowUp] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleStarTap = useCallback((star: number) => {
    setRating((prev) => (prev === star ? 0 : star))
  }, [])

  const toggleTag = useCallback((tag: string) => {
    setSelectedTags((prev) => (prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]))
  }, [])

  const handleTextChange = useCallback((text: string) => {
    if (text.length <= MAX_TEXT_LENGTH) setReviewText(text)
  }, [])

  const handleAddPhoto = useCallback(async () => {
    if (photos.length >= MAX_PHOTOS) return
    try {
      const { filePaths } = await chooseImage({
        count: MAX_PHOTOS - photos.length,
        sourceType: ['album', 'camera'],
      })
      setPhotos((prev) => [...prev, ...filePaths].slice(0, MAX_PHOTOS))
    } catch {
      // user cancelled or picker unavailable
    }
  }, [photos.length])

  const handleRemovePhoto = useCallback((index: number) => {
    setPhotos((prev) => prev.filter((_, i) => i !== index))
  }, [])

  const handleSubmit = useCallback(async () => {
    if (rating === 0 || isSubmitting) return
    setIsSubmitting(true)
    await sleep(SUBMIT_DELAY_MS)
    openSnackbar({ text: 'Cảm ơn bạn đã đánh giá! +50 điểm thưởng', type: 'success' })
    setIsSubmitting(false)
    navigate(-1)
  }, [rating, isSubmitting, openSnackbar, navigate])

  return {
    bookingRef,
    alreadyReviewed: bookingRef?.hasReviewed ?? false,
    rating,
    handleStarTap,
    selectedTags,
    toggleTag,
    reviewText,
    handleTextChange,
    charCount: reviewText.length,
    maxTextLength: MAX_TEXT_LENGTH,
    photos,
    maxPhotos: MAX_PHOTOS,
    handleAddPhoto,
    handleRemovePhoto,
    wantsFollowUp,
    setWantsFollowUp,
    showLowRatingFollowUp: rating >= 1 && rating <= 2,
    canSubmit: rating >= 1,
    isSubmitting,
    handleSubmit,
  }
}
