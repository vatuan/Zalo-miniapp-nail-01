export type Availability = 'available' | 'full' | 'limited'

export interface TechnicianReview {
  rating: number
  comment: string
  author: string
}

export interface Technician {
  id: string
  name: string
  avatar: string
  rating: number
  reviewCount: number
  availability: Availability
  isFavorite: boolean
  experienceYears: number
  specialties: string[]
  portfolio: string[]
  reviews: TechnicianReview[]
}

export const mockTechnicians: Technician[] = [
  {
    id: 'tech-mai',
    name: 'Nguyễn Thị Mai',
    avatar: 'https://placehold.co/96x96/f075ae/ffffff?text=Mai',
    rating: 4.9,
    reviewCount: 89,
    availability: 'available',
    isFavorite: true,
    experienceYears: 5,
    specialties: ['Nail Art', 'French', 'Ombre'],
    portfolio: [
      'https://placehold.co/200x200/fdefef/f075ae?text=Nail+1',
      'https://placehold.co/200x200/f9a8d4/ffffff?text=Nail+2',
      'https://placehold.co/200x200/f075ae/ffffff?text=Nail+3',
      'https://placehold.co/200x200/fdefef/f075ae?text=Nail+4',
      'https://placehold.co/200x200/f9a8d4/ffffff?text=Nail+5',
      'https://placehold.co/200x200/f075ae/ffffff?text=Nail+6',
      'https://placehold.co/200x200/fdefef/f075ae?text=Nail+7',
      'https://placehold.co/200x200/f9a8d4/ffffff?text=Nail+8',
    ],
    reviews: [
      { rating: 5, comment: 'Tỉ mỉ, đúng mẫu', author: 'Khách hàng A' },
      { rating: 5, comment: 'Rất hài lòng', author: 'Khách hàng B' },
      { rating: 5, comment: 'KTV thân thiện, làm đẹp', author: 'Khách hàng C' },
    ],
  },
  {
    id: 'tech-khoa',
    name: 'Trần Minh Khoa',
    avatar: 'https://placehold.co/96x96/fdefef/f075ae?text=Khoa',
    rating: 4.7,
    reviewCount: 64,
    availability: 'full',
    isFavorite: false,
    experienceYears: 4,
    specialties: ['Gel', 'Nail Art', 'Đắp bột'],
    portfolio: [
      'https://placehold.co/200x200/fdefef/f075ae?text=K1',
      'https://placehold.co/200x200/f9a8d4/ffffff?text=K2',
      'https://placehold.co/200x200/f075ae/ffffff?text=K3',
      'https://placehold.co/200x200/fdefef/f075ae?text=K4',
    ],
    reviews: [
      { rating: 5, comment: 'Làm rất khéo tay', author: 'Khách hàng D' },
      { rating: 4, comment: 'Đẹp, sẽ quay lại', author: 'Khách hàng E' },
    ],
  },
  {
    id: 'tech-lan',
    name: 'Phạm Ngọc Lan',
    avatar: 'https://placehold.co/96x96/f9a8d4/ffffff?text=Lan',
    rating: 4.8,
    reviewCount: 51,
    availability: 'limited',
    isFavorite: false,
    experienceYears: 3,
    specialties: ['French', 'Ombre', 'Nail Spa'],
    portfolio: [
      'https://placehold.co/200x200/fdefef/f075ae?text=L1',
      'https://placehold.co/200x200/f9a8d4/ffffff?text=L2',
      'https://placehold.co/200x200/f075ae/ffffff?text=L3',
      'https://placehold.co/200x200/fdefef/f075ae?text=L4',
      'https://placehold.co/200x200/f9a8d4/ffffff?text=L5',
    ],
    reviews: [
      { rating: 5, comment: 'Nhẹ nhàng, sạch sẽ', author: 'Khách hàng F' },
      { rating: 5, comment: 'Mẫu đẹp y hình', author: 'Khách hàng G' },
    ],
  },
  {
    id: 'tech-trang',
    name: 'Lê Thu Trang',
    avatar: 'https://placehold.co/96x96/fdefef/f075ae?text=Trang',
    rating: 4.6,
    reviewCount: 38,
    availability: 'available',
    isFavorite: false,
    experienceYears: 2,
    specialties: ['Nail Art', 'Vẽ tay', 'Đính đá'],
    portfolio: [
      'https://placehold.co/200x200/fdefef/f075ae?text=T1',
      'https://placehold.co/200x200/f9a8d4/ffffff?text=T2',
      'https://placehold.co/200x200/f075ae/ffffff?text=T3',
    ],
    reviews: [
      { rating: 5, comment: 'Sáng tạo, nhiều mẫu mới', author: 'Khách hàng H' },
      { rating: 4, comment: 'Đẹp, giá hợp lý', author: 'Khách hàng I' },
    ],
  },
]
