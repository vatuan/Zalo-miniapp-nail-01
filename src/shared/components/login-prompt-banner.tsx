import React from 'react'
import { HiOutlineLockClosed } from 'react-icons/hi2'
import { Text } from 'zmp-ui'

type LoginPromptBannerProps = {
  onLogin: () => void
}

export function LoginPromptBanner({ onLogin }: LoginPromptBannerProps) {
  return (
    <div className="mt-1 flex items-center gap-1 rounded-md bg-brand-pink-ultra-soft px-2 py-1">
      <HiOutlineLockClosed size={12} className="shrink-0 text-brand-dark" />
      <Text className="flex-1 text-[11px] text-text-primary">Đăng nhập để lưu mẫu yêu thích</Text>
      <button
        type="button"
        onClick={(e) => {
          e.stopPropagation()
          onLogin()
        }}
        className="border-none bg-transparent text-[11px] font-semibold text-brand-pink"
      >
        Đăng nhập
      </button>
    </div>
  )
}
