import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Box } from 'zmp-ui'

import { NailDetail } from '@/mocks/nail-detail-data'
import { ROUTE_PATHS } from '@/routing/paths'
import { LoginPromptBanner } from '@/shared/components'
import { useAuthStore } from '@/stores/auth-store'
import { useBookingStore } from '@/stores/booking-store'

import { SaveButton } from './save-button'
import { ShareButton } from './share-button'

type StickyActionBarProps = {
  detail: NailDetail
}

const PROMPT_TIMEOUT_MS = 300

export function StickyActionBar({ detail }: StickyActionBarProps) {
  const navigate = useNavigate()
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated)
  const setReferenceNote = useBookingStore((state) => state.setReferenceNote)

  const [isSaved, setIsSaved] = useState(detail.isSaved)
  const [showLoginPrompt, setShowLoginPrompt] = useState(false)

  useEffect(() => {
    if (!showLoginPrompt) return
    const timer = window.setTimeout(() => setShowLoginPrompt(false), PROMPT_TIMEOUT_MS)
    return () => window.clearTimeout(timer)
  }, [showLoginPrompt])

  const handleToggleSave = () => {
    if (!isAuthenticated) {
      setShowLoginPrompt(true)
      return
    }
    setIsSaved((prev) => !prev)
    setShowLoginPrompt(false)
  }

  const handleBook = () => {
    setReferenceNote(`Mẫu: ${detail.name}`)
    navigate(ROUTE_PATHS.bookingBranch)
  }

  const firstImage = detail.images[0]

  return (
    <Box className="fixed bottom-0 left-0 right-0 z-20 flex flex-col bg-surface-primary shadow-[0_-1px_0_0_theme(colors.border-soft)]">
      {showLoginPrompt ? (
        <Box className="px-4 pt-3">
          <LoginPromptBanner onLogin={() => navigate(ROUTE_PATHS.login)} />
        </Box>
      ) : null}

      <Box className="flex items-center gap-3 px-4 py-3">
        <ShareButton title={detail.name} imageUrl={firstImage} />
        <SaveButton isSaved={isSaved} onToggle={handleToggleSave} />

        <button
          type="button"
          onClick={handleBook}
          className="flex-1 rounded-full border-none bg-button-primary-bg py-3 text-sm font-semibold text-button-primary-fg active:opacity-90"
        >
          Đặt lịch ngay
        </button>
      </Box>
    </Box>
  )
}
