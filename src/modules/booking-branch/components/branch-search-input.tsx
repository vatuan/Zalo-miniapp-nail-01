import React from 'react'
import { HiOutlineMagnifyingGlass, HiOutlineXMark } from 'react-icons/hi2'
import { Box } from 'zmp-ui'

type BranchSearchInputProps = {
  value: string
  onChange: (value: string) => void
  placeholder?: string
}

export function BranchSearchInput({
  value,
  onChange,
  placeholder = 'Nhập tên quận hoặc chi nhánh...',
}: BranchSearchInputProps) {
  return (
    <Box className="relative w-full">
      <Box className="flex items-center pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-text-secondary">
        <HiOutlineMagnifyingGlass size={18} />
      </Box>

      <input
        type="text"
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder={placeholder}
        className="w-full rounded-xl py-2.5 pl-10 pr-10 text-sm text-text-primary placeholder:text-text-secondary border-none ring-1 ring-brand-pink focus:border-brand-pink focus:outline-none"
      />

      {value ? (
        <button
          type="button"
          aria-label="Xóa tìm kiếm"
          className="absolute border-none right-2 top-1/2 -translate-y-1/2 flex h-7 w-7 items-center justify-center rounded-full text-text-secondary hover:bg-surface-primary"
          onClick={() => onChange('')}
        >
          <HiOutlineXMark size={18} />
        </button>
      ) : null}
    </Box>
  )
}
