import { create } from 'zustand'

import { Branch } from '@/mocks/branch-data'

type BookingState = {
  selectedBranch: Branch | null
  setSelectedBranch: (branch: Branch | null) => void
  clearBooking: () => void
}

export const useBookingStore = create<BookingState>((set) => ({
  selectedBranch: null,
  setSelectedBranch: (branch) => set({ selectedBranch: branch }),
  clearBooking: () => set({ selectedBranch: null }),
}))
