import React from 'react'
import { useNavigate } from 'react-router-dom'
import { Box, Text } from 'zmp-ui'

import { appVersion } from '@/mocks/profile-data'
import { ROUTE_PATHS } from '@/routing/paths'
import { useAuthStore } from '@/stores/auth-store'

export function FooterBlock() {
  const navigate = useNavigate()
  const logout = useAuthStore((state) => state.logout)

  const handleLogout = () => {
    logout()
    navigate(ROUTE_PATHS.login)
  }

  return (
    <Box className="flex flex-col items-center gap-3 pt-2">
      <Text className="text-[12px] text-text-secondary">Phiên bản: {appVersion}</Text>

      <button
        type="button"
        onClick={handleLogout}
        className="rounded-full border-none ring-1 ring-status-danger bg-transparent px-6 py-2 text-[14px] font-semibold text-status-danger active:opacity-80"
      >
        Đăng xuất
      </button>
    </Box>
  )
}
