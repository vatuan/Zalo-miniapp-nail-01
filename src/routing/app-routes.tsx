import React from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'

import { AppShell } from '@/app/shell/app-shell'
import { PrivateRoute } from '@/guards/private-route'
import { MainLayout } from '@/layouts/main-layout'
import AuthPage from '@/pages/auth-page'
import BookingPage from '@/pages/booking-page'
import HomePage from '@/pages/home-page'
import OffersPage from '@/pages/offers-page'
import ProfilePage from '@/pages/profile-page'
import ServicesPage from '@/pages/services-page'
import { ROUTE_PATHS } from '@/routing/paths'

export function AppRoutes() {
  return (
    <Routes>
      <Route element={<AppShell />}>
        <Route path={ROUTE_PATHS.auth} element={<AuthPage />} />

        <Route element={<MainLayout />}>
          <Route path={ROUTE_PATHS.home} element={<HomePage />} />
          <Route path={ROUTE_PATHS.services} element={<ServicesPage />} />

          <Route element={<PrivateRoute />}>
            <Route path={ROUTE_PATHS.booking} element={<BookingPage />} />
            <Route path={ROUTE_PATHS.offers} element={<OffersPage />} />
            <Route path={ROUTE_PATHS.profile} element={<ProfilePage />} />
          </Route>
        </Route>

        <Route path="*" element={<Navigate replace to={ROUTE_PATHS.home} />} />
      </Route>
    </Routes>
  )
}
