import React from 'react'
import {
  HiCalendarDays,
  HiGift,
  HiHome,
  HiOutlineCalendarDays,
  HiOutlineGift,
  HiOutlineHome,
  HiOutlineSquares2X2,
  HiOutlineUser,
  HiSquares2X2,
  HiUser,
} from 'react-icons/hi2'
import { NavLink } from 'react-router-dom'

import { NAVIGATION_TABS, NavigationTabIconKey } from '@/mocks/navigation-tabs'
import { clsx } from '@/utils/clsx'

const ACTIVE_ICON_BY_KEY: Record<NavigationTabIconKey, React.ComponentType<{ size?: number }>> = {
  home: HiHome,
  booking: HiCalendarDays,
  services: HiSquares2X2,
  promotions: HiGift,
  profile: HiUser,
}

const DEFAULT_ICON_BY_KEY: Record<NavigationTabIconKey, React.ComponentType<{ size?: number }>> = {
  home: HiOutlineHome,
  booking: HiOutlineCalendarDays,
  services: HiOutlineSquares2X2,
  promotions: HiOutlineGift,
  profile: HiOutlineUser,
}

export function BottomNavigation() {
  return (
    <nav className="w-full grid grid-cols-5 gap-1 rounded-tl-md">
      {NAVIGATION_TABS.map((tab) => (
        <NavLink
          key={tab.key}
          to={tab.path}
          className={({ isActive }) =>
            clsx(
              'flex flex-col items-center justify-center rounded-lg px-1 text-center transition-all',
              isActive ? 'text-brand-pink' : 'text-text-primary',
            )
          }
        >
          {({ isActive }) => {
            const IconComponent = isActive ? ACTIVE_ICON_BY_KEY[tab.iconKey] : DEFAULT_ICON_BY_KEY[tab.iconKey]

            return <IconComponent size={25} />
          }}
        </NavLink>
      ))}
    </nav>
  )
}
