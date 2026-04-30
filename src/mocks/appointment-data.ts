export type AppointmentStatus = 'confirmed' | 'pending' | 'completed' | 'cancelled' | 'cancelled_by_salon'

export interface AppointmentService {
  name: string
  price: number
}

export interface AppointmentRecord {
  id: string
  status: AppointmentStatus
  dateIso: string
  startTime: string
  endTime: string
  services: AppointmentService[]
  technicianId: string | null
  technicianName: string
  technicianAvatar?: string
  technicianRating?: number
  branchId: string
  branchName: string
  branchAddress: string
  branchMapUrl?: string
  branchSupportsOnlineReschedule: boolean
  branchPhone?: string
  totalPrice: number
  durationMin: number
  pendingPoints?: number
  hasReviewed?: boolean
  cancelReason?: string
  note?: string
}

export interface CancelReasonOption {
  id: string
  label: string
  requiresDetail?: boolean
}

export const CANCEL_REASONS: CancelReasonOption[] = [
  { id: 'busy', label: 'Bận đột xuất' },
  { id: 'reschedule', label: 'Muốn đổi sang ngày khác' },
  { id: 'no_need', label: 'Không còn nhu cầu' },
  { id: 'other', label: 'Lý do khác', requiresDetail: true },
]

export const CANCEL_FEE_PERCENT = 20
export const CANCEL_FREE_HOURS = 2

