import React from 'react'

import { clsx } from '@/utils/clsx'

type SubmitButtonProps = {
  canSubmit: boolean
  isSubmitting: boolean
  onSubmit: () => void
}

export function SubmitButton({ canSubmit, isSubmitting, onSubmit }: SubmitButtonProps) {
  return (
    <button
      type="button"
      onClick={onSubmit}
      disabled={!canSubmit || isSubmitting}
      className={clsx(
        'w-full rounded-full py-3.5 text-sm border-none font-semibold uppercase tracking-wide transition-opacity',
        canSubmit && !isSubmitting
          ? 'bg-button-primary-bg text-button-primary-fg active:opacity-90'
          : 'cursor-not-allowed bg-surface-muted text-text-secondary opacity-60',
      )}
    >
      {isSubmitting ? 'Đang gửi...' : 'Gửi đánh giá'}
    </button>
  )
}
