import React from 'react'

import { clsx } from '@/utils/clsx'

type EndingSoonBadgeProps = {
  daysLeft: number
}

export function EndingSoonBadge({ daysLeft }: EndingSoonBadgeProps) {
  return (
    <span
      className={clsx(
        'self-start rounded-full px-2.5 py-0.5 text-[11px] font-semibold',
        daysLeft <= 1 ? 'bg-status-danger text-text-inverse' : 'bg-status-warning-soft text-text-primary',
      )}
    >
      Còn {daysLeft} ngày
    </span>
  )
}
