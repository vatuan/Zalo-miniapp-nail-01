import React, { useState } from 'react'
import { Box, Text } from 'zmp-ui'

import { clsx } from '@/utils/clsx'

const COLLAPSED_CHAR_LIMIT = 180

type ExpandableDescriptionProps = {
  text: string
}

export function ExpandableDescription({ text }: ExpandableDescriptionProps) {
  const [isExpanded, setIsExpanded] = useState(false)
  const isLong = text.length > COLLAPSED_CHAR_LIMIT

  return (
    <Box className="flex flex-col gap-2">
      <Text className="text-[11px] font-semibold uppercase tracking-widest text-text-secondary">Mô tả</Text>
      <Text
        className={clsx(
          'whitespace-pre-line text-sm leading-relaxed text-text-primary',
          isLong && !isExpanded && 'line-clamp-4',
        )}
      >
        {text}
      </Text>

      {isLong ? (
        <button
          type="button"
          onClick={() => setIsExpanded((v) => !v)}
          className="self-start border-none bg-transparent text-xs font-semibold text-brand-pink"
        >
          {isExpanded ? 'Thu gọn' : 'Xem thêm'}
        </button>
      ) : null}
    </Box>
  )
}
