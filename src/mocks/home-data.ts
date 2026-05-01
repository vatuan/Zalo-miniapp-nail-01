export type UserProfile = {
  name: string
  isLoggedIn: boolean
  membership: string
  points: number
}

export type AppointmentStatus = 'confirmed' | 'cancelled_by_salon' | 'today'

export type UpcomingAppointment = {
  id: string
  services: string[]
  date: string
  time: string
  branch: string
  status: AppointmentStatus
  totalOtherAppointments: number
} | null

export type PromotionBanner = {
  id: string | number
  title: string
  imageUrl: string
  link: string
  bannerUrl: string
}

export type FeaturedService = {
  id: number
  label: string
}

export type FlashSaleItem = {
  id: number
  name: string
  originalPrice: string
  salePrice: string
  discount: string
  slotsLeft: number
}

export type GalleryItem = {
  id: number
  imageUrl: string
  alt: string
}

export type ReviewItem = {
  id: number
  author: string
  rating: number
  service: string
  comment: string
  date: string
}

export const mockUser: UserProfile = {
  name: 'Nguyễn Mỹ Linh',
  isLoggedIn: true,
  membership: 'Silver',
  points: 450,
}

export const mockUpcomingAppointment: UpcomingAppointment = {
  id: 'LH240501',
  services: ['Gel Nail', 'Pedicure'],
  date: 'Thứ 6, 15/05/2025',
  time: '14:00',
  branch: 'Chi nhánh Quận 3',
  status: 'confirmed',
  totalOtherAppointments: 2,
}

export const mockBanners: PromotionBanner[] = [
  {
    title: 'Giảm 30% Sơn Gel T2-T4',
    imageUrl: 'https://placehold.co/375x160/f9a8d4/ffffff?text=Giảm+30%25+Sơn+Gel',
    link: '/promotions/1',
    id: 'promo-gel-30',
    bannerUrl: 'https://picsum.photos/seed/promo-gel-30/430/200',
  },
  {
    id: 'promo-birthday',
    title: 'Combo Sinh Nhật Đặc Biệt',
    imageUrl: 'https://placehold.co/375x160/c084fc/ffffff?text=Combo+Sinh+Nhật',
    link: '/promotions/2',
    bannerUrl: 'https://picsum.photos/seed/promo-birthday/430/200',
  },
  {
    id: 'promo-weekend',
    title: 'Pedicure Thư Giãn Cuối Tuần',
    imageUrl: 'https://picsum.photos/seed/promo-pedi-weekend/430/200',
    link: '/promotions/3',
    bannerUrl: 'https://picsum.photos/430/200',
  },
]

export const mockServices: FeaturedService[] = [
  { id: 1, label: 'Gel Nail' },
  { id: 2, label: 'Pedicure' },
  { id: 3, label: 'Nail Art' },
  { id: 4, label: 'Combo' },
  { id: 5, label: 'Dưỡng móng' },
]

export const mockFlashSales: FlashSaleItem[] = [
  { id: 1, name: 'Sơn Gel', originalPrice: '180.000đ', salePrice: '126.000đ', discount: '30%', slotsLeft: 3 },
  { id: 2, name: 'Pedicure Cơ Bản', originalPrice: '150.000đ', salePrice: '90.000đ', discount: '40%', slotsLeft: 0 },
]

export const mockGallery: GalleryItem[] = [
  {
    id: 1,
    imageUrl: 'https://picsum.photos/id/17/200',
    alt: 'Mẫu nail 1',
  },
  {
    id: 2,
    imageUrl: 'https://picsum.photos/id/10/200',
    alt: 'Mẫu nail 2',
  },
  {
    id: 3,
    imageUrl: 'https://picsum.photos/id/23/200',
    alt: 'Mẫu nail 3',
  },
]

export const mockReviews: ReviewItem[] = [
  {
    id: 1,
    author: 'Nguyễn T.L.',
    rating: 5,
    service: 'Gel Nail',
    comment: 'Chị Mai làm rất tỉ mỉ, đúng mẫu mình yêu cầu. Sẽ quay lại!',
    date: '15/05/2025',
  },
  {
    id: 2,
    author: 'Trần M.H.',
    rating: 5,
    service: 'Pedicure',
    comment: 'Salon sạch sẽ, nhân viên thân thiện. Rất hài lòng!',
    date: '12/05/2025',
  },
]
