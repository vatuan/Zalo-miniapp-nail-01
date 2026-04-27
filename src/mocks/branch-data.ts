export type BranchStatus = 'open' | 'closed' | 'opening_soon'

export interface Branch {
  id: string
  name: string
  address: string
  district: string
  distanceKm: number | null
  status: BranchStatus
  openingTime: string
  closingTime: string
  openingHint: string | null
  rating: number
  reviewCount: number
  imageUrl: string
  isNearby: boolean
}

export const mockBranches: Branch[] = [
  {
    id: 'branch-q3',
    name: 'Nail Spa – Quận 3',
    address: '123 Lê Lợi, Phường Bến Nghé, Quận 3',
    district: 'Quận 3',
    distanceKm: 1.2,
    status: 'open',
    openingTime: '08:00',
    closingTime: '20:00',
    openingHint: null,
    rating: 4.8,
    reviewCount: 120,
    imageUrl: 'https://placehold.co/80x80/f9a8d4/ffffff?text=Q3',
    isNearby: true,
  },
  {
    id: 'branch-q1',
    name: 'Nail Spa – Quận 1',
    address: '45 Nguyễn Huệ, Phường Bến Nghé, Quận 1',
    district: 'Quận 1',
    distanceKm: 2.8,
    status: 'open',
    openingTime: '08:00',
    closingTime: '21:00',
    openingHint: null,
    rating: 4.9,
    reviewCount: 204,
    imageUrl: 'https://placehold.co/80x80/c084fc/ffffff?text=Q1',
    isNearby: false,
  },
  {
    id: 'branch-q7',
    name: 'Nail Spa – Quận 7',
    address: '88 Nguyễn Thị Thập, Tân Phú, Quận 7',
    district: 'Quận 7',
    distanceKm: 6.4,
    status: 'closed',
    openingTime: '08:00',
    closingTime: '20:00',
    openingHint: null,
    rating: 4.7,
    reviewCount: 89,
    imageUrl: 'https://placehold.co/80x80/86efac/ffffff?text=Q7',
    isNearby: false,
  },
  {
    id: 'branch-binhthanh',
    name: 'Nail Spa – Bình Thạnh',
    address: '210 Đinh Tiên Hoàng, Phường 3, Bình Thạnh',
    district: 'Bình Thạnh',
    distanceKm: 4.1,
    status: 'opening_soon',
    openingTime: '09:00',
    closingTime: '20:00',
    openingHint: 'Mở lúc 9:00',
    rating: 4.6,
    reviewCount: 57,
    imageUrl: 'https://placehold.co/80x80/fde68a/ffffff?text=BT',
    isNearby: false,
  },
  {
    id: 'branch-thuduc',
    name: 'Nail Spa – Thủ Đức',
    address: '15 Võ Văn Ngân, Phường Bình Thọ, Thủ Đức',
    district: 'Thủ Đức',
    distanceKm: 12.3,
    status: 'open',
    openingTime: '08:30',
    closingTime: '19:30',
    openingHint: null,
    rating: 4.5,
    reviewCount: 43,
    imageUrl: 'https://placehold.co/80x80/93c5fd/ffffff?text=TD',
    isNearby: false,
  },
]

export const mockGpsAvailable = true
