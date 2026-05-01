import React, { useMemo } from 'react'
import {
  HiCreditCard,
  HiOutlineCalendarDays,
  HiOutlineCreditCard,
  HiOutlineGift,
  HiOutlineHeart,
  HiOutlineMapPin,
  HiOutlineSparkles,
  HiOutlineTicket,
} from 'react-icons/hi2'
import { useNavigate } from 'react-router-dom'
import { Box } from 'zmp-ui'

import { useConfigurePageHeader } from '@/layouts/page-layout-context'
import { mockUser } from '@/mocks/home-data'
import { ROUTE_PATHS } from '@/routing/paths'
import { PageHeader } from '@/shared/components'
import { useAuthStore } from '@/stores/auth-store'

import { LoginPrompt } from './components/login-prompt'
import { ProfileHeader } from './components/profile-header'
import { ProfileMenu, ProfileMenuItem } from './components/profile-menu'

export function ProfilePageModule() {
  const navigate = useNavigate()
  // const isAuthenticated = useAuthStore((state) => state.isAuthenticated)
  const isAuthenticated = true
  const headerConfig = useMemo(
    () => ({
      content: (
        <Box className="w-full">
          <PageHeader title="Hồ sơ của tôi" />
        </Box>
      ),
    }),
    [],
  )

  useConfigurePageHeader(headerConfig)

  const menuItems: ProfileMenuItem[] = useMemo(
    () => [
      {
        id: 'my-appointments',
        icon: <HiOutlineCalendarDays size={18} />,
        label: 'Lịch hẹn của tôi',
        onClick: () => navigate(ROUTE_PATHS.myAppointments),
      },
      {
        id: 'favorite-techs',
        icon: <HiOutlineCreditCard size={18} />,
        label: 'Thẻ thành viên',
        onClick: () => navigate(ROUTE_PATHS.loyalty),
      },
      {
        id: 'vouchers',
        icon: <HiOutlineTicket size={18} />,
        label: 'Voucher của tôi',
        onClick: () => navigate(ROUTE_PATHS.promotions),
      },
      {
        id: 'rewards',
        icon: <HiOutlineGift size={18} />,
        label: 'Đổi điểm thưởng',
        onClick: () => navigate(ROUTE_PATHS.profile),
      },
      {
        id: 'branches',
        icon: <HiOutlineMapPin size={18} />,
        label: 'Chi nhánh gần tôi',
        onClick: () => navigate(ROUTE_PATHS.bookingBranch),
      },
      {
        id: 'gallery',
        icon: <HiOutlineSparkles size={18} />,
        label: 'Mẫu nail nổi bật',
        onClick: () => navigate(ROUTE_PATHS.gallery),
      },
    ],
    [navigate],
  )

  return (
    <Box className="flex min-h-full flex-col gap-4 bg-app-bg px-4 pt-4 pb-8">
      {isAuthenticated ? (
        <ProfileHeader user={mockUser} />
      ) : (
        <LoginPrompt onLogin={() => navigate(ROUTE_PATHS.login)} />
      )}

      <ProfileMenu items={menuItems} />
    </Box>
  )
}
