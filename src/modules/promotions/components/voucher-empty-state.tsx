import React from 'react'
import { HiOutlineGift } from 'react-icons/hi2'
import { Box, Text, useSnackbar } from 'zmp-ui'

export function VoucherEmptyState() {
  const { openSnackbar } = useSnackbar()

  const handleShare = () => {
    openSnackbar({ text: 'Đã sao chép link giới thiệu!', type: 'success' })
  }

  return (
    <Box className="flex flex-col items-center justify-center gap-4 px-8 py-16 text-center">
      <div className="flex h-20 w-20 items-center justify-center rounded-full bg-surface-muted">
        <HiOutlineGift size={36} className="text-border-default" />
      </div>

      <Box className="flex flex-col gap-1.5">
        <Text className="text-[15px] font-semibold text-text-primary">Chưa có voucher</Text>
        <Text className="text-[13px] leading-relaxed text-text-secondary">
          Giới thiệu bạn bè để nhận voucher ưu đãi độc quyền
        </Text>
      </Box>

      <button
        type="button"
        onClick={handleShare}
        className="border-none bg-transparent text-[13px] font-semibold text-brand-pink underline"
      >
        Chia sẻ ngay để nhận voucher
      </button>
    </Box>
  )
}
