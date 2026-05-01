import React from 'react'

export function ExpiringTodayBadge() {
  return (
    <div className="relative flex shrink-0 items-center">
      <span className="absolute inset-0 animate-pulse rounded-full bg-status-danger opacity-30" />
      <span className="relative rounded-full bg-status-danger px-2.5 py-0.5 text-[11px] font-semibold text-text-inverse">
        Hết hạn hôm nay!
      </span>
    </div>
  )
}
