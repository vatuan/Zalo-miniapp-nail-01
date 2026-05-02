import React from 'react'
import { HiOutlineMagnifyingGlass, HiOutlineXMark } from 'react-icons/hi2'
import { Box } from 'zmp-ui'

type BranchSearchProps = {
  value: string
  onChange: (value: string) => void
}

export function BranchSearch({ value, onChange }: BranchSearchProps) {
  return (
    <Box className="relative w-full">
      <Box className="pointer-events-none absolute left-3 top-1/2 flex -translate-y-1/2 items-center text-text-secondary">
        <HiOutlineMagnifyingGlass size={18} />
      </Box>

      <input
        type="text"
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder="Tìm theo quận/tên..."
        className="w-full rounded-xl border-none py-2.5 pl-10 pr-10 text-sm text-text-primary ring-1 ring-brand-pink placeholder:text-text-secondary focus:outline-none"
      />

      {value ? (
        <button
          type="button"
          aria-label="Xóa tìm kiếm"
          onClick={() => onChange('')}
          className="absolute right-2 top-1/2 flex h-7 w-7 -translate-y-1/2 items-center justify-center rounded-full border-none text-text-secondary"
        >
          <HiOutlineXMark size={18} />
        </button>
      ) : null}
    </Box>
  )
}
