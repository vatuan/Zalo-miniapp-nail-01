import React from 'react'
import { Box, Text } from 'zmp-ui'

import { CancelReasonOption } from '@/mocks/appointment-data'
import { clsx } from '@/utils/clsx'

type ReasonSelectorProps = {
  reasons: CancelReasonOption[]
  selectedId: string | null
  customReason: string
  showCustomInput: boolean
  onSelect: (id: string) => void
  onCustomReasonChange: (value: string) => void
}

const MAX_REASON_LENGTH = 200

export function ReasonSelector({
  reasons,
  selectedId,
  customReason,
  showCustomInput,
  onSelect,
  onCustomReasonChange,
}: ReasonSelectorProps) {
  return (
    <Box className="flex flex-col gap-2">
      <Text className="text-xs flex gap-1 font-semibold uppercase tracking-widest text-text-secondary">
        Lý do hủy lịch <Text className="text-red-500">*</Text>
      </Text>
      <Box className="flex flex-col divide-y divide-border-soft rounded-2xl border border-brand-pink-soft bg-card-surface">
        {reasons.map((reason) => {
          const isSelected = reason.id === selectedId
          return (
            <button
              key={reason.id}
              type="button"
              onClick={() => onSelect(reason.id)}
              className="flex items-center gap-3 border-none bg-transparent px-4 py-3 text-left active:scale-[0.99]"
            >
              <Box
                className={clsx(
                  'flex h-5 w-5 shrink-0 items-center justify-center rounded-full ring-1 transition-colors',
                  isSelected ? 'ring-brand-pink' : 'ring-brand-pink-soft',
                )}
              >
                {isSelected ? <Box className="h-2.5 w-2.5 rounded-full bg-brand-pink" /> : null}
              </Box>
              <Text className="text-sm text-text-primary">{reason.label}</Text>
            </button>
          )
        })}
      </Box>

      {showCustomInput ? (
        <Box className="rounded-2xl border border-brand-pink-soft bg-card-surface p-3">
          <textarea
            value={customReason}
            onChange={(event) => onCustomReasonChange(event.target.value.slice(0, MAX_REASON_LENGTH))}
            placeholder="Nhập lý do của bạn..."
            rows={3}
            className="w-full resize-none border-none bg-transparent text-sm text-text-primary outline-none placeholder:text-text-secondary"
          />
          <Box className="flex justify-end">
            <Text className="text-[11px] text-text-secondary">
              {customReason.length}/{MAX_REASON_LENGTH}
            </Text>
          </Box>
        </Box>
      ) : null}
    </Box>
  )
}
