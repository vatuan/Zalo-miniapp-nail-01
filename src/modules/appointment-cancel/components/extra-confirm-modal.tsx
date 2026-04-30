import React from 'react'
import { HiOutlineExclamationTriangle } from 'react-icons/hi2'
import { Box, Modal, Text } from 'zmp-ui'

import { formatMoney } from '@/utils/format'

type ExtraConfirmModalProps = {
  visible: boolean
  feeAmount: number
  onClose: () => void
  onConfirm: () => void
}

export function ExtraConfirmModal({ visible, feeAmount, onClose, onConfirm }: ExtraConfirmModalProps) {
  return (
    <Modal visible={visible} onClose={onClose} title="Xác nhận hủy lịch?">
      <Box className="flex flex-col gap-3 px-2 py-1">
        <Box className="flex items-start gap-2">
          <HiOutlineExclamationTriangle size={20} className="mt-0.5 shrink-0 text-status-error" />
          <Text className="text-sm text-text-primary">
            Bạn đang hủy trong vòng 2 tiếng trước giờ hẹn. Phí hủy là{' '}
            <Text className="font-semibold text-status-error">{formatMoney(feeAmount)}</Text>.
          </Text>
        </Box>
        <Text className="text-xs text-text-secondary">Bạn chắc chắn muốn tiếp tục?</Text>
        <Box className="flex gap-2 pt-1">
          <button
            type="button"
            onClick={onClose}
            className="flex-1 rounded-full border-none bg-surface-muted px-4 py-2 text-sm font-semibold text-text-primary active:scale-[0.99]"
          >
            Quay lại
          </button>
          <button
            type="button"
            onClick={onConfirm}
            className="flex-1 rounded-full border-none bg-status-error px-4 py-2 text-sm font-semibold text-text-inverse active:scale-[0.99]"
          >
            Vẫn hủy lịch
          </button>
        </Box>
      </Box>
    </Modal>
  )
}
