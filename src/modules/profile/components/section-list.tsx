import React from 'react'
import { HiChevronRight } from 'react-icons/hi2'
import { Box, Text } from 'zmp-ui'

import { clsx } from '@/utils/clsx'

export type SectionListItem = {
  id: string
  label: string
  badge?: string
  disabled?: boolean
  onClick?: () => void
}

type SectionListProps = {
  title: string
  items: SectionListItem[]
}

export function SectionList({ title, items }: SectionListProps) {
  return (
    <Box className="flex flex-col gap-2">
      <Text className="text-[13px] font-semibold uppercase tracking-wide text-text-secondary">{title}</Text>

      <Box className="flex flex-col divide-y divide-border-soft rounded-2xl border border-brand-pink-soft bg-card-surface">
        {items.map((item) => (
          <button
            key={item.id}
            type="button"
            onClick={item.disabled ? undefined : item.onClick}
            disabled={item.disabled}
            className={clsx(
              'flex items-center gap-3 border-none bg-transparent px-4 py-3 text-left',
              !item.disabled && 'active:scale-[0.99]',
            )}
          >
            <Text
              className={clsx(
                'flex-1 text-[14px] font-medium',
                item.disabled ? 'text-text-secondary' : 'text-text-primary',
              )}
            >
              {item.label}
            </Text>

            {item.badge ? (
              <Box className="rounded-full bg-brand-pink-ultra-soft px-2 py-0.5">
                <Text className="text-[11px] font-semibold text-brand-pink">{item.badge}</Text>
              </Box>
            ) : null}

            <HiChevronRight size={18} className="shrink-0 text-text-secondary" />
          </button>
        ))}
      </Box>
    </Box>
  )
}
