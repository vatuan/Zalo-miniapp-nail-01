import React from 'react'
import { Box, Text, useSnackbar } from 'zmp-ui'

import { canRedeem, memberProfile, RedeemOption } from '@/mocks/loyalty-data'
import { clsx } from '@/utils/clsx'

type RedeemCardProps = {
  option: RedeemOption
}

export function RedeemCard({ option }: RedeemCardProps) {
  const { openSnackbar } = useSnackbar()
  const isAffordable = canRedeem(option, memberProfile.points)

  const handleRedeem = () => {
    if (!isAffordable) {
      openSnackbar({ text: 'Không đủ điểm', type: 'error' })
      return
    }
    openSnackbar({ text: 'Đổi thành công! Voucher đã được thêm vào ví', type: 'success' })
  }

  return (
    <Box
      className={clsx(
        'flex items-center gap-3 rounded-xl border border-border-soft bg-surface-primary p-3',
        !isAffordable && 'opacity-60',
      )}
    >
      <Box className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-brand-pink-ultra-soft text-xl">
        🎟️
      </Box>

      <Box className="flex flex-1 flex-col gap-0.5">
        <Text className="text-[14px] font-semibold text-text-primary">
          {option.pointsCost} điểm → {option.voucherLabel}
        </Text>
        <Text className="text-[12px] text-text-secondary">Cần {option.pointsCost} điểm</Text>
      </Box>

      <button
        type="button"
        onClick={handleRedeem}
        disabled={!isAffordable}
        className={clsx(
          'shrink-0 rounded-full px-4 py-1.5 text-[13px] font-semibold transition-colors',
          isAffordable
            ? 'bg-button-primary-bg text-button-primary-fg active:opacity-80'
            : 'cursor-not-allowed bg-surface-muted text-text-secondary',
        )}
      >
        Đổi ngay
      </button>
    </Box>
  )
}
