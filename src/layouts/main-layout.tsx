import React from 'react'
import { Outlet } from 'react-router-dom'

import { AuthToggleButton } from '@/shared/components/auth-toggle-button'
import { BottomNavigation } from '@/shared/components/bottom-navigation'

export function MainLayout() {
  return (
    <div className="min-h-screen bg-app-bg text-text-primary">
      <main className="px-4 pb-[calc(var(--zaui-safe-area-inset-bottom,0px)+76px)] pt-[calc(var(--zaui-safe-area-inset-top,0px)+16px)]">
        <div className="mb-4 flex justify-end">
          <AuthToggleButton />
        </div>
        <Outlet />
      </main>
      <BottomNavigation />
    </div>
  )
}
