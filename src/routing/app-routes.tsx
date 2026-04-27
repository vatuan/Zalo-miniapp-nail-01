import React from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'

import { AppShell } from '@/app/shell/app-shell'
import { MainLayout } from '@/layouts/main-layout'
import AppointmentDetailPage from '@/pages/appointment-detail-page'
import BookingPage from '@/pages/booking-page'
import GalleryPage from '@/pages/gallery-page'
import HomePage from '@/pages/home-page'
import LoginPage from '@/pages/login-page'
import NotificationsPage from '@/pages/notifications-page'
import ProfilePage from '@/pages/profile-page'
import PromotionDetailPage from '@/pages/promotion-detail-page'
import PromotionsPage from '@/pages/promotions-page'
import ServicesPage from '@/pages/services-page'
import { ROUTE_PATHS } from '@/routing/paths'

export function AppRoutes() {
  return (
    <Routes>
      <Route element={<AppShell />}>
        <Route element={<MainLayout />}>
          <Route path={ROUTE_PATHS.home} element={<HomePage />} />
          <Route path={ROUTE_PATHS.notifications} element={<NotificationsPage />} />
          <Route path={ROUTE_PATHS.appointmentDetailBase} element={<AppointmentDetailPage />} />
          <Route path={ROUTE_PATHS.booking} element={<BookingPage />} />
          <Route path={ROUTE_PATHS.promotions} element={<PromotionsPage />} />
          <Route path={ROUTE_PATHS.promotionDetailBase} element={<PromotionDetailPage />} />
          <Route path={ROUTE_PATHS.services} element={<ServicesPage />} />
          <Route path={ROUTE_PATHS.gallery} element={<GalleryPage />} />
          <Route path={ROUTE_PATHS.profile} element={<ProfilePage />} />
          <Route path={ROUTE_PATHS.login} element={<LoginPage />} />
          <Route path={ROUTE_PATHS.auth} element={<Navigate replace to={ROUTE_PATHS.login} />} />
        </Route>

        <Route path="*" element={<Navigate replace to={ROUTE_PATHS.home} />} />
      </Route>
    </Routes>
  )
}
