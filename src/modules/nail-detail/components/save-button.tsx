import React, { useEffect, useState } from 'react'
import { HiHeart, HiOutlineHeart } from 'react-icons/hi2'

import { clsx } from '@/utils/clsx'

type SaveButtonProps = {
  isSaved: boolean
  onToggle: () => void
}

const PULSE_DURATION_MS = 600

export function SaveButton({ isSaved, onToggle }: SaveButtonProps) {
  const [isPulsing, setIsPulsing] = useState(false)

  useEffect(() => {
    if (!isPulsing) return
    const timer = window.setTimeout(() => setIsPulsing(false), PULSE_DURATION_MS)
    return () => window.clearTimeout(timer)
  }, [isPulsing])

  const handleClick = () => {
    if (!isSaved) setIsPulsing(true)
    onToggle()
  }

  return (
    <button
      type="button"
      onClick={handleClick}
      aria-label={isSaved ? 'Bỏ lưu mẫu' : 'Lưu mẫu'}
      className="relative flex h-10 w-10 items-center justify-center rounded-full border border-brand-pink-soft bg-surface-primary active:scale-95"
    >
      {isPulsing ? (
        <span aria-hidden className="absolute inset-0 animate-ping rounded-full bg-brand-pink-soft opacity-60" />
      ) : null}
      {isSaved ? (
        <HiHeart size={20} className={clsx('relative text-brand-pink')} />
      ) : (
        <HiOutlineHeart size={20} className="relative text-text-secondary" />
      )}
    </button>
  )
}
