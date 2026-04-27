import { ROUTE_PATHS } from '@/routing/paths'

export type NavigationTabIconKey = 'home' | 'booking' | 'services' | 'promotions' | 'profile'

export type NavigationTab = {
  key: string
  iconKey: NavigationTabIconKey
  label: string
  path: string
}

export const NAVIGATION_TABS: NavigationTab[] = [
  {
    key: 'home',
    iconKey: 'home',
    label: 'Trang chủ',
    path: ROUTE_PATHS.home,
  },
  {
    key: 'booking',
    iconKey: 'booking',
    label: 'Đặt lịch',
    path: ROUTE_PATHS.booking,
  },
  {
    key: 'services',
    iconKey: 'services',
    label: 'Dịch vụ',
    path: ROUTE_PATHS.services,
  },
  {
    key: 'promotions',
    iconKey: 'promotions',
    label: 'Ưu đãi',
    path: ROUTE_PATHS.promotions,
  },
  {
    key: 'profile',
    iconKey: 'profile',
    label: 'Hồ sơ',
    path: ROUTE_PATHS.profile,
  },
]
