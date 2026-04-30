import { useEffect, useMemo, useState } from 'react'

import {
  AppointmentRecord,
  isCancelledStatus,
  isCompletedStatus,
  isUpcomingStatus,
  mockAppointments,
} from '@/mocks/appointment-data'

import { AppointmentTab } from '../components/tab-bar'

type UseAppointmentListResult = {
  list: AppointmentRecord[]
  upcomingCount: number
  cancelById: (id: string) => void
}

export function useAppointmentList(activeTab: AppointmentTab): UseAppointmentListResult {
  const [appointments, setAppointments] = useState<AppointmentRecord[]>(mockAppointments)

  useEffect(() => {
    setAppointments(mockAppointments)
  }, [])

  const upcomingCount = useMemo(() => appointments.filter((a) => isUpcomingStatus(a.status)).length, [appointments])

  const list = useMemo(() => {
    if (activeTab === 'upcoming') return appointments.filter((a) => isUpcomingStatus(a.status))
    if (activeTab === 'completed') return appointments.filter((a) => isCompletedStatus(a.status))
    return appointments.filter((a) => isCancelledStatus(a.status))
  }, [appointments, activeTab])

  const cancelById = (id: string) => {
    setAppointments((prev) =>
      prev.map((appt) => (appt.id === id ? { ...appt, status: 'cancelled', cancelReason: 'Khách hủy' } : appt)),
    )
  }

  return { list, upcomingCount, cancelById }
}
