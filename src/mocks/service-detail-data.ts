import { ServiceCategory } from './service-data'

export interface ServicePriceVariant {
  id: string
  label: string
  price: number
  durationMin: number
  durationMax: number
}

export interface NailColor {
  id: string
  name: string
  hex: string
  imageUrl: string | null
}

export interface ServiceReview {
  id: string
  serviceId: string
  authorName: string
  authorAvatarUrl: string | null
  rating: number
  comment: string
  createdAtIso: string
}

export interface ServiceDetail {
  id: string
  categoryId: ServiceCategory
  name: string
  description: string
  durationMin: number
  durationMax: number
  price: number
  imageUrl: string | null
  isPopular: boolean
  isAvailable: boolean
  priceVariants?: ServicePriceVariant[]
  ratingAvg: number
  ratingCount: number
  includes: string[]
  beforeYouCome: string[]
  relatedColorIds: string[]
}

export const mockNailColors: NailColor[] = [
  {
    id: 'color-nude',
    name: 'Nude trầm',
    hex: '#D8B7A0',
    imageUrl: 'https://placehold.co/120x120/d8b7a0/ffffff?text=Nude',
  },
  {
    id: 'color-do-do',
    name: 'Đỏ đô',
    hex: '#7B1E2B',
    imageUrl: 'https://placehold.co/120x120/7b1e2b/ffffff?text=Đỏ+đô',
  },
  {
    id: 'color-pink-pastel',
    name: 'Hồng pastel',
    hex: '#F9C5D1',
    imageUrl: 'https://placehold.co/120x120/f9c5d1/ffffff?text=Hồng',
  },
  {
    id: 'color-tim-khoi',
    name: 'Tím khói',
    hex: '#7E6B8F',
    imageUrl: 'https://placehold.co/120x120/7e6b8f/ffffff?text=Tím+khói',
  },
  {
    id: 'color-trang-sua',
    name: 'Trắng sữa',
    hex: '#F5EFE6',
    imageUrl: null,
  },
  {
    id: 'color-xanh-mint',
    name: 'Xanh mint',
    hex: '#A7D7C5',
    imageUrl: 'https://placehold.co/120x120/a7d7c5/ffffff?text=Mint',
  },
]

export const mockServiceReviews: ServiceReview[] = [
  {
    id: 'rv-pedi-001',
    serviceId: 'svc-pedicure-co-ban',
    authorName: 'Nguyễn Thu Hà',
    authorAvatarUrl: 'https://placehold.co/64x64/f9a8d4/ffffff?text=H',
    rating: 5,
    comment: 'Ngâm chân thư giãn lắm, kỹ thuật viên rất khéo. Sẽ quay lại!',
    createdAtIso: '2026-04-12',
  },
  {
    id: 'rv-pedi-002',
    serviceId: 'svc-pedicure-co-ban',
    authorName: 'Lê Minh Anh',
    authorAvatarUrl: null,
    rating: 4,
    comment: 'Dịch vụ tốt, chỉ tiếc là phải đợi 10 phút mới tới lượt.',
    createdAtIso: '2026-04-08',
  },
  {
    id: 'rv-pedi-003',
    serviceId: 'svc-pedicure-co-ban',
    authorName: 'Trần Bảo Ngọc',
    authorAvatarUrl: 'https://placehold.co/64x64/c084fc/ffffff?text=N',
    rating: 5,
    comment: 'Gót chân mềm hẳn sau khi chà, sơn màu đẹp đúng tông yêu cầu.',
    createdAtIso: '2026-03-30',
  },
  {
    id: 'rv-gel-001',
    serviceId: 'svc-gel',
    authorName: 'Phạm Khánh Linh',
    authorAvatarUrl: 'https://placehold.co/64x64/86efac/ffffff?text=L',
    rating: 5,
    comment: 'Gel cứng giữ được gần 4 tuần không bong. Rất đáng tiền.',
    createdAtIso: '2026-04-20',
  },
  {
    id: 'rv-gel-002',
    serviceId: 'svc-gel',
    authorName: 'Đỗ Mai Phương',
    authorAvatarUrl: 'https://placehold.co/64x64/fde68a/ffffff?text=P',
    rating: 5,
    comment: 'Topcoat bóng đẹp, móng lên màu chuẩn như mẫu. KTV tư vấn nhiệt tình.',
    createdAtIso: '2026-04-15',
  },
  {
    id: 'rv-gel-003',
    serviceId: 'svc-gel',
    authorName: 'Hoàng Yến Nhi',
    authorAvatarUrl: null,
    rating: 4,
    comment: 'Gel thường giữ 2 tuần là bắt đầu cộm nhẹ, nhưng giá hợp lý.',
    createdAtIso: '2026-04-02',
  },
]

