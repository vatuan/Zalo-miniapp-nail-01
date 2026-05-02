import React from 'react'

type LoadMoreButtonProps = {
  onClick: () => void
}

export function LoadMoreButton({ onClick }: LoadMoreButtonProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="w-full rounded-full border-none ring-1 ring-brand-pink bg-surface-primary py-3 text-sm font-semibold text-brand-pink active:bg-surface-muted"
    >
      Xem thêm đánh giá
    </button>
  )
}
