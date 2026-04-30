import React from 'react'
import { Box, Text } from 'zmp-ui'

import { clsx } from '@/utils/clsx'

export type AppointmentTab = 'upcoming' | 'completed' | 'cancelled'

type TabConfig = {
  value: AppointmentTab
  label: string
}

const TAB_CONFIG: TabConfig[] = [
  { value: 'upcoming', label: 'Sắp tới' },
  { value: 'completed', label: 'Hoàn thành' },
  { value: 'cancelled', label: 'Đã hủy' },
]

type TabBarProps = {
  activeTab: AppointmentTab
  upcomingCount: number
  onChange: (tab: AppointmentTab) => void
}

export function TabBar({ activeTab, upcomingCount, onChange }: TabBarProps) {
  return (
    <Box className="sticky top-0 z-10 flex items-center gap-1 border-b border-border-soft bg-surface-primary px-2">
      {TAB_CONFIG.map((tab) => {
        const isActive = activeTab === tab.value
        const showBadge = tab.value === 'upcoming' && upcomingCount > 0
        return (
          <button
            key={tab.value}
            type="button"
            onClick={() => onChange(tab.value)}
            className={clsx(
              'relative flex flex-1 items-center justify-center gap-1 border-none bg-transparent px-3 py-3 text-sm font-semibold transition-colors',
              isActive ? 'text-brand-pink' : 'text-text-secondary',
            )}
          >
            <Text className={clsx('text-sm font-semibold', isActive ? 'text-brand-pink' : 'text-text-secondary')}>
              {tab.label}
            </Text>
            {showBadge ? (
              <Text className="rounded-full bg-brand-pink px-1.5 text-[10px] font-bold text-text-inverse">
                {upcomingCount}
              </Text>
            ) : null}
            {isActive ? <Box className="absolute inset-x-3 -bottom-px h-0.5 rounded-full bg-brand-pink" /> : null}
          </button>
        )
      })}
    </Box>
  )
}
