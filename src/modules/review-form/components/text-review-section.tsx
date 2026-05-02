import React from 'react'
import { Box, Text } from 'zmp-ui'

import { clsx } from '@/utils/clsx'

type TextReviewSectionProps = {
  value: string
  charCount: number
  maxLength: number
  onChange: (text: string) => void
}

export function TextReviewSection({ value, charCount, maxLength, onChange }: TextReviewSectionProps) {
  return (
    <Box className="flex flex-col gap-3">
      <Text className="text-[11px] font-bold uppercase tracking-wider text-text-secondary">Nhận xét của bạn</Text>

      <div className="relative">
        <textarea
          value={value}
          onChange={(e) => onChange(e.target.value)}
          maxLength={maxLength}
          placeholder="Chia sẻ cảm nhận của bạn về dịch vụ..."
          rows={4}
          className="w-full resize-none rounded-xl border border-brand-pink-soft bg-surface-primary px-3 pb-6 pt-3 text-[14px] text-text-primary placeholder:text-text-secondary focus:border-brand-pink focus:outline-none"
        />
        <span
          className={clsx(
            'absolute bottom-2 right-3 text-[11px]',
            charCount >= maxLength ? 'text-status-danger' : 'text-text-secondary',
          )}
        >
          {charCount}/{maxLength}
        </span>
      </div>
    </Box>
  )
}
