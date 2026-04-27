import { create } from 'zustand'

import { Branch } from '@/mocks/branch-data'
import { Service } from '@/mocks/service-data'

type BookingState = {
  selectedBranch: Branch | null
  selectedServices: Service[]
  selectedComboIds: string[]
  setSelectedBranch: (branch: Branch | null) => void
  setSelectedServices: (services: Service[]) => void
  setSelectedComboIds: (ids: string[]) => void
  clearServices: () => void
  clearBooking: () => void
}

const INITIAL_SERVICES: Service[] = []
const INITIAL_COMBO_IDS: string[] = []

export const useBookingStore = create<BookingState>((set) => ({
  selectedBranch: null,
  selectedServices: INITIAL_SERVICES,
  selectedComboIds: INITIAL_COMBO_IDS,
  setSelectedBranch: (branch) => set({ selectedBranch: branch }),
  setSelectedServices: (services) => set({ selectedServices: services }),
  setSelectedComboIds: (ids) => set({ selectedComboIds: ids }),
  clearServices: () => set({ selectedServices: INITIAL_SERVICES, selectedComboIds: INITIAL_COMBO_IDS }),
  clearBooking: () =>
    set({
      selectedBranch: null,
      selectedServices: INITIAL_SERVICES,
      selectedComboIds: INITIAL_COMBO_IDS,
    }),
}))
