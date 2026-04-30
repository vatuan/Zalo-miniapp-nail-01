import React from 'react'

type LoadMoreButtonProps = {
  onClick: () => void
}

export function LoadMoreButton({ onClick }: LoadMoreButtonProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="w-full rounded-full border border-border-default bg-surface-primary py-3 text-[13px] font-medium text-text-secondary active:bg-surface-muted"
    >
      Xem thêm đánh giá
    </button>
  )
}
