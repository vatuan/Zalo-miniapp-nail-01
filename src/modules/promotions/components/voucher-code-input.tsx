import React from 'react'
import { Box, Text } from 'zmp-ui'

import { clsx } from '@/utils/clsx'

type VoucherCodeInputProps = {
  value: string
  onChange: (value: string) => void
  onSubmit: () => void
}

export function VoucherCodeInput({ value, onChange, onSubmit }: VoucherCodeInputProps) {
  const canSubmit = value.trim().length > 0

  return (
    <Box className="flex flex-col gap-2.5 rounded-xl border border-border-soft bg-surface-primary p-3">
      <Text className="text-[13px] font-semibold text-text-primary">Nhập mã voucher</Text>
      <div className="flex gap-2">
        <input
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value.toUpperCase())}
          placeholder="Nhập mã voucher..."
          className="flex-1 rounded-xl border border-border-soft bg-app-bg px-3 py-2.5 text-[14px] uppercase text-text-primary placeholder:normal-case placeholder:text-text-secondary focus:border-brand-pink focus:outline-none"
        />
        <button
          type="button"
          onClick={onSubmit}
          disabled={!canSubmit}
          className={clsx(
            'shrink-0 rounded-xl px-4 py-2.5 text-[13px] font-semibold transition-colors',
            canSubmit
              ? 'bg-button-primary-bg text-button-primary-fg active:opacity-90'
              : 'cursor-not-allowed bg-surface-muted text-text-secondary',
          )}
        >
          Thêm
        </button>
      </div>
    </Box>
  )
}
