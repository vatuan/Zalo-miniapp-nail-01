import React, { useEffect, useState } from 'react'

import { NailSample } from '@/mocks/gallery-data'

import { HeartButton } from './heart-button'
import { LoginPromptBanner } from './login-prompt-banner'

type NailCardProps = {
  sample: NailSample
  isSaved: boolean
  onOpen: (id: string) => void
  onToggleSave: (id: string) => { ok: boolean }
  onLogin: () => void
}

const PROMPT_TIMEOUT_MS = 3000

export function NailCard({ sample, isSaved, onOpen, onToggleSave, onLogin }: NailCardProps) {
  const [showLoginPrompt, setShowLoginPrompt] = useState(false)

  useEffect(() => {
    if (!showLoginPrompt) return
    const timer = window.setTimeout(() => setShowLoginPrompt(false), PROMPT_TIMEOUT_MS)
    return () => window.clearTimeout(timer)
  }, [showLoginPrompt])

  const handleHeart = () => {
    const result = onToggleSave(sample.id)
    if (!result.ok) {
      setShowLoginPrompt(true)
    } else {
      setShowLoginPrompt(false)
    }
  }

  return (
    <div className="mb-3 break-inside-avoid">
      <div
        role="button"
        onClick={() => onOpen(sample.id)}
        className="relative overflow-hidden rounded-xl bg-surface-muted active:scale-[0.99]"
      >
        <img src={sample.imageUrl} alt={sample.id} className="block w-full" loading="lazy" />
        <HeartButton isSaved={isSaved} onClick={handleHeart} />
      </div>

      {showLoginPrompt ? <LoginPromptBanner onLogin={onLogin} /> : null}
    </div>
  )
}
