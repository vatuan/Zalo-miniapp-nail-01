import React from 'react'
import { HiOutlineSparkles } from 'react-icons/hi2'
import { Box, Text } from 'zmp-ui'

import { UserProfile } from '@/mocks/home-data'

type ProfileHeaderProps = {
  user: UserProfile
}

export function ProfileHeader({ user }: ProfileHeaderProps) {
  const initial = user.name.trim().slice(0, 1).toUpperCase() || 'U'
  return (
    <Box className="flex items-center gap-3 rounded-2xl border border-brand-pink-soft bg-card-surface p-4">
      <Box className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-brand-pink text-text-inverse">
        <Text className="text-lg font-bold text-text-inverse">{initial}</Text>
      </Box>
      <Box className="min-w-0 flex-1">
        <Text className="text-base font-semibold text-text-primary">{user.name}</Text>
        <Box className="mt-0.5 flex items-center gap-2">
          <Box className="rounded-full bg-brand-pink-ultra-soft px-2 py-0.5">
            <Text className="text-[11px] font-semibold text-brand-pink">Hạng {user.membership}</Text>
          </Box>
          <Box className="flex items-center gap-1">
            <HiOutlineSparkles size={12} className="text-brand-gold" />
            <Text className="text-xs text-text-secondary">{user.points} điểm</Text>
          </Box>
        </Box>
      </Box>
    </Box>
  )
}
