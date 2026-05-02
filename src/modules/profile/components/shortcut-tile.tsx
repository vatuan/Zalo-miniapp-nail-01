import React from 'react'
import { Box, Text } from 'zmp-ui'

type ShortcutTileProps = {
  icon: React.ReactNode
  label: string
  onClick: () => void
}

export function ShortcutTile({ icon, label, onClick }: ShortcutTileProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="shadow-md flex flex-col items-center justify-center gap-2 rounded-2xl border-none ring-1 ring-brand-pink bg-transparent px-3 py-4 active:opacity-80"
    >
      <Box className="flex h-11 w-11 items-center justify-center rounded-full bg-brand-pink text-2xl text-white">
        {icon}
      </Box>
      <Text className="text-sm font-semibold text-brand-pink">{label}</Text>
    </button>
  )
}
