import { HiCalendar, HiHeart, HiIdentification, HiTicket } from 'react-icons/hi2'
import { IoDiamondOutline } from 'react-icons/io5'

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
  icon: React.ReactNode | React.ComponentType
  path: string // ROUTE_PATHS value
}

// ─── Default profile ──────────────────────────────────────────────────────────

export const userProfile: ProfileUser = {
  name: 'Nguyễn Mỹ Linh',
  phone: '0901 234 567',
  avatarUrl:
    'https://plus.unsplash.com/premium_photo-1690407617542-2f210cf20d7e?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8cGVyc29ufGVufDB8fDB8fHww',
  tier: 'silver',
  points: 450,
  memberSince: '01/2024',
  savedNailCount: 12,
}

// ─── Edge case profile (missing phone + avatar) ───────────────────────────────

export const profileEdgeCases: ProfileUser = {
  name: 'Nguyễn Mỹ Linh',
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
    label: 'Lịch hẹn của tôi',
    icon: HiCalendar,
    path: ROUTE_PATHS.myAppointments,
  },
  {
    id: 'loyalty',
    label: 'Điểm thưởng & Hạng thành viên',
    icon: IoDiamondOutline,
    path: ROUTE_PATHS.loyalty,
  },
  {
    id: 'saved-nails',
    label: 'Mẫu nail đã lưu',
    icon: HiHeart,
    path: ROUTE_PATHS.gallery,
  },
  {
    id: 'vouchers',
    label: 'Ưu đãi & Voucher',
    icon: HiTicket,
    path: ROUTE_PATHS.promotions,
  },
]

// ─── App version ──────────────────────────────────────────────────────────────

export const appVersion = '1.0.2'