export const mockServiceDetails: ServiceDetail[] = [
  {
    id: 'svc-pedicure-co-ban',
    categoryId: 'pedicure',
    name: 'Pedicure cơ bản',
    description:
      'Ngâm chân thảo dược ấm giúp thư giãn cơ bàn chân, kết hợp cắt tỉa móng và chà gót để làm sạch da chết. ' +
      'Kỹ thuật viên dùng dụng cụ vô trùng, đảm bảo an toàn cho da nhạy cảm. ' +
      'Bước cuối cùng là dưỡng ẩm và sơn màu theo yêu cầu để hoàn thiện vẻ ngoài. ' +
      'Dịch vụ phù hợp cho người đi giày kín nhiều, gót chân khô hoặc móng dày. ' +
      'Mỗi lượt phục vụ kéo dài khoảng 45–60 phút tùy tình trạng móng.',
    durationMin: 45,
    durationMax: 60,
    price: 150000,
    imageUrl: 'https://placehold.co/720x405/86efac/ffffff?text=Pedicure',
    isPopular: true,
    isAvailable: true,
    ratingAvg: 4.8,
    ratingCount: 214,
    includes: ['Ngâm chân thảo dược', 'Cắt tỉa móng', 'Chà gót chân', 'Dưỡng ẩm', 'Sơn màu'],
    beforeYouCome: [
      'Đến trước 5–10 phút để được phục vụ tốt nhất.',
      'Tránh ngâm chân nước nóng 24h trước buổi hẹn.',
      'Báo trước nếu bạn có vết thương hở hoặc dị ứng.',
    ],
    relatedColorIds: ['color-nude', 'color-do-do', 'color-pink-pastel'],
  },
  {
    id: 'svc-gel',
    categoryId: 'nail',
    name: 'Sơn gel',
    description:
      'Sơn gel bền màu, bóng đẹp, giữ được 3–4 tuần với độ cứng tùy loại bạn chọn. ' +
      'Quy trình bao gồm tháo gel cũ an toàn, dưỡng móng, sơn 2 lớp gel và phủ topcoat bóng. ' +
      'Có ba lựa chọn: gel thường nhẹ móng, gel cứng cho móng yếu, hoặc gel builder để tạo dáng. ' +
      'Phù hợp cho người muốn móng sạch sẽ, lên màu chuẩn cho công việc văn phòng hay sự kiện. ' +
      'Vui lòng chọn loại gel phù hợp ở bảng giá bên dưới.',
    durationMin: 45,
    durationMax: 90,
    price: 0,
    imageUrl: null,
    isPopular: true,
    isAvailable: true,
    priceVariants: [
      { id: 'gel-thuong', label: 'Gel thường', price: 180000, durationMin: 45, durationMax: 60 },
      { id: 'gel-cung', label: 'Gel cứng', price: 250000, durationMin: 60, durationMax: 75 },
      { id: 'gel-builder', label: 'Gel builder', price: 350000, durationMin: 75, durationMax: 90 },
    ],
    ratingAvg: 4.9,
    ratingCount: 328,
    includes: ['Tháo gel cũ', 'Dưỡng móng', 'Sơn 2 lớp gel', 'Topcoat bóng'],
    beforeYouCome: [
      'Tháo gel cũ ít nhất 24h trước nếu làm tại nơi khác.',
      'Mang theo mẫu màu hoặc họa tiết yêu thích (nếu có).',
      'Báo trước nếu móng bị nứt, gãy để KTV xử lý kỹ.',
    ],
    relatedColorIds: ['color-do-do', 'color-pink-pastel', 'color-nude', 'color-tim-khoi'],
  },
]

export function getServiceDetailById(id: string): ServiceDetail | undefined {
  return mockServiceDetails.find((s) => s.id === id)
}

export function getServiceReviewsForService(serviceId: string): ServiceReview[] {
  return mockServiceReviews.filter((r) => r.serviceId === serviceId)
}

export function getNailColorsByIds(ids: string[]): NailColor[] {
  return ids.map((id) => mockNailColors.find((c) => c.id === id)).filter((c): c is NailColor => Boolean(c))
}
