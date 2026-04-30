import React, { useEffect, useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Box, useSnackbar } from 'zmp-ui'

import { useConfigurePageHeader } from '@/layouts/page-layout-context'
import { ROUTE_PATHS } from '@/routing/paths'
import { PageHeader } from '@/shared/components'
import { useAuthStore } from '@/stores/auth-store'

import { EmptyState } from './components/empty-state'
import { MonthGroupSection } from './components/month-group-section'
import { AppointmentTab, TabBar } from './components/tab-bar'
import { useAppointmentList } from './hooks/use-appointment-list'
import { groupAppointmentsByMonth } from './utils/group-by-month'

export function MyAppointmentsPageModule() {
  const navigate = useNavigate()
  const { openSnackbar } = useSnackbar()
  // const isAuthenticated = useAuthStore((state) => state.isAuthenticated)
  const isAuthenticated = true

  const [activeTab, setActiveTab] = useState<AppointmentTab>('upcoming')

  const headerConfig = useMemo(
    () => ({
      content: (
        <Box className="w-full">
          <PageHeader title="Lịch hẹn của tôi" onBack={() => navigate(ROUTE_PATHS.profile)} />
        </Box>
      ),
    }),
    [navigate],
  )

  useConfigurePageHeader(headerConfig)

  useEffect(() => {
    if (!isAuthenticated) navigate(ROUTE_PATHS.login, { replace: true })
  }, [isAuthenticated, navigate])

  const { list, upcomingCount } = useAppointmentList(activeTab)

  const groups = useMemo(
    () => groupAppointmentsByMonth(list, activeTab === 'upcoming' ? 'asc' : 'desc'),
    [list, activeTab],
  )

  const handleOpenDetail = (id: string) => {
    navigate(ROUTE_PATHS.appointmentDetailBase.replace(':id', id))
  }

  const handleRequestCancel = (id: string) => {
    navigate(ROUTE_PATHS.appointmentCancelBase.replace(':id', id))
  }

  const handleRebook = () => {
    navigate(ROUTE_PATHS.bookingBranch)
  }

  const handleReview = (id: string) => {
    openSnackbar({ text: `Mở form đánh giá cho lịch ${id}`, type: 'success' })
  }

  return (
    <Box className="flex min-h-full flex-col bg-app-bg">
      <TabBar activeTab={activeTab} upcomingCount={upcomingCount} onChange={setActiveTab} />

      <Box className="flex flex-1 flex-col gap-4 px-4 pt-4 pb-8">
        {groups.length === 0 ? (
          <EmptyState
            tab={activeTab}
            onPrimaryAction={activeTab === 'upcoming' ? () => navigate(ROUTE_PATHS.bookingBranch) : undefined}
          />
        ) : (
          groups.map((group) => (
            <MonthGroupSection
              key={group.monthKey}
              monthLabel={group.monthLabel}
              appointments={group.appointments}
              onOpenDetail={handleOpenDetail}
              onCancel={activeTab === 'upcoming' ? handleRequestCancel : undefined}
              onRebook={activeTab !== 'upcoming' ? handleRebook : undefined}
              onReview={handleReview}
            />
          ))
        )}
      </Box>
    </Box>
  )
}
