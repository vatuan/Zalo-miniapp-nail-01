export type ServiceCategory = 'nail' | 'pedicure' | 'nail_art' | 'combo' | 'duong_da'

export interface Service {
  id: string
  categoryId: ServiceCategory
  name: string
  description: string
  durationMin: number
  durationMax: number
  price: number
  imageUrl: string
  isPopular: boolean
  isAvailable: boolean
}

export interface Combo {
  id: string
  name: string
  description: string
  serviceIds: string[]
  totalDurationMin: number
  originalPrice: number
  comboPrice: number
  imageUrl: string
}

/**
 * iconKey is mapped to a react-icons component in the UI layer
 * (see AI_RULES rule 13). Mocks must not embed emoji.
 */
export interface ServiceCategoryMeta {
  id: ServiceCategory
  label: string
  iconKey: ServiceCategory
}

export const SERVICE_NOTES: string[] = [
  'Vui lòng thông báo trước nếu bạn có dị ứng với hóa chất.',
  'Nên tháo gel cũ ít nhất 24h trước khi làm dịch vụ mới.',
  'Đến sớm 5–10 phút trước giờ hẹn để được phục vụ tốt nhất.',
]

export const SALON_HOURS = {
  openHour: 8,
  closeHour: 20,
  slotIntervalMin: 30,
} as const

export type DayPart = 'morning' | 'afternoon' | 'evening'

export const DAY_PART_LABEL: Record<DayPart, string> = {
  morning: 'Buổi sáng',
  afternoon: 'Buổi chiều',
  evening: 'Buổi tối',
}

export const SALON_HOLIDAYS: { dateIso: string; label: string }[] = [
  { dateIso: '2026-05-01', label: 'Nghỉ lễ Quốc tế Lao động' },
  { dateIso: '2026-09-02', label: 'Nghỉ lễ Quốc khánh' },
]

const BOOKED_SLOTS_BY_WEEKDAY: Record<number, string[]> = {
  0: ['10:00', '14:00', '18:00'],
  1: ['09:00', '11:00', '15:00'],
  2: ['08:30', '13:30', '16:00'],
  3: ['10:30', '14:30', '17:30'],
  4: ['09:30', '13:00', '14:00', '17:00'],
  5: ['08:00', '11:30', '14:00', '15:30', '18:00'],
  6: ['09:00', '10:00', '13:00', '16:00', '19:00'],
}

export function getMockBookedSlots(dateIso: string): string[] {
  const date = new Date(`${dateIso}T00:00:00`)
  if (Number.isNaN(date.getTime())) return []
  return BOOKED_SLOTS_BY_WEEKDAY[date.getDay()] ?? []
}

export function isHoliday(dateIso: string): boolean {
  return SALON_HOLIDAYS.some((h) => h.dateIso === dateIso)
}

export function getHolidayLabel(dateIso: string): string | null {
  return SALON_HOLIDAYS.find((h) => h.dateIso === dateIso)?.label ?? null
}

export const mockCategories: ServiceCategoryMeta[] = [
  { id: 'nail', label: 'Nail', iconKey: 'nail' },
  { id: 'pedicure', label: 'Pedicure', iconKey: 'pedicure' },
  { id: 'nail_art', label: 'Nail Art', iconKey: 'nail_art' },
  { id: 'combo', label: 'Combo', iconKey: 'combo' },
  { id: 'duong_da', label: 'Dưỡng da', iconKey: 'duong_da' },
]

