import { ServiceCategory } from './service-data'

export type VoucherDiscount =
  | { type: 'fixed'; amount: number }
  | { type: 'percent'; percent: number; maxAmount?: number }

export interface Voucher {
  code: string
  label: string
  discount: VoucherDiscount
  applicableCategories?: ServiceCategory[]
  expired?: boolean
}

export const mockVouchers: Voucher[] = [
  {
    code: 'WELCOME10',
    label: 'Giảm 10% cho khách mới',
    discount: { type: 'percent', percent: 10, maxAmount: 30000 },
  },
  {
    code: 'SALE50K',
    label: 'Giảm 50.000đ',
    discount: { type: 'fixed', amount: 50000 },
  },
  {
    code: 'NAILART20',
    label: 'Giảm 20% cho dịch vụ Nail Art',
    discount: { type: 'percent', percent: 20, maxAmount: 60000 },
    applicableCategories: ['nail_art'],
  },
  {
    code: 'EXPIRED2024',
    label: 'Voucher đã hết hạn',
    discount: { type: 'fixed', amount: 30000 },
    expired: true,
  },
]

export const POINTS_PER_VND = 100
export const USER_AVAILABLE_POINTS = 50

export function getPointsDiscountAmount(points: number): number {
  return points * POINTS_PER_VND
}
