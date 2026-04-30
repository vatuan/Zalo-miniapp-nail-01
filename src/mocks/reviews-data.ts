export type ReviewFilterKind = 'all' | '5' | '4' | 'photo'
export type ReviewSortOrder = 'newest' | 'oldest' | 'highest' | 'lowest'

export interface StarBreakdownItem {
  star: 1 | 2 | 3 | 4 | 5
  count: number
  percentage: number
}

export interface ReviewSummary {
  serviceId: string
  overallScore: number
  totalCount: number
  starBreakdown: StarBreakdownItem[]
}

export interface Review {
  id: string
  serviceId: string
  reviewerName: string
  avatarUrl: string | null
  rating: 1 | 2 | 3 | 4 | 5
  serviceTag: string
  ktvName: string
  text: string
  photos: string[]
  dateIso: string
  isPhotoReported: boolean
}

// ─── Summaries ────────────────────────────────────────────────────────────────

export const mockReviewSummaries: ReviewSummary[] = [
  {
    serviceId: 'svc-pedicure-co-ban',
    overallScore: 4.8,
    totalCount: 328,
    // 279 + 33 + 10 + 3 + 3 = 328 | 85+10+3+1+1 = 100
    starBreakdown: [
      { star: 5, count: 279, percentage: 85 },
      { star: 4, count: 33, percentage: 10 },
      { star: 3, count: 10, percentage: 3 },
      { star: 2, count: 3, percentage: 1 },
      { star: 1, count: 3, percentage: 1 },
    ],
  },
  {
    serviceId: 'svc-gel',
    overallScore: 4.6,
    totalCount: 4,
    // totalCount < 5 → bar chart hidden in UI
    // 3 + 1 = 4 | 75+25 = 100
    starBreakdown: [
      { star: 5, count: 3, percentage: 75 },
      { star: 4, count: 1, percentage: 25 },
      { star: 3, count: 0, percentage: 0 },
      { star: 2, count: 0, percentage: 0 },
      { star: 1, count: 0, percentage: 0 },
    ],
  },
]

// ─── Reviews ──────────────────────────────────────────────────────────────────