export const mockServices: Service[] = [
  // NAIL
  {
    id: 'svc-gel',
    categoryId: 'nail',
    name: 'Sơn gel',
    description: 'Sơn gel bền màu, bóng đẹp, giữ được 3–4 tuần. Bao gồm 2 lớp gel và topcoat.',
    durationMin: 45,
    durationMax: 60,
    price: 180000,
    imageUrl: 'https://placehold.co/64x64/f9a8d4/ffffff?text=Gel',
    isPopular: true,
    isAvailable: true,
  },
  {
    id: 'svc-thao-gel',
    categoryId: 'nail',
    name: 'Tháo gel + Sơn mới',
    description: 'Tháo gel cũ an toàn và sơn màu gel mới theo yêu cầu.',
    durationMin: 60,
    durationMax: 75,
    price: 250000,
    imageUrl: 'https://placehold.co/64x64/f9a8d4/ffffff?text=Tháo',
    isPopular: false,
    isAvailable: true,
  },
  {
    id: 'svc-son-thuong',
    categoryId: 'nail',
    name: 'Sơn thường',
    description: 'Sơn màu thông thường, đa dạng màu sắc, phù hợp dùng hàng ngày.',
    durationMin: 30,
    durationMax: 45,
    price: 80000,
    imageUrl: 'https://placehold.co/64x64/f9a8d4/ffffff?text=Sơn',
    isPopular: false,
    isAvailable: true,
  },
  {
    id: 'svc-dap-bot',
    categoryId: 'nail',
    name: 'Đắp bột acrylic',
    description: 'Đắp bột tạo móng giả chắc chắn, định hình theo ý muốn.',
    durationMin: 90,
    durationMax: 120,
    price: 350000,
    imageUrl: 'https://placehold.co/64x64/f9a8d4/ffffff?text=Bột',
    isPopular: false,
    isAvailable: false,
  },
  // PEDICURE
  {
    id: 'svc-pedicure-co-ban',
    categoryId: 'pedicure',
    name: 'Pedicure cơ bản',
    description: 'Ngâm chân thảo dược, cắt tỉa móng, chà gót, sơn màu.',
    durationMin: 45,
    durationMax: 60,
    price: 150000,
    imageUrl: 'https://placehold.co/64x64/86efac/ffffff?text=Pedi',
    isPopular: true,
    isAvailable: true,
  },
  {
    id: 'svc-pedicure-deluxe',
    categoryId: 'pedicure',
    name: 'Pedicure deluxe',
    description: 'Pedicure cơ bản + massage chân 15 phút + đắp mặt nạ chân.',
    durationMin: 75,
    durationMax: 90,
    price: 280000,
    imageUrl: 'https://placehold.co/64x64/86efac/ffffff?text=Deluxe',
    isPopular: false,
    isAvailable: true,
  },
  // NAIL ART
  {
    id: 'svc-nail-art-ve-tay',
    categoryId: 'nail_art',
    name: 'Vẽ tay nail art',
    description: 'Vẽ họa tiết tay theo mẫu hoặc sáng tạo theo yêu cầu.',
    durationMin: 60,
    durationMax: 90,
    price: 250000,
    imageUrl: 'https://placehold.co/64x64/c084fc/ffffff?text=Art',
    isPopular: true,
    isAvailable: true,
  },
  {
    id: 'svc-dinh-da',
    categoryId: 'nail_art',
    name: 'Đính đá rhinestone',
    description: 'Đính đá Swarovski hoặc rhinestone trang trí móng.',
    durationMin: 30,
    durationMax: 60,
    price: 120000,
    imageUrl: 'https://placehold.co/64x64/c084fc/ffffff?text=Đá',
    isPopular: false,
    isAvailable: true,
  },
  {
    id: 'svc-nail-art-cao-cap',
    categoryId: 'nail_art',
    name: 'Nail art cao cấp theo yêu cầu',
    description: 'Thiết kế móng cao cấp 1-1 cùng nghệ nhân. Báo giá theo độ phức tạp của mẫu.',
    durationMin: 90,
    durationMax: 150,
    price: 0,
    imageUrl: 'https://placehold.co/64x64/c084fc/ffffff?text=Cao+cấp',
    isPopular: false,
    isAvailable: true,
  },
  // DƯỠNG DA
  {
    id: 'svc-massage-tay',
    categoryId: 'duong_da',
    name: 'Massage tay',
    description: 'Massage thư giãn kết hợp dưỡng ẩm tay chuyên sâu.',
    durationMin: 20,
    durationMax: 30,
    price: 80000,
    imageUrl: 'https://placehold.co/64x64/fde68a/ffffff?text=Massage',
    isPopular: false,
    isAvailable: true,
  },
  {
    id: 'svc-dap-mat-na-tay',
    categoryId: 'duong_da',
    name: 'Đắp mặt nạ tay',
    description: 'Mặt nạ collagen dưỡng ẩm sâu, làm mềm và trắng da tay.',
    durationMin: 20,
    durationMax: 30,
    price: 100000,
    imageUrl: 'https://placehold.co/64x64/fde68a/ffffff?text=Nạ',
    isPopular: false,
    isAvailable: true,
  },
]

export const mockCombos: Combo[] = [
  {
    id: 'combo-co-ban',
    name: 'Combo Cơ Bản',
    description: 'Sơn gel tay + Pedicure cơ bản. Tiết kiệm thời gian và chi phí.',
    serviceIds: ['svc-gel', 'svc-pedicure-co-ban'],
    totalDurationMin: 105,
    originalPrice: 330000,
    comboPrice: 280000,
    imageUrl: 'https://placehold.co/64x64/f472b6/ffffff?text=Combo1',
  },
  {
    id: 'combo-sang-trong',
    name: 'Combo Sang Trọng',
    description: 'Sơn gel + Nail Art vẽ tay + Pedicure deluxe. Trọn gói làm đẹp.',
    serviceIds: ['svc-gel', 'svc-nail-art-ve-tay', 'svc-pedicure-deluxe'],
    totalDurationMin: 195,
    originalPrice: 680000,
    comboPrice: 550000,
    imageUrl: 'https://placehold.co/64x64/be185d/ffffff?text=Combo2',
  },
]
