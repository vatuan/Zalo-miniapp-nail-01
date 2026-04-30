import React from 'react'
import { HiChevronRight } from 'react-icons/hi2'
import { Box, Text } from 'zmp-ui'

export type ProfileMenuItem = {
  id: string
  icon: React.ReactNode
  label: string
  onClick: () => void
  badge?: string
}

type ProfileMenuProps = {
  items: ProfileMenuItem[]
}

export function ProfileMenu({ items }: ProfileMenuProps) {
  return (
    <Box className="flex flex-col divide-y divide-border-soft rounded-2xl border border-brand-pink-soft bg-card-surface">
      {items.map((item) => (
        <button
          key={item.id}
          type="button"
          onClick={item.onClick}
          className="flex items-center gap-3 border-none bg-transparent px-4 py-3 text-left active:scale-[0.99]"
        >
          <Box className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-brand-pink-ultra-soft text-brand-pink">
            {item.icon}
          </Box>
          <Box className="min-w-0 flex-1">
            <Text className="text-sm font-semibold text-text-primary">{item.label}</Text>
          </Box>
          {item.badge ? (
            <Box className="rounded-full bg-brand-pink px-2 py-0.5">
              <Text className="text-[11px] font-semibold text-text-inverse">{item.badge}</Text>
            </Box>
          ) : null}
          <HiChevronRight size={18} className="shrink-0 text-text-secondary" />
        </button>
      ))}
    </Box>
  )
}
