import React from 'react'
import { Navigate, Outlet, useLocation } from 'react-router-dom'

import { ROUTE_PATHS } from '@/routing/paths'
import { useAuthStore } from '@/stores/auth-store'

export function PrivateRoute() {
  const location = useLocation()
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated)

  if (!isAuthenticated) {
    const redirect = `${location.pathname}${location.search}`
    return <Navigate replace to={`${ROUTE_PATHS.auth}?redirect=${encodeURIComponent(redirect)}`} />
  }

  return <Outlet />
}
