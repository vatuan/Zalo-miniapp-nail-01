import React from 'react'
import { HiChevronRight, HiOutlineExclamationTriangle, HiOutlinePencilSquare } from 'react-icons/hi2'
import { useNavigate } from 'react-router-dom'
import { Box, Text } from 'zmp-ui'

import { getTierConfig } from '@/mocks/loyalty-data'
import { userProfile } from '@/mocks/profile-data'
import { ROUTE_PATHS } from '@/routing/paths'

import { ProfileAvatar } from './profile-avatar'

export function UserInfoBlock() {
  const navigate = useNavigate()
  const tier = getTierConfig(userProfile.tier)
  const tierName = formatTierName(tier.label)

  return (
    <Box className="flex flex-col gap-3 rounded-2xl border border-brand-pink-soft bg-card-surface p-4">
      <Box className="flex items-center gap-3">
        <ProfileAvatar name={userProfile.name} avatarUrl={userProfile.avatarUrl} />

        <Box className="flex min-w-0 flex-1 flex-col gap-1">
          <Text className="text-base font-semibold text-text-primary">{userProfile.name}</Text>

          {userProfile.phone ? (
            <Text className="text-[13px] text-text-secondary">{userProfile.phone}</Text>
          ) : (
            <Box className="flex items-center gap-1">
              <HiOutlineExclamationTriangle size={14} className="text-status-danger" />
              <Text className="text-[13px] font-medium text-status-danger">Thêm số điện thoại</Text>
            </Box>
          )}
        </Box>

        <button
          type="button"
          onClick={() => {
            // edit profile — no-op for now
          }}
          className="flex shrink-0 border-none bg-transparent items-center gap-1 self-start rounded-full px-2 py-1 text-[13px] font-medium text-brand-pink"
        >
          <HiOutlinePencilSquare size={14} />
          Chỉnh sửa
        </button>
      </Box>

      <button
        type="button"
        onClick={() => navigate(ROUTE_PATHS.loyalty)}
        className="flex items-center gap-2 rounded-xl border-none ring-1 ring-border-soft bg-surface-muted px-3 py-2 text-left active:opacity-80"
      >
        <Text className="flex-1 text-[14px] font-semibold text-text-primary">
          {tier.icon} {tierName} • {userProfile.points} điểm
        </Text>
        <HiChevronRight size={18} className="text-text-secondary" />
      </button>
    </Box>
  )
}

function formatTierName(label: string) {
  const name = label.replace(' MEMBER', '')
  return name.charAt(0) + name.slice(1).toLowerCase()
}
