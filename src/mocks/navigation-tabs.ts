import { ROUTE_PATHS } from '@/routing/paths'

export type NavigationTab = {
  key: string
  label: string
  path: string
  isPrivate: boolean
}

export const NAVIGATION_TABS: NavigationTab[] = [
  {
    key: 'home',
    label: 'Trang chủ',
    path: ROUTE_PATHS.home,
    isPrivate: false,
  },
  {
    key: 'services',
    label: 'Dịch vụ',
    path: ROUTE_PATHS.services,
    isPrivate: false,
  },
  {
    key: 'booking',
    label: 'Đặt lịch',
    path: ROUTE_PATHS.booking,
    isPrivate: true,
  },
  {
    key: 'offers',
    label: 'Ưu đãi',
    path: ROUTE_PATHS.offers,
    isPrivate: true,
  },
  {
    key: 'profile',
    label: 'Hồ sơ',
    path: ROUTE_PATHS.profile,
    isPrivate: true,
  },
]
