import React from 'react'
import { Box, Modal, Text } from 'zmp-ui'

import { clsx } from '@/utils/clsx'

type AuthRequiredModalProps = {
  visible: boolean
  mode: 'login' | 'phone'
  onClose: () => void
  onAction: () => void
}

const COPY: Record<AuthRequiredModalProps['mode'], { title: string; description: string; cta: string }> = {
  login: {
    title: 'Yêu cầu đăng nhập',
    description: 'Vui lòng đăng nhập để xác nhận đặt lịch.',
    cta: 'Đăng nhập',
  },
  phone: {
    title: 'Cần số điện thoại',
    description: 'Vui lòng cập nhật số điện thoại trước khi xác nhận đặt lịch.',
    cta: 'Cập nhật số điện thoại',
  },
}

export function AuthRequiredModal({ visible, mode, onClose, onAction }: AuthRequiredModalProps) {
  const copy = COPY[mode]
  return (
    <Modal visible={visible} onClose={onClose} title={copy.title}>
      <Box className="flex flex-col gap-3 px-2 py-1">
        <Text className="text-sm text-text-primary">{copy.description}</Text>
        <Box className="flex gap-2">
          <button
            type="button"
            onClick={onClose}
            className={clsx(
              'flex-1 rounded-full border-none bg-surface-muted px-4 py-2 text-sm font-semibold text-text-primary',
              'active:scale-[0.99]',
            )}
          >
            Đóng
          </button>
          <button
            type="button"
            onClick={onAction}
            className={clsx(
              'flex-1 rounded-full border-none bg-button-primary-bg px-4 py-2 text-sm font-semibold text-button-primary-fg',
              'active:scale-[0.99]',
            )}
          >
            {copy.cta}
          </button>
        </Box>
      </Box>
    </Modal>
  )
}
