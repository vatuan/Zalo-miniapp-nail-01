import React from 'react'
import { Box, Text } from 'zmp-ui'

type ShortcutTileProps = {
  icon: string
  label: string
  onClick: () => void
}

export function ShortcutTile({ icon, label, onClick }: ShortcutTileProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="flex flex-col items-center justify-center gap-2 rounded-2xl border border-brand-pink-soft bg-card-surface px-3 py-4 active:opacity-80"
    >
      <Box className="flex h-11 w-11 items-center justify-center rounded-full bg-brand-pink-ultra-soft text-2xl">
        {icon}
      </Box>
      <Text className="text-[13px] font-medium text-text-primary">{label}</Text>
    </button>
  )
}
