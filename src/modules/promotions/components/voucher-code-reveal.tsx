import React from 'react'
import { HiOutlineDocumentDuplicate } from 'react-icons/hi2'
import { Text, useSnackbar } from 'zmp-ui'

type VoucherCodeRevealProps = {
  code: string
}

export function VoucherCodeReveal({ code }: VoucherCodeRevealProps) {
  const { openSnackbar } = useSnackbar()

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(code)
      openSnackbar({ text: 'Đã sao chép!', type: 'success' })
    } catch {
      openSnackbar({ text: 'Không thể sao chép mã', type: 'error' })
    }
  }

  return (
    <button
      type="button"
      onClick={handleCopy}
      className="flex items-center gap-2 self-start rounded-lg border border-dashed border-brand-pink bg-brand-pink-ultra-soft px-3 py-1.5 active:opacity-70"
    >
      <Text className="font-mono text-[13px] tracking-wide text-text-secondary">●●●●● {code}</Text>
      <HiOutlineDocumentDuplicate size={14} className="shrink-0 text-brand-pink" />
    </button>
  )
}
