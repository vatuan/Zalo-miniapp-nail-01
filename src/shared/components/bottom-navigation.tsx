import React from 'react'
import { NavLink } from 'react-router-dom'

import { NAVIGATION_TABS } from '@/mocks/navigation-tabs'

export function BottomNavigation() {
  return (
    <nav className="fixed bottom-0 left-0 right-0 border-t border-[#ececec] bg-white px-2 pb-[calc(var(--zaui-safe-area-inset-bottom,0px)+8px)] pt-2">
      <ul className="grid grid-cols-5 gap-1">
        {NAVIGATION_TABS.map((tab) => (
          <li key={tab.key}>
            <NavLink
              to={tab.path}
              className={({ isActive }) =>
                [
                  'flex min-h-12 items-center justify-center rounded-lg px-1 text-center text-xs font-medium',
                  isActive ? 'bg-[#eef7ff] text-[#0a78ff]' : 'text-[#6f7071]',
                ].join(' ')
              }
            >
              {tab.label}
            </NavLink>
          </li>
        ))}
      </ul>
    </nav>
  )
}
