import React from 'react'
import { Box, Text } from 'zmp-ui'

type SectionHeaderProps = {
  title: string
  count?: number
}

export function SectionHeader({ title, count }: SectionHeaderProps) {
  return (
    <Box className="flex items-center justify-between">
      <Text className="text-xs font-semibold uppercase tracking-widest text-text-secondary">
        {title}
        {typeof count === 'number' ? ` (${count})` : ''}
      </Text>
    </Box>
  )
}
