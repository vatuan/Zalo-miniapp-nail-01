import React from 'react'
import { Outlet } from 'react-router-dom'

import { BottomNavigation } from '@/shared/components/bottom-navigation'

import { PageLayoutProvider, usePageHeaderState } from './page-layout-context'

function MainLayoutFrame() {
  const headerConfig = usePageHeaderState()

  return (
    <div className="h-screen flex flex-col overflow-hidden">
      <header className="shrink-0 pt-8 pb-4 border-b bg-white">{headerConfig?.content}</header>

      <main className="flex-1 overflow-y-auto">
        <Outlet />
      </main>

      <footer className="shrink-0 h-16 border-t bg-white flex items-center justify-center shadow-lg">
        <BottomNavigation />
      </footer>
    </div>
  )
}

export function MainLayout() {
  return (
    <PageLayoutProvider>
      <MainLayoutFrame />
    </PageLayoutProvider>
  )
}
