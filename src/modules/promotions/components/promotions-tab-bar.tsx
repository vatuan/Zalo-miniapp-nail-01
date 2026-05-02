import React from 'react'

import { clsx } from '@/utils/clsx'

const TABS = ['Khuyến mãi', 'Voucher của tôi'] as const

type PromotionsTabBarProps = {
  activeTab: 0 | 1
  onTabChange: (tab: 0 | 1) => void
}

export function PromotionsTabBar({ activeTab, onTabChange }: PromotionsTabBarProps) {
  return (
    <div className="flex border-b border-border-soft">
      {TABS.map((label, idx) => (
        <button
          key={label}
          type="button"
          onClick={() => onTabChange(idx as 0 | 1)}
          className={clsx(
            '-mb-px border-none flex-1 py-3 text-sm font-semibold transition-colors',
            activeTab === idx ? 'bg-brand-pink text-white' : 'border-transparent text-text-secondary',
          )}
        >
          {label}
        </button>
      ))}
    </div>
  )
}
