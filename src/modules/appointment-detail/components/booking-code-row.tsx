import React from 'react'
import { HiOutlineClipboardDocument } from 'react-icons/hi2'
import { Box, Text, useSnackbar } from 'zmp-ui'

type BookingCodeRowProps = {
  code: string
}

export function BookingCodeRow({ code }: BookingCodeRowProps) {
  const { openSnackbar } = useSnackbar()

  const handleCopy = async () => {
    try {
      if (typeof navigator !== 'undefined' && navigator.clipboard) {
        await navigator.clipboard.writeText(code)
      }
      openSnackbar({ text: 'Đã sao chép mã lịch hẹn', type: 'success' })
    } catch {
      openSnackbar({ text: 'Không thể sao chép', type: 'error' })
    }
  }

  return (
    <Box className="flex items-center justify-between gap-2 rounded-2xl border border-brand-pink-soft bg-card-surface px-4 py-3">
      <Box>
        <Text className="text-[11px] uppercase tracking-widest text-text-secondary">Mã lịch hẹn</Text>
        <Text className="font-mono text-base font-bold text-brand-pink">#{code}</Text>
      </Box>
      <button
        type="button"
        onClick={handleCopy}
        className="flex items-center gap-1 rounded-full border border-brand-pink-soft bg-surface-primary px-3 py-1 text-xs font-semibold text-brand-pink active:scale-[0.99]"
      >
        <HiOutlineClipboardDocument size={14} /> Sao chép
      </button>
    </Box>
  )
}
