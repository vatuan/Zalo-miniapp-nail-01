import React from 'react'
import { NavLink } from 'react-router-dom'

import { NAVIGATION_TABS } from '@/mocks/navigation-tabs'
import { clsx } from '@/utils/clsx'

export function BottomNavigation() {
  return (
    <nav className="fixed bottom-0 left-0 right-0 border-t border-nav-border bg-nav-surface px-2 pb-[calc(var(--zaui-safe-area-inset-bottom,0px)+8px)] pt-2">
      <ul className="grid grid-cols-5 gap-1">
        {NAVIGATION_TABS.map((tab) => (
          <NavLink
            to={tab.path}
            className={({ isActive }) =>
              clsx(
                'flex min-h-12 items-center justify-center rounded-lg px-1 text-center text-xs font-medium',
                isActive ? 'bg-nav-item-active-bg text-nav-text-active' : 'text-nav-text-default',
              )
            }
          >
            {tab.label}
          </NavLink>
        ))}
      </ul>
    </nav>
  )
}