export const mockReviews: Review[] = [
  // ── svc-pedicure-co-ban (15 reviews) ──────────────────────────────────────
  {
    id: 'rv-001',
    serviceId: 'svc-pedicure-co-ban',
    reviewerName: 'Nguyễn T.L.',
    avatarUrl: 'https://placehold.co/64x64/f9a8d4/ffffff?text=L',
    rating: 5,
    serviceTag: 'Pedicure cơ bản',
    ktvName: 'Mai',
    text: 'Dịch vụ tuyệt vời, kỹ thuật viên rất tỉ mỉ và nhẹ nhàng. Bàn chân mình mềm mịn hẳn sau khi làm. Chắc chắn sẽ quay lại!',
    photos: [],
    dateIso: '2025-03-15',
    isPhotoReported: false,
  },
  {
    id: 'rv-002',
    serviceId: 'svc-pedicure-co-ban',
    reviewerName: 'Trần M.A.',
    avatarUrl: 'https://placehold.co/64x64/a5b4fc/ffffff?text=A',
    rating: 5,
    serviceTag: 'Pedicure cơ bản',
    ktvName: 'Lan',
    text: 'Lần đầu thử pedicure ở đây mà cực kỳ ưng. Không gian thoải mái, nước ngâm chân thơm, màu sơn đẹp đúng ý.',
    photos: ['https://picsum.photos/seed/rv-002-a/200/200', 'https://picsum.photos/seed/rv-002-b/200/200'],
    dateIso: '2025-02-20',
    isPhotoReported: false,
  },
  {
    id: 'rv-003',
    serviceId: 'svc-pedicure-co-ban',
    reviewerName: 'Lê T.H.',
    avatarUrl: null,
    rating: 4,
    serviceTag: 'Pedicure cơ bản',
    ktvName: 'Hoa',
    text: 'Dịch vụ ổn, nhưng phải chờ khoảng 15 phút mới đến lượt. Kết quả móng khá đẹp, KTV Hoa rất thân thiện.',
    photos: [],
    dateIso: '2025-01-10',
    isPhotoReported: false,
  },
  {
    id: 'rv-004',
    serviceId: 'svc-pedicure-co-ban',
    reviewerName: 'Phạm Q.K.',
    avatarUrl: 'https://placehold.co/64x64/6ee7b7/3d3d3d?text=K',
    rating: 5,
    serviceTag: 'Pedicure cơ bản',
    ktvName: 'Linh',
    text: 'Mình đặt cho bạn gái, cô ấy rất hài lòng. Chỗ này sạch sẽ và chuyên nghiệp. Giá cả hợp lý so với chất lượng.',
    photos: [
      'https://picsum.photos/seed/rv-004-a/200/200',
      'https://picsum.photos/seed/rv-004-b/200/200',
      'https://picsum.photos/seed/rv-004-c/200/200',
    ],
    dateIso: '2024-12-25',
    isPhotoReported: false,
  },
  {
    id: 'rv-005',
    serviceId: 'svc-pedicure-co-ban',
    reviewerName: 'Hoàng T.N.',
    avatarUrl: 'https://placehold.co/64x64/fcd34d/3d3d3d?text=N',
    rating: 5,
    serviceTag: 'Pedicure cơ bản',
    ktvName: 'Thu',
    text: 'Nhân viên nhiệt tình, tư vấn màu sơn rất đúng tông da. Lần thứ 3 mình đến rồi, lần nào cũng vừa ý.',
    photos: [],
    dateIso: '2024-11-18',
    isPhotoReported: false,
  },
  {
    id: 'rv-006',
    serviceId: 'svc-pedicure-co-ban',
    reviewerName: 'Vũ H.G.',
    avatarUrl: null,
    rating: 3,
    serviceTag: 'Pedicure cơ bản',
    ktvName: 'Mai',
    text: 'Chất lượng tạm được nhưng hôm đó khá đông, KTV làm hơi vội. Móng bong một góc sau 4 ngày, hơi thất vọng.',
    photos: [],
    dateIso: '2024-10-05',
    isPhotoReported: false,
  },
  {
    id: 'rv-007',
    serviceId: 'svc-pedicure-co-ban',
    reviewerName: 'Đặng T.B.',
    avatarUrl: 'https://placehold.co/64x64/f9a8d4/ffffff?text=B',
    rating: 5,
    serviceTag: 'Pedicure cơ bản',
    ktvName: 'Lan',
    text: 'Làm đẹp rất kỹ, ngâm chân đúng thời gian, tỉa khoé không đau. Kết quả thật sự ưng ý!',
    photos: ['https://picsum.photos/seed/rv-007-a/200/200', 'https://picsum.photos/seed/rv-007-b/200/200'],
    dateIso: '2024-09-22',
    isPhotoReported: true, // admin-flagged: photos hidden in UI, text still shown
  },
  {
    id: 'rv-008',
    serviceId: 'svc-pedicure-co-ban',
    reviewerName: 'Bùi K.C.',
    avatarUrl: null,
    rating: 4,
    serviceTag: 'Pedicure cơ bản',
    ktvName: 'Hoa',
    text: 'Nói chung khá ok. Mình thích cách bố trí chỗ ngồi thoải mái, có để chân thư giãn đúng nghĩa.',
    photos: [],
    dateIso: '2024-08-14',
    isPhotoReported: false,
  },
  {
    id: 'rv-009',
    serviceId: 'svc-pedicure-co-ban',
    reviewerName: 'Dương T.P.',
    avatarUrl: 'https://placehold.co/64x64/c4b5fd/ffffff?text=P',
    rating: 5,
    serviceTag: 'Pedicure cơ bản',
    ktvName: 'Linh',
    text: 'Siêu thích! Móng chân đẹp bền hơn mình nghĩ. Hơn 2 tuần vẫn chưa bong. Sẽ giới thiệu cho bạn bè.',
    photos: ['https://picsum.photos/seed/rv-009-a/200/200'],
    dateIso: '2024-07-30',
    isPhotoReported: false,
  },
  {
    id: 'rv-010',
    serviceId: 'svc-pedicure-co-ban',
    reviewerName: 'Mai T.T.',
    avatarUrl: 'https://placehold.co/64x64/f9a8d4/ffffff?text=T',
    rating: 5,
    serviceTag: 'Pedicure cơ bản',
    ktvName: 'Thu',
    text: 'Nhân viên vui vẻ dễ chịu, làm nhanh mà vẫn chất lượng. Mình sẽ đặt lịch cố định hàng tháng ở đây.',
    photos: [],
    dateIso: '2024-06-12',
    isPhotoReported: false,
  },
  {
    id: 'rv-011',
    serviceId: 'svc-pedicure-co-ban',
    reviewerName: 'Ngô V.L.',
    avatarUrl: null,
    rating: 2,
    serviceTag: 'Pedicure cơ bản',
    ktvName: 'Mai',
    text: 'Dụng cụ không được vệ sinh kỹ trước mắt mình, khiến mình không thoải mái. Mong cửa hàng chú ý hơn vấn đề vệ sinh.',
    photos: [],
    dateIso: '2024-05-08',
    isPhotoReported: false,
  },
  {
    id: 'rv-012',
    serviceId: 'svc-pedicure-co-ban',
    reviewerName: 'Đinh T.X.',
    avatarUrl: 'https://placehold.co/64x64/6ee7b7/3d3d3d?text=X',
    rating: 5,
    serviceTag: 'Pedicure cơ bản',
    ktvName: 'Lan',
    text: 'Màu gel bền đẹp, đúng 3 tuần chưa bong tróc. Mình chụp lại để làm kỷ niệm haha.',
    photos: ['https://picsum.photos/seed/rv-012-a/200/200', 'https://picsum.photos/seed/rv-012-b/200/200'],
    dateIso: '2024-04-17',
    isPhotoReported: false,
  },
  {
    id: 'rv-013',
    serviceId: 'svc-pedicure-co-ban',
    reviewerName: 'Tô T.H.',
    avatarUrl: null,
    rating: 4,
    serviceTag: 'Pedicure cơ bản',
    ktvName: 'Hoa',
    text: 'Làm khá cẩn thận, mình hài lòng về kỹ thuật. Chỉ góp ý thêm là nên có thêm lựa chọn màu nude nhiều hơn.',
    photos: [],
    dateIso: '2024-03-25',
    isPhotoReported: false,
  },
  {
    id: 'rv-014',
    serviceId: 'svc-pedicure-co-ban',
    reviewerName: 'Phan T.D.',
    avatarUrl: 'https://placehold.co/64x64/fcd34d/3d3d3d?text=D',
    rating: 5,
    serviceTag: 'Pedicure cơ bản',
    ktvName: 'Thu',
    text: 'Đi cùng mẹ làm nhân dịp sinh nhật, cả hai đều rất thích. Không gian yên tĩnh, nhạc nhẹ nhàng, thư giãn hoàn toàn.',
    photos: [],
    dateIso: '2024-02-14',
    isPhotoReported: false,
  },
  {
    id: 'rv-015',
    serviceId: 'svc-pedicure-co-ban',
    reviewerName: 'Võ M.K.',
    avatarUrl: null,
    rating: 1,
    serviceTag: 'Pedicure cơ bản',
    ktvName: 'Linh',
    text: 'Đặt lịch online nhưng đến nơi không có người phục vụ, phải đợi 30 phút mới có KTV. Trải nghiệm không như kỳ vọng.',
    photos: [],
    dateIso: '2024-01-30',
    isPhotoReported: false,
  },

  // ── svc-gel (4 reviews — totalCount < 5 → bar chart hidden) ───────────────
  {
    id: 'rv-gel-001',
    serviceId: 'svc-gel',
    reviewerName: 'Lý T.K.',
    avatarUrl: 'https://placehold.co/64x64/f9a8d4/ffffff?text=K',
    rating: 5,
    serviceTag: 'Sơn gel',
    ktvName: 'Mai',
    text: 'Sơn gel bền đẹp, màu chuẩn. KTV Mai rất tỉ mỉ, từng lớp gel được kiểm tra kỹ trước khi đèn UV.',
    photos: [],
    dateIso: '2025-04-01',
    isPhotoReported: false,
  },
  {
    id: 'rv-gel-002',
    serviceId: 'svc-gel',
    reviewerName: 'Huỳnh T.Y.',
    avatarUrl: null,
    rating: 5,
    serviceTag: 'Sơn gel',
    ktvName: 'Lan',
    text: 'Gel cứng đẹp lắm, đã 3 tuần vẫn chưa bong. Màu chọn rất đúng tone với outfit.',
    photos: ['https://picsum.photos/seed/rv-gel-002/200/200'],
    dateIso: '2025-03-10',
    isPhotoReported: false,
  },
  {
    id: 'rv-gel-003',
    serviceId: 'svc-gel',
    reviewerName: 'Cao T.M.',
    avatarUrl: 'https://placehold.co/64x64/a5b4fc/ffffff?text=M',
    rating: 4,
    serviceTag: 'Sơn gel',
    ktvName: 'Hoa',
    text: 'Khá hài lòng, chỉ có một góc móng bị lồi nhẹ nhưng KTV đã fix ngay. Dịch vụ chăm sóc tốt.',
    photos: [],
    dateIso: '2025-02-05',
    isPhotoReported: false,
  },
  {
    id: 'rv-gel-004',
    serviceId: 'svc-gel',
    reviewerName: 'Trịnh H.B.',
    avatarUrl: null,
    rating: 5,
    serviceTag: 'Sơn gel',
    ktvName: 'Linh',
    text: 'Lần đầu làm gel, được tư vấn rất kỹ về cách chăm sóc sau khi sơn. Rất biết ơn vì nhờ đó móng bền hơn nhiều.',
    photos: [],
    dateIso: '2025-01-20',
    isPhotoReported: false,
  },
]

// ─── Helpers ──────────────────────────────────────────────────────────────────

export function getReviewSummaryForService(serviceId: string): ReviewSummary | undefined {
  // return mockReviewSummaries
  return mockReviewSummaries.find((s) => s.serviceId === 'svc-pedicure-co-ban')
}

export function getReviewsForService(serviceId: string): Review[] {
  // return mockReviews.filter((r) => r.serviceId === serviceId)
  return mockReviews
}
