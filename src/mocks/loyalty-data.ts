// ─── Types ────────────────────────────────────────────────────────────────────

export type TierId = 'bronze' | 'silver' | 'gold' | 'diamond'

export interface MemberProfile {
  name: string
  tier: TierId
  points: number
  memberSince: string // "MM/YYYY"
  tierExpiryDate: string // "YYYY-MM-DD"
  isTierExpiringSoon: boolean
  daysUntilReset: number
}

export interface TierConfig {
  id: TierId
  label: string
  icon: string
  gradient: string // tailwind gradient classes
  minSpend: number // VND threshold to reach this tier
  benefits: string[]
}

export interface NextTierProgress {
  nextTier: TierId | null
  amountToNext: number // VND remaining to next tier
  bookingsToNext: number // estimated bookings remaining
  progressPercent: number // 0–100
}

export interface RedeemOption {
  id: string
  pointsCost: number
  voucherLabel: string
  discountAmount: number // VND
}

export interface PointHistoryEntry {
  id: string
  delta: number // positive = earned, negative = redeemed
  source: string
  date: string // "YYYY-MM-DD"
}

// ─── Member ───────────────────────────────────────────────────────────────────

export const memberProfile: MemberProfile = {
  name: 'Nguyễn Mỹ Linh',
  tier: 'silver',
  points: 450,
  memberSince: '01/2024',
  tierExpiryDate: '2026-12-31',
  isTierExpiringSoon: true,
  daysUntilReset: 42,
}

// ─── Tier config ──────────────────────────────────────────────────────────────

export const tierConfig: TierConfig[] = [
  {
    id: 'bronze',
    label: 'BRONZE MEMBER',
    icon: '🥉',
    gradient: 'from-orange-400 via-orange-500 to-amber-700',
    minSpend: 0,
    benefits: ['Tích điểm 1% mỗi lần đặt lịch', 'Nhận thông báo khuyến mãi sớm', 'Quà tặng sinh nhật cơ bản'],
  },
  {
    id: 'silver',
    label: 'SILVER MEMBER',
    icon: '🥈',
    gradient: 'from-slate-300 via-slate-400 to-slate-500',
    minSpend: 2000000,
    benefits: [
      'Giảm 5% mỗi lần đặt lịch',
      'Tích điểm 2% mỗi lần đặt lịch',
      'Ưu tiên đặt lịch cuối tuần',
      'Quà tặng sinh nhật đặc biệt',
    ],
  },
  {
    id: 'gold',
    label: 'GOLD MEMBER',
    icon: '🥇',
    gradient: 'from-yellow-300 via-amber-400 to-yellow-600',
    minSpend: 5000000,
    benefits: [
      'Giảm 10% mỗi lần đặt lịch',
      'Tích điểm 3% mỗi lần đặt lịch',
      'Tặng 1 dịch vụ dưỡng móng/tháng',
      'Ưu tiên kỹ thuật viên hàng đầu',
      'Quà tặng sinh nhật cao cấp',
    ],
  },
  {
    id: 'diamond',
    label: 'DIAMOND MEMBER',
    icon: '💎',
    gradient: 'from-indigo-400 via-purple-500 to-blue-600',
    minSpend: 15000000,
    benefits: [
      'Giảm 15% mỗi lần đặt lịch',
      'Tích điểm 5% mỗi lần đặt lịch',
      'Tặng 2 dịch vụ cao cấp/tháng',
      'Kỹ thuật viên riêng theo yêu cầu',
      'Phòng VIP riêng',
      'Quà tặng sinh nhật VIP',
    ],
  },
]

// ─── Next tier progress (relative to current tier in memberProfile) ───────────

export const nextTierProgress: NextTierProgress = {
  nextTier: 'gold',
  amountToNext: 550000,
  bookingsToNext: 2,
  progressPercent: 65,
}

// ─── Redeem options ───────────────────────────────────────────────────────────

export const redeemOptions: RedeemOption[] = [
  {
    id: 'redeem-100-10k',
    pointsCost: 100,
    voucherLabel: 'Voucher Giảm 10.000đ',
    discountAmount: 10000,
  },
  {
    id: 'redeem-500-60k',
    pointsCost: 500,
    voucherLabel: 'Voucher Giảm 60.000đ',
    discountAmount: 60000,
  },
]

// ─── Point history ────────────────────────────────────────────────────────────

export const pointHistory: PointHistoryEntry[] = [
  {
    id: 'ph-001',
    delta: 50,
    source: 'Đặt lịch dịch vụ Sơn Gel',
    date: '2025-12-18',
  },
  {
    id: 'ph-002',
    delta: -100,
    source: 'Đổi voucher giảm 10.000đ',
    date: '2025-11-05',
  },
  {
    id: 'ph-003',
    delta: 80,
    source: 'Đặt lịch combo Mani + Pedi',
    date: '2025-10-22',
  },
  {
    id: 'ph-004',
    delta: 30,
    source: 'Đánh giá dịch vụ',
    date: '2025-08-14',
  },
  {
    id: 'ph-005',
    delta: 120,
    source: 'Đặt lịch Nail Art cao cấp',
    date: '2025-06-09',
  },
  {
    id: 'ph-006',
    delta: -100,
    source: 'Đổi voucher giảm 10.000đ',
    date: '2025-03-27',
  },
  {
    id: 'ph-007',
    delta: 60,
    source: 'Đặt lịch dịch vụ Đắp bột',
    date: '2024-11-15',
  },
  {
    id: 'ph-008',
    delta: 40,
    source: 'Giới thiệu bạn bè',
    date: '2024-04-02',
  },
]

// ─── Helpers ──────────────────────────────────────────────────────────────────

export function getTierConfig(id: TierId): TierConfig {
  return tierConfig.find((t) => t.id === id) ?? tierConfig[0]
}

export function canRedeem(option: RedeemOption, points: number): boolean {
  return points >= option.pointsCost
}
