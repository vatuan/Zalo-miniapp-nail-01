import React from 'react'
import { useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { Button, Text } from 'zmp-ui'

import { ROUTE_PATHS } from '@/routing/paths'
import { useAuthStore } from '@/stores/auth-store'

export function AuthGateModule() {
  const location = useLocation()
  const navigate = useNavigate()
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated)
  const login = useAuthStore((state) => state.login)
  const logout = useAuthStore((state) => state.logout)

  const searchParams = new URLSearchParams(location.search)
  const redirectPath = searchParams.get('redirect') || ROUTE_PATHS.home

  useEffect(() => {
    if (isAuthenticated) {
      navigate(redirectPath, { replace: true })
    }
  }, [isAuthenticated, navigate, redirectPath])

  const handleLogin = () => {
    login()
    navigate(redirectPath, { replace: true })
  }

  return (
    <div className="min-h-screen bg-app-bg px-4 pt-[calc(var(--zaui-safe-area-inset-top,0px)+24px)]">
      <div className="rounded-xl border border-card-border bg-card-surface p-4">
        <Text size="xLarge" className="font-semibold text-text-primary">
          Mock Auth Gate
        </Text>
        <Text className="mt-2 text-text-primary">Private tab detected. Please login to continue.</Text>
        <Text className="mt-1 text-text-secondary">Redirect after login: {redirectPath}</Text>

        <div className="mt-4 flex gap-2">
          <Button onClick={handleLogin}>Login (Mock)</Button>
          <Button variant="secondary" onClick={logout}>
            Logout (Mock)
          </Button>
        </div>
      </div>
    </div>
  )
}
