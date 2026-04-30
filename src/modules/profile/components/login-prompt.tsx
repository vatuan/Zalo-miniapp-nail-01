import React from 'react'
import { HiOutlineUserCircle } from 'react-icons/hi2'
import { Box, Text } from 'zmp-ui'

type LoginPromptProps = {
  onLogin: () => void
}

export function LoginPrompt({ onLogin }: LoginPromptProps) {
  return (
    <Box className="flex flex-col items-center gap-3 rounded-2xl border border-brand-pink-soft bg-card-surface p-6 text-center">
      <Box className="flex h-16 w-16 items-center justify-center rounded-full bg-brand-pink-ultra-soft">
        <HiOutlineUserCircle size={32} className="text-brand-pink" />
      </Box>
      <Text className="text-sm text-text-primary">Vui lòng đăng nhập để xem hồ sơ và quản lý lịch hẹn</Text>
      <button
        type="button"
        onClick={onLogin}
        className="rounded-full border-none bg-button-primary-bg px-5 py-2 text-sm font-semibold text-button-primary-fg active:scale-[0.99]"
      >
        Đăng nhập
      </button>
    </Box>
  )
}