export const mockAppointments: AppointmentRecord[] = [
  {
    id: 'LH240501',
    status: 'confirmed',
    dateIso: '2026-05-15',
    startTime: '14:00',
    endTime: '15:45',
    services: [
      { name: 'Sơn gel', price: 180000 },
      { name: 'Pedicure cơ bản', price: 150000 },
    ],
    technicianId: 'tech-mai',
    technicianName: 'Nguyễn Thị Mai',
    technicianAvatar: 'https://placehold.co/96x96/f075ae/ffffff?text=Mai',
    technicianRating: 4.9,
    branchId: 'branch-q3',
    branchName: 'Nail Spa – Quận 3',
    branchAddress: '123 Lê Lợi, Phường Bến Nghé, Quận 3',
    branchMapUrl: 'https://maps.google.com/?q=10.7769,106.7009',
    branchSupportsOnlineReschedule: true,
    branchPhone: '02838123456',
    totalPrice: 330000,
    durationMin: 105,
    pendingPoints: 33,
    note: 'Dị ứng với mùi acrylic, vui lòng dùng sản phẩm không mùi',
  },
  {
    id: 'LH240519',
    status: 'pending',
    dateIso: '2026-05-19',
    startTime: '10:00',
    endTime: '11:30',
    services: [{ name: 'Vẽ tay nail art', price: 250000 }],
    technicianId: null,
    technicianName: 'Bất kỳ KTV nào',
    branchId: 'branch-q1',
    branchName: 'Nail Spa – Quận 1',
    branchAddress: '45 Nguyễn Huệ, Phường Bến Nghé, Quận 1',
    branchMapUrl: 'https://maps.google.com/?q=10.7758,106.7029',
    branchSupportsOnlineReschedule: true,
    branchPhone: '02838654321',
    totalPrice: 250000,
    durationMin: 90,
    pendingPoints: 25,
  },
  {
    id: 'LH240430',
    status: 'confirmed',
    dateIso: '2026-04-30',
    startTime: '20:00',
    endTime: '20:45',
    services: [{ name: 'Sơn thường', price: 80000 }],
    technicianId: 'tech-trang',
    technicianName: 'Lê Thu Trang',
    technicianAvatar: 'https://placehold.co/96x96/fdefef/f075ae?text=Trang',
    technicianRating: 4.6,
    branchId: 'branch-q7',
    branchName: 'Nail Spa – Quận 7',
    branchAddress: '88 Nguyễn Thị Thập, Tân Phú, Quận 7',
    branchMapUrl: 'https://maps.google.com/?q=10.7322,106.7180',
    branchSupportsOnlineReschedule: false,
    branchPhone: '02839988877',
    totalPrice: 80000,
    durationMin: 45,
    pendingPoints: 8,
    note: 'Lịch sát giờ – để test chính sách hủy <2h',
  },
  {
    id: 'LH240425',
    status: 'completed',
    dateIso: '2026-04-25',
    startTime: '09:00',
    endTime: '10:00',
    services: [{ name: 'Sơn gel', price: 180000 }],
    technicianId: 'tech-lan',
    technicianName: 'Phạm Ngọc Lan',
    technicianAvatar: 'https://placehold.co/96x96/f9a8d4/ffffff?text=Lan',
    technicianRating: 4.8,
    branchId: 'branch-q7',
    branchName: 'Nail Spa – Quận 7',
    branchAddress: '88 Nguyễn Thị Thập, Tân Phú, Quận 7',
    branchMapUrl: 'https://maps.google.com/?q=10.7322,106.7180',
    branchSupportsOnlineReschedule: true,
    branchPhone: '02839988877',
    totalPrice: 180000,
    durationMin: 60,
    hasReviewed: false,
  },
  {
    id: 'LH240412',
    status: 'completed',
    dateIso: '2026-04-12',
    startTime: '15:30',
    endTime: '17:00',
    services: [{ name: 'Pedicure deluxe', price: 280000 }],
    technicianId: 'tech-trang',
    technicianName: 'Lê Thu Trang',
    technicianAvatar: 'https://placehold.co/96x96/fdefef/f075ae?text=Trang',
    technicianRating: 4.6,
    branchId: 'branch-binhthanh',
    branchName: 'Nail Spa – Bình Thạnh',
    branchAddress: '210 Đinh Tiên Hoàng, Phường 3, Bình Thạnh',
    branchMapUrl: 'https://maps.google.com/?q=10.8019,106.7115',
    branchSupportsOnlineReschedule: true,
    branchPhone: '02838111222',
    totalPrice: 280000,
    durationMin: 90,
    hasReviewed: true,
  },
  {
    id: 'LH240328',
    status: 'cancelled',
    dateIso: '2026-03-28',
    startTime: '11:00',
    endTime: '12:30',
    services: [{ name: 'Đính đá rhinestone', price: 120000 }],
    technicianId: 'tech-mai',
    technicianName: 'Nguyễn Thị Mai',
    technicianAvatar: 'https://placehold.co/96x96/f075ae/ffffff?text=Mai',
    technicianRating: 4.9,
    branchId: 'branch-q3',
    branchName: 'Nail Spa – Quận 3',
    branchAddress: '123 Lê Lợi, Phường Bến Nghé, Quận 3',
    branchMapUrl: 'https://maps.google.com/?q=10.7769,106.7009',
    branchSupportsOnlineReschedule: true,
    branchPhone: '02838123456',
    totalPrice: 120000,
    durationMin: 60,
    cancelReason: 'Khách hủy do bận đột xuất',
  },
  {
    id: 'LH240315',
    status: 'cancelled_by_salon',
    dateIso: '2026-03-15',
    startTime: '14:00',
    endTime: '15:00',
    services: [{ name: 'Sơn thường', price: 80000 }],
    technicianId: 'tech-khoa',
    technicianName: 'Trần Minh Khoa',
    technicianAvatar: 'https://placehold.co/96x96/fdefef/f075ae?text=Khoa',
    technicianRating: 4.7,
    branchId: 'branch-thuduc',
    branchName: 'Nail Spa – Thủ Đức',
    branchAddress: '15 Võ Văn Ngân, Phường Bình Thọ, Thủ Đức',
    branchMapUrl: 'https://maps.google.com/?q=10.8499,106.7720',
    branchSupportsOnlineReschedule: true,
    branchPhone: '02838223344',
    totalPrice: 80000,
    durationMin: 45,
    cancelReason: 'Salon đóng cửa đột xuất do sự cố điện',
  },
]

export function getAppointmentById(id: string): AppointmentRecord | null {
  return mockAppointments.find((a) => a.id === id) ?? null
}

export function isUpcomingStatus(status: AppointmentStatus): boolean {
  return status === 'confirmed' || status === 'pending'
}

export function isCompletedStatus(status: AppointmentStatus): boolean {
  return status === 'completed'
}

export function isCancelledStatus(status: AppointmentStatus): boolean {
  return status === 'cancelled' || status === 'cancelled_by_salon'
}
