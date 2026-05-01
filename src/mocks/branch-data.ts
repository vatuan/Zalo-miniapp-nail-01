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
  phone: string
  coordinates: { lat: number; lng: number }
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
    imageUrl: 'https://picsum.photos/seed/branch-q3/120/120',
    isNearby: true,
    phone: '0901 234 567',
    coordinates: { lat: 10.7826, lng: 106.6957 },
  },
  {
    id: 'branch-q1',
    name: 'Nail Spa – Quận 1',
    address: '45 Nguyễn Huệ, Phường Bến Nghé, Quận 1',
    district: 'Quận 1',
    distanceKm: 2.5,
    status: 'open',
    openingTime: '08:00',
    closingTime: '21:00',
    openingHint: null,
    rating: 4.9,
    reviewCount: 204,
    imageUrl: 'https://picsum.photos/seed/branch-q1/120/120',
    isNearby: false,
    phone: '0901 234 568',
    coordinates: { lat: 10.7745, lng: 106.7019 },
  },
  {
    id: 'branch-binhthanh',
    name: 'Nail Spa – Bình Thạnh',
    address: '210 Đinh Tiên Hoàng, Phường 3, Bình Thạnh',
    district: 'Bình Thạnh',
    distanceKm: 3.8,
    status: 'opening_soon',
    openingTime: '09:00',
    closingTime: '20:00',
    openingHint: 'Mở lúc 9:00',
    rating: 4.6,
    reviewCount: 57,
    imageUrl: 'https://picsum.photos/seed/branch-binhthanh/120/120',
    isNearby: false,
    phone: '0901 234 570',
    coordinates: { lat: 10.8035, lng: 106.708 },
  },
  {
    id: 'branch-q7',
    name: 'Nail Spa – Quận 7',
    address: '88 Nguyễn Thị Thập, Tân Phú, Quận 7',
    district: 'Quận 7',
    distanceKm: 5.1,
    status: 'closed',
    openingTime: '08:00',
    closingTime: '20:00',
    openingHint: null,
    rating: 4.7,
    reviewCount: 89,
    imageUrl: 'https://picsum.photos/seed/branch-q7/120/120',
    isNearby: false,
    phone: '0901 234 569',
    coordinates: { lat: 10.7297, lng: 106.7212 },
  },
  {
    id: 'branch-thuduc',
    name: 'Nail Spa – Thủ Đức',
    address: '15 Võ Văn Ngân, Phường Bình Thọ, Thủ Đức',
    district: 'Thủ Đức',
    distanceKm: 6.5,
    status: 'open',
    openingTime: '08:30',
    closingTime: '19:30',
    openingHint: null,
    rating: 4.5,
    reviewCount: 43,
    imageUrl: 'https://picsum.photos/seed/branch-thuduc/120/120',
    isNearby: false,
    phone: '0901 234 571',
    coordinates: { lat: 10.85, lng: 106.7717 },
  },
]

export const mockGpsAvailable = true
