import React, { useEffect, useRef } from 'react'
import { HiMagnifyingGlass, HiOutlineXMark } from 'react-icons/hi2'
import { Box } from 'zmp-ui'

import { clsx } from '@/utils/clsx'

type GallerySearchBarProps = {
  isExpanded: boolean
  query: string
  onChange: (value: string) => void
  onClose: () => void
}

export function GallerySearchBar({ isExpanded, query, onChange, onClose }: GallerySearchBarProps) {
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (isExpanded) inputRef.current?.focus()
  }, [isExpanded])

  if (!isExpanded) return null

  return (
    <Box className="px-4 py-2">
      <Box
        className={clsx(
          'flex items-center gap-2 rounded-full bg-surface-primary px-3 py-2 ring-1 ring-brand-pink',
        )}
      >
        <HiMagnifyingGlass size={18} className="shrink-0 text-text-secondary" />
        <input
          ref={inputRef}
          type="text"
          value={query}
          onChange={(e) => onChange(e.target.value)}
          placeholder="Tìm mẫu nail..."
          className="flex-1 border-none bg-transparent text-sm text-text-primary outline-none placeholder:text-text-secondary"
        />
        <button
          type="button"
          onClick={() => {
            onChange('')
            onClose()
          }}
          className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full border-none bg-transparent text-text-secondary"
          aria-label="Đóng tìm kiếm"
        >
          <HiOutlineXMark size={18} />
        </button>
      </Box>
    </Box>
  )
}
