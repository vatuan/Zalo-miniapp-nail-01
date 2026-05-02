import React from 'react'

type TagChipProps = {
  label: string
  onClick: () => void
}

export function TagChip({ label, onClick }: TagChipProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="shrink-0 rounded-full border-none ring-1 ring-brand-pink-soft bg-brand-pink-ultra-soft px-3 py-1 text-sm font-medium text-brand-pink active:opacity-70"
    >
      {label}
    </button>
  )
}
