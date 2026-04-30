import React, { useEffect, useRef } from 'react'
import { HiMagnifyingGlass, HiOutlineXMark } from 'react-icons/hi2'
import { Box } from 'zmp-ui'

import { clsx } from '@/utils/clsx'

type ServicesSearchBarProps = {
  isExpanded: boolean
  query: string
  onToggle: () => void
  onChange: (value: string) => void
  onClose: () => void
}

export function ServicesSearchBar({ isExpanded, query, onToggle, onChange, onClose }: ServicesSearchBarProps) {
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (isExpanded) {
      inputRef.current?.focus()
    }
  }, [isExpanded])

  return (
    <Box className="px-4 py-2">
      <Box
        className={clsx(
          'flex items-center gap-2 rounded-full bg-surface-primary px-3 py-2 ring-1 ring-border-soft transition-all',
          isExpanded && 'ring-brand-pink',
        )}
      >
        <button
          type="button"
          onClick={onToggle}
          className="flex h-6 w-6 shrink-0 items-center justify-center border-none bg-transparent text-text-secondary"
          aria-label="Tìm kiếm dịch vụ"
        >
          <HiMagnifyingGlass size={18} />
        </button>

        <input
          ref={inputRef}
          type="text"
          value={query}
          onChange={(e) => onChange(e.target.value)}
          placeholder="Tìm dịch vụ, combo..."
          className="flex-1 border-none bg-transparent text-sm text-text-primary outline-none placeholder:text-text-secondary"
          onFocus={() => {
            if (!isExpanded) onToggle()
          }}
        />

        {isExpanded ? (
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
        ) : null}
      </Box>
    </Box>
  )
}
