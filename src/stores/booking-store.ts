import { create } from 'zustand'

import { Branch } from '@/mocks/branch-data'
import { Service } from '@/mocks/service-data'

export type BookingConfirmationStatus = 'pending' | 'confirmed'

export interface ConfirmedBooking {
  id: string
  branch: Branch | null
  services: Service[]
  technicianId: string | null
  technicianName: string
  dateIso: string | null
  timeSlot: string | null
  totalDurationMin: number
  total: number
  pendingPoints: number
  status: BookingConfirmationStatus
  createdAt: number
}

type BookingState = {
  selectedBranch: Branch | null
  selectedServices: Service[]
  selectedComboIds: string[]
  selectedTechnicianId: string | null
  selectedDateIso: string | null
  selectedTimeSlot: string | null
  lastConfirmedBooking: ConfirmedBooking | null
  referenceNote: string | null
  setSelectedBranch: (branch: Branch | null) => void
  setSelectedServices: (services: Service[]) => void
  setSelectedComboIds: (ids: string[]) => void
  setSelectedTechnicianId: (id: string | null) => void
  setSelectedDateIso: (iso: string | null) => void
  setSelectedTimeSlot: (slot: string | null) => void
  setLastConfirmedBooking: (booking: ConfirmedBooking | null) => void
  setReferenceNote: (note: string | null) => void
  clearServices: () => void
  clearBooking: () => void
}

const INITIAL_SERVICES: Service[] = []
const INITIAL_COMBO_IDS: string[] = []

export const useBookingStore = create<BookingState>((set) => ({
  selectedBranch: null,
  selectedServices: INITIAL_SERVICES,
  selectedComboIds: INITIAL_COMBO_IDS,
  selectedTechnicianId: null,
  selectedDateIso: null,
  selectedTimeSlot: null,
  lastConfirmedBooking: null,
  referenceNote: null,
  setSelectedBranch: (branch) => set({ selectedBranch: branch }),
  setSelectedServices: (services) => set({ selectedServices: services }),
  setSelectedComboIds: (ids) => set({ selectedComboIds: ids }),
  setSelectedTechnicianId: (id) => set({ selectedTechnicianId: id }),
  setSelectedDateIso: (iso) => set({ selectedDateIso: iso }),
  setSelectedTimeSlot: (slot) => set({ selectedTimeSlot: slot }),
  setLastConfirmedBooking: (booking) => set({ lastConfirmedBooking: booking }),
  setReferenceNote: (note) => set({ referenceNote: note }),
  clearServices: () => set({ selectedServices: INITIAL_SERVICES, selectedComboIds: INITIAL_COMBO_IDS }),
  clearBooking: () =>
    set({
      selectedBranch: null,
      selectedServices: INITIAL_SERVICES,
      selectedComboIds: INITIAL_COMBO_IDS,
      selectedTechnicianId: null,
      selectedDateIso: null,
      selectedTimeSlot: null,
      referenceNote: null,
    }),
}))
