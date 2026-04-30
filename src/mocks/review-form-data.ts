import { getAppointmentById } from './appointment-data'

// ─── Quick Tags ───────────────────────────────────────────────────────────────

export const AVAILABLE_QUICK_TAGS: string[] = [
  'Đúng mẫu',
  'Tỉ mỉ',
  'Sạch sẽ',
  'Đúng giờ',
  'Thân thiện',
  'Giá hợp lý',
]

// ─── BookingRef ───────────────────────────────────────────────────────────────
// Derived view of AppointmentRecord — only what the review form needs.
// Test fixtures (derived from appointment-data):
//   LH240425 → hasReviewed: false  (normal flow)
//   LH240412 → hasReviewed: true   (duplicate block)

export interface BookingRef {
  id: string
  serviceName: string  // services[].name joined with " + "
  ktvName: string
  dateIso: string
  hasReviewed: boolean
}

export function getBookingRefById(bookingId: string): BookingRef | undefined {
  const appointment = getAppointmentById(bookingId)
  if (!appointment) return undefined

  return {
    id: appointment.id,
    serviceName: appointment.services.map((s) => s.name).join(' + '),
    ktvName: appointment.technicianName,
    dateIso: appointment.dateIso,
    hasReviewed: appointment.hasReviewed ?? false,
  }
}

// ─── ReviewPayload ────────────────────────────────────────────────────────────
// Represents the outgoing payload built by the form.
// rating: 0 = untouched (form not yet submitted)

export interface ReviewPayload {
  bookingId: string
  rating: 0 | 1 | 2 | 3 | 4 | 5
  tags: string[]
  text: string          // max 500 chars
  photos: string[]      // local paths from chooseImage; max 3
  wantsFollowUp: boolean  // only meaningful when rating <= 2
}

export const INITIAL_REVIEW_PAYLOAD: ReviewPayload = {
  bookingId: '',
  rating: 0,
  tags: [],
  text: '',
  photos: [],
  wantsFollowUp: false,
}
