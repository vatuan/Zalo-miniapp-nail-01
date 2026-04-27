import React from 'react'
import { Box, Button, Icon, Text } from 'zmp-ui'

type PageHeaderProps = {
  title: string
  onBack?: () => void
  rightSlot?: React.ReactNode
}

export function PageHeader({ title, onBack, rightSlot }: PageHeaderProps) {
  return (
    <Box className="flex h-full items-center justify-between gap-2 px-4">
      <Box className="w-16">
        {onBack ? (
          <Button
            variant="tertiary"
            type="neutral"
            size="small"
            className="h-8 p-0 min-w-0 rounded-full border border-border-soft bg-surface-primary text-text-primary"
            onClick={onBack}
          >
            <Icon icon="zi-chevron-left-header" size={20} />
          </Button>
        ) : null}
      </Box>

      <Text className="flex-1 truncate text-center text-base font-semibold text-text-primary">{title}</Text>

      <Box className="flex w-16 justify-end">{rightSlot}</Box>
    </Box>
  )
}
