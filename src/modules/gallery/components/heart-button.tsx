import React, { useEffect, useState } from 'react'
import { HiHeart, HiOutlineHeart } from 'react-icons/hi2'

import { clsx } from '@/utils/clsx'

type HeartButtonProps = {
  isSaved: boolean
  onClick: () => void
}

export function HeartButton({ isSaved, onClick }: HeartButtonProps) {
  const [isPulsing, setIsPulsing] = useState(false)

  useEffect(() => {
    if (!isPulsing) return
    const timer = window.setTimeout(() => setIsPulsing(false), 400)
    return () => window.clearTimeout(timer)
  }, [isPulsing])

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation()
    setIsPulsing(true)
    onClick()
  }

  return (
    <button
      type="button"
      onClick={handleClick}
      aria-label={isSaved ? 'Bỏ lưu mẫu' : 'Lưu mẫu'}
      className="absolute bottom-2 right-2 flex h-8 w-8 items-center justify-center rounded-full border-none bg-surface-primary/85 text-text-primary shadow"
    >
      {isPulsing ? (
        <span
          aria-hidden
          className="absolute inset-0 animate-ping rounded-full bg-brand-pink-soft opacity-60"
        />
      ) : null}
      {isSaved ? (
        <HiHeart size={18} className={clsx('relative text-brand-pink', isPulsing && 'scale-110 transition-transform')} />
      ) : (
        <HiOutlineHeart size={18} className="relative text-text-primary" />
      )}
    </button>
  )
}
