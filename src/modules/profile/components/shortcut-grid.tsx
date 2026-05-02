import React from 'react'
import { useNavigate } from 'react-router-dom'
import { Box, Text } from 'zmp-ui'

import { shortcuts } from '@/mocks/profile-data'

import { ShortcutTile } from './shortcut-tile'

export function ShortcutGrid() {
  const navigate = useNavigate()

  return (
    <Box className="flex flex-col gap-2">
      <Text className="text-[13px] font-semibold uppercase tracking-wide text-text-secondary">Shortcuts</Text>
      <Box className="grid grid-cols-2 gap-2.5">
        {shortcuts.map((shortcut) => {
          const Icon = shortcut.icon
          const icon = typeof Icon === 'function' ? <Icon /> : Icon

          return (
            <ShortcutTile
              key={shortcut.id}
              icon={icon}
              label={shortcut.label}
              onClick={() => navigate(shortcut.path)}
            />
          )
        })}
      </Box>
    </Box>
  )
}
