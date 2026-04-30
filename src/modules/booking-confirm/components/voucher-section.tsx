import React from 'react'
import { HiOutlineCheckCircle, HiOutlineExclamationCircle, HiXMark } from 'react-icons/hi2'
import { Box, Text } from 'zmp-ui'

import { clsx } from '@/utils/clsx'

import { VoucherStatus } from '../hooks/use-voucher'

type VoucherSectionProps = {
  inputCode: string
  status: VoucherStatus
  onChange: (value: string) => void
  onApply: () => void
  onClear: () => void
}

export function VoucherSection({ inputCode, status, onChange, onApply, onClear }: VoucherSectionProps) {
  const isValid = status.state === 'valid'
  const isInvalid = status.state === 'invalid'

  return (
    <Box className="flex flex-col gap-2">
      <Text className="text-[11px] font-semibold uppercase tracking-widest text-text-secondary">Áp dụng voucher</Text>

      {isValid ? (
        <Box className="flex items-center justify-between gap-2 rounded-2xl border border-status-success bg-status-success-soft px-3 py-2">
          <Box className="flex min-w-0 flex-1 items-center gap-2">
            <HiOutlineCheckCircle size={18} className="shrink-0 text-status-success" />
            <Box className="min-w-0">
              <Text className="text-sm font-semibold text-status-success">{status.voucher.code}</Text>
              <Text className="line-clamp-1 text-xs text-text-secondary">{status.voucher.label}</Text>
            </Box>
          </Box>
          <button
            type="button"
            onClick={onClear}
            className="shrink-0 rounded-full border-none bg-transparent p-1 text-status-success"
          >
            <HiXMark size={18} />
          </button>
        </Box>
      ) : (
        <Box className="flex flex-col gap-1">
          <Box className="flex items-center gap-2">
            <input
              type="text"
              value={inputCode}
              onChange={(event) => onChange(event.target.value.toUpperCase())}
              placeholder="Nhập mã voucher"
              className={clsx(
                'flex-1 rounded-full border bg-card-surface px-4 py-2 text-sm text-text-primary outline-none placeholder:text-text-secondary',
                isInvalid ? 'border-status-error' : 'border-brand-pink-soft',
              )}
            />
            <button
              type="button"
              disabled={!inputCode.trim()}
              onClick={onApply}
              className={clsx(
                'shrink-0 rounded-full border-none px-4 py-2 text-sm font-semibold transition-colors active:scale-[0.98]',
                inputCode.trim()
                  ? 'bg-button-primary-bg text-button-primary-fg'
                  : 'cursor-not-allowed bg-gray-200 text-text-secondary',
              )}
            >
              Áp dụng
            </button>
          </Box>
          {isInvalid ? (
            <Box className="flex items-center gap-1">
              <HiOutlineExclamationCircle size={14} className="text-status-error" />
              <Text className="text-xs text-status-error">{status.error}</Text>
            </Box>
          ) : null}
        </Box>
      )}
    </Box>
  )
}
