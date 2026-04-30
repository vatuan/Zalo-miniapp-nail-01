import React from 'react'
import { Box, Text } from 'zmp-ui'

type SectionCardProps = {
  icon: React.ReactNode
  title: string
  children: React.ReactNode
}

export function SectionCard({ icon, title, children }: SectionCardProps) {
  return (
    <Box className="flex flex-col gap-2 rounded-2xl border border-brand-pink-soft bg-card-surface p-4">
      <Box className="flex items-center gap-2">
        <Box className="text-brand-pink">{icon}</Box>
        <Text className="text-[11px] font-semibold uppercase tracking-widest text-text-secondary">{title}</Text>
      </Box>
      {children}
    </Box>
  )
}
