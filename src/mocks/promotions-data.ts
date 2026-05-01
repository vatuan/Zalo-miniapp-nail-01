// ─── Promos ───────────────────────────────────────────────────────────────────

export interface Promo {
  id: string
  bannerUrl: string
  title: string
  applicableDays: string // display string, e.g. "Thứ 2 – Thứ 4"
  expiryDate: string // "YYYY-MM-DD"
  isExpiringSoon: boolean
  daysLeft?: number // only present when isExpiringSoon: true
}

export const mockPromos: Promo[] = [
  {
    id: 'promo-gel-30',
    bannerUrl: 'https://picsum.photos/seed/promo-gel-30/430/200',
    title: 'Giảm 30% Sơn Gel',
    applicableDays: 'Thứ 2 – Thứ 4',
    expiryDate: '2026-05-31',
    isExpiringSoon: false,
  },
  {
    id: 'promo-birthday',
    bannerUrl: 'https://picsum.photos/seed/promo-birthday/430/200',
    title: 'Combo Sinh Nhật Đặc Biệt – Tặng 1 dịch vụ dưỡng móng',
    applicableDays: 'Tất cả các ngày',
    expiryDate: '2026-06-15',
    isExpiringSoon: false,
  },
  {
    id: 'promo-pedi-weekend',
    bannerUrl: 'https://picsum.photos/seed/promo-pedi-weekend/430/200',
    title: 'Pedicure Thư Giãn Cuối Tuần – Giảm 20%',
    applicableDays: 'Thứ 7 – Chủ nhật',
    expiryDate: '2026-05-03',
    isExpiringSoon: true,
    daysLeft: 2,
  },
]

// ─── Vouchers ─────────────────────────────────────────────────────────────────

export type VoucherStatus = 'active' | 'used' | 'expired'

export interface UserVoucher {
  id: string
  code: string // e.g. "NAIL50K"
  discountAmount: number // VND, e.g. 50000
  minOrder: number // 0 = no minimum
  expiryDate: string // "YYYY-MM-DD"
  status: VoucherStatus
  isExpiringToday: boolean
}

export const mockUserVouchers: UserVoucher[] = [
  {
    id: 'v-nail50k',
    code: 'NAIL50K',
    discountAmount: 50000,
    minOrder: 200000,
    expiryDate: '2026-06-30',
    status: 'active',
    isExpiringToday: false,
  },
  {
    id: 'v-today30k',
    code: 'TODAY30K',
    discountAmount: 30000,
    minOrder: 100000,
    expiryDate: '2026-05-01',
    status: 'active',
    isExpiringToday: true,
  },
  {
    id: 'v-spring20k',
    code: 'SPRING20K',
    discountAmount: 20000,
    minOrder: 150000,
    expiryDate: '2026-04-30',
    status: 'used',
    isExpiringToday: false,
  },
  {
    id: 'v-tet100k',
    code: 'TET100K',
    discountAmount: 100000,
    minOrder: 300000,
    expiryDate: '2026-02-28',
    status: 'expired',
    isExpiringToday: false,
  },
]

// ─── Helpers ──────────────────────────────────────────────────────────────────

export function getActivePromos(): Promo[] {
  return mockPromos.filter((p) => !p.isExpiringSoon)
}

export function getEndingSoonPromos(): Promo[] {
  return mockPromos.filter((p) => p.isExpiringSoon)
}

export function getVouchersByStatus(status: VoucherStatus): UserVoucher[] {
  return mockUserVouchers.filter((v) => v.status === status)
}

export function getActiveVoucherCount(): number {
  return mockUserVouchers.filter((v) => v.status === 'active').length
}
