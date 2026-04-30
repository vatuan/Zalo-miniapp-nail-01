import React from 'react'

import { StarBreakdownItem } from '@/mocks/reviews-data'

type StarBarRowProps = {
  item: StarBreakdownItem
}

export function StarBarRow({ item }: StarBarRowProps) {
  return (
    <div className="flex items-center gap-2">
      <span className="w-10 shrink-0 text-right text-[12px] text-text-secondary">{item.star} sao</span>

      <div className="flex-1 overflow-hidden rounded-full bg-surface-muted" style={{ height: 6 }}>
        <div className="h-full rounded-full bg-brand-gold" style={{ width: `${item.percentage}%` }} />
      </div>

      <span className="w-8 shrink-0 text-right text-[12px] text-text-secondary">{item.percentage}%</span>
    </div>
  )
}
