import React, { useMemo } from 'react'
import { HiOutlineArrowLongRight, HiOutlineUserCircle } from 'react-icons/hi2'
import { RiCopperCoinFill } from 'react-icons/ri'
import { useNavigate } from 'react-router-dom'
import { Box, Button, Text } from 'zmp-ui'

import { UserProfile } from '@/mocks/home-data'
import { ROUTE_PATHS } from '@/routing/paths'

type GreetingBarProps = {
  user: UserProfile
}

const getGreetingByHour = (hour: number) => {
  if (hour < 12) {
    return 'buổi sáng'
  }

  if (hour < 18) {
    return 'buổi chiều'
  }

  return 'buổi tối'
}

const truncateName = (name: string) => {
  if (name.length <= 20) {
    return name
  }

  return `${name.slice(0, 20)}...`
}

export function GreetingBar({ user }: GreetingBarProps) {
  const navigate = useNavigate()
  const greeting = useMemo(() => getGreetingByHour(new Date().getHours()), [])

  if (!user.isLoggedIn) {
    return (
      <Box className="rounded-xl border border-card-border bg-card-surface p-4 shadow-sm">
        <Box className="mb-3 flex items-center gap-2 text-text-primary">
          <HiOutlineUserCircle size={20} />
          <Text className="text-sm font-medium">Đăng nhập để đặt lịch</Text>
        </Box>

        <Button
          size="small"
          className="rounded-full bg-button-primary-bg px-4 text-button-primary-fg"
          suffixIcon={<HiOutlineArrowLongRight size={16} />}
          onClick={() => navigate(ROUTE_PATHS.login)}
        >
          Đăng nhập
        </Button>
      </Box>
    )
  }

  return (
    <Box className="rounded-xl border border-card-border bg-card-surface p-4 shadow-sm">
      <Text className="text-base font-semibold leading-6 text-text-primary">{`Chào ${greeting}, ${truncateName(user.name)}`}</Text>

      <Box className="mt-3 flex items-center justify-between gap-2">
        <Text className="rounded-full bg-brand-pink-soft px-3 py-1 text-xs font-semibold uppercase tracking-wide text-brand-dark">
          {user.membership}
        </Text>

        <Box className="flex items-center gap-1 text-text-primary">
          <RiCopperCoinFill size={16} />
          <Text className="text-sm font-medium">{`${user.points} điểm`}</Text>
        </Box>
      </Box>
    </Box>
  )
}
