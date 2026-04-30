import React from 'react'
import { HiOutlineShare } from 'react-icons/hi2'

import { useZaloShare } from '../hooks/use-zalo-share'

type ShareButtonProps = {
  title: string
  imageUrl?: string
}

export function ShareButton({ title, imageUrl }: ShareButtonProps) {
  const { share } = useZaloShare()

  return (
    <button
      type="button"
      onClick={() => share(title, imageUrl)}
      aria-label="Chia sẻ"
      className="flex h-10 w-10 items-center justify-center rounded-full border border-border-soft bg-surface-primary active:scale-95"
    >
      <HiOutlineShare size={18} className="text-text-primary" />
    </button>
  )
}
