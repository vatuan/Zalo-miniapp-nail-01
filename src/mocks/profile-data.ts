import { ROUTE_PATHS } from '@/routing/paths'

import { TierId } from './loyalty-data'

// ─── Types ────────────────────────────────────────────────────────────────────

export interface ProfileUser {
  name: string
  phone: string | null
  avatarUrl: string | null
  tier: TierId
  points: number
  memberSince: string // "MM/YYYY"
  savedNailCount: number
}

export interface ProfileShortcut {
  id: string
  label: string
  icon: string // emoji
  path: string // ROUTE_PATHS value
}

// ─── Default profile ──────────────────────────────────────────────────────────

export const userProfile: ProfileUser = {
  name: 'Nguyễn Thị Linh',
  phone: '0901 234 567',
  avatarUrl: 'https://i.pravatar.cc/128?img=47',
  tier: 'silver',
  points: 450,
  memberSince: '01/2024',
  savedNailCount: 12,
}

// ─── Edge case profile (missing phone + avatar) ───────────────────────────────

export const profileEdgeCases: ProfileUser = {
  name: 'Nguyễn Thị Linh',
  phone: null,
  avatarUrl: null,
  tier: 'silver',
  points: 450,
  memberSince: '01/2024',
  savedNailCount: 12,
}

// ─── Shortcuts (2x2 grid) ─────────────────────────────────────────────────────

export const shortcuts: ProfileShortcut[] = [
  {
    id: 'appointments',
    label: 'Lịch hẹn',
    icon: '📅',
    path: ROUTE_PATHS.myAppointments,
  },
  {
    id: 'loyalty',
    label: 'Điểm',
    icon: '💎',
    path: ROUTE_PATHS.loyalty,
  },
  {
    id: 'saved-nails',
    label: 'Mẫu nail đã lưu',
    icon: '🖼',
    path: ROUTE_PATHS.gallery,
  },
  {
    id: 'vouchers',
    label: 'Ưu đãi & Voucher',
    icon: '🎟',
    path: ROUTE_PATHS.promotions,
  },
]

// ─── App version ──────────────────────────────────────────────────────────────

export const appVersion = '1.0.2'
