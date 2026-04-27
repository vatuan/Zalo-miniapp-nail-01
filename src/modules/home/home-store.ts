import { create } from 'zustand'

import {
  AppointmentStatus,
  mockUpcomingAppointment,
  mockUser,
  UpcomingAppointment,
  UserProfile,
} from '@/mocks/home-data'

const cloneUser = (): UserProfile => ({ ...mockUser })

const cloneAppointment = (): UpcomingAppointment => {
  if (!mockUpcomingAppointment) {
    return null
  }

  return {
    ...mockUpcomingAppointment,
    services: [...mockUpcomingAppointment.services],
  }
}

type HomeState = {
  user: UserProfile
  upcomingAppointment: UpcomingAppointment
  isOffline: boolean
  setOffline: (value: boolean) => void
  setGuestMode: () => void
  setLoggedInMode: () => void
  setAppointmentStatus: (status: AppointmentStatus) => void
  clearUpcomingAppointment: () => void
  resetHomeData: () => void
}

export const useHomeStore = create<HomeState>((set) => ({
  user: cloneUser(),
  upcomingAppointment: cloneAppointment(),
  isOffline: false,
  setOffline: (value) => set({ isOffline: value }),
  setGuestMode: () =>
    set((state) => ({
      user: {
        ...state.user,
        isLoggedIn: false,
      },
      upcomingAppointment: null,
    })),
  setLoggedInMode: () =>
    set({
      user: {
        ...cloneUser(),
        isLoggedIn: true,
      },
      upcomingAppointment: cloneAppointment(),
    }),
  setAppointmentStatus: (status) =>
    set((state) => {
      if (!state.upcomingAppointment) {
        return state
      }

      return {
        upcomingAppointment: {
          ...state.upcomingAppointment,
          status,
        },
      }
    }),
  clearUpcomingAppointment: () => set({ upcomingAppointment: null }),
  resetHomeData: () =>
    set({
      user: cloneUser(),
      upcomingAppointment: cloneAppointment(),
      isOffline: false,
    }),
}))
