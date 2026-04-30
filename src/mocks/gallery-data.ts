export type NailColor =
  | 'red'
  | 'pink'
  | 'white'
  | 'nude'
  | 'black'
  | 'purple'
  | 'blue'
  | 'yellow'
  | 'orange'
  | 'green'
  | 'silver'
  | 'pastel-pink'
  | 'brown'

export type NailStyle = 'minimal' | 'glam' | 'pattern' | 'ombre' | 'french' | 'grunge'

export type NailOccasion = 'casual' | 'office' | 'wedding' | 'tet' | 'halloween' | 'birthday'

export type NailTechnique = 'gel' | 'acrylic' | 'nail-art' | 'rhinestone' | 'hand-paint'

export interface NailSample {
  id: string
  imageUrl: string
  colors: NailColor[]
  style: NailStyle
  occasion: NailOccasion
  technique: NailTechnique
  isTrending: boolean
  isSaved: boolean
}

export const NAIL_COLOR_LABEL: Record<NailColor, string> = {
  red: 'Đỏ',
  pink: 'Hồng',
  white: 'Trắng',
  nude: 'Nude',
  black: 'Đen',
  purple: 'Tím',
  blue: 'Xanh',
  yellow: 'Vàng',
  orange: 'Cam',
  green: 'Xanh lá',
  silver: 'Bạc',
  'pastel-pink': 'Hồng pastel',
  brown: 'Nâu',
}

export const NAIL_COLOR_HEX: Record<NailColor, string> = {
  red: '#C8102E',
  pink: '#F075AE',
  white: '#FFFFFF',
  nude: '#D8B7A0',
  black: '#1A1A1A',
  purple: '#7E6B8F',
  blue: '#3B82F6',
  yellow: '#FACC15',
  orange: '#F97316',
  green: '#9BC264',
  silver: '#C0C0C0',
  'pastel-pink': '#F9C5D1',
  brown: '#8B5E3C',
}

export const NAIL_STYLE_LABEL: Record<NailStyle, string> = {
  minimal: 'Tối giản',
  glam: 'Glam',
  pattern: 'Hoa văn',
  ombre: 'Ombre',
  french: 'French',
  grunge: 'Grunge',
}

export const NAIL_OCCASION_LABEL: Record<NailOccasion, string> = {
  casual: 'Đi chơi',
  office: 'Công sở',
  wedding: 'Cưới',
  tet: 'Tết',
  halloween: 'Halloween',
  birthday: 'Sinh nhật',
}

export const NAIL_TECHNIQUE_LABEL: Record<NailTechnique, string> = {
  gel: 'Gel',
  acrylic: 'Acrylic',
  'nail-art': 'Nail art',
  rhinestone: 'Đính đá',
  'hand-paint': 'Vẽ tay',
}

function buildImageUrl(id: string, height: number): string {
  return `https://picsum.photos/seed/${id}/400/${height}`
}

export const mockNailSamples: NailSample[] = [
  {
    id: 'nail-001',
    imageUrl: buildImageUrl('nail-001', 540),
    colors: ['red'],
    style: 'glam',
    occasion: 'tet',
    technique: 'gel',
    isTrending: false,
    isSaved: false,
  },
  {
    id: 'nail-002',
    imageUrl: buildImageUrl('nail-002', 600),
    colors: ['pink', 'pastel-pink'],
    style: 'minimal',
    occasion: 'casual',
    technique: 'gel',
    isTrending: false,
    isSaved: false,
  },
  {
    id: 'nail-003',
    imageUrl: buildImageUrl('nail-003', 480),
    colors: ['white', 'nude'],
    style: 'french',
    occasion: 'wedding',
    technique: 'gel',
    isTrending: true,
    isSaved: false,
  },
  {
    id: 'nail-004',
    imageUrl: buildImageUrl('nail-004', 660),
    colors: ['black'],
    style: 'grunge',
    occasion: 'halloween',
    technique: 'acrylic',
    isTrending: false,
    isSaved: false,
  },
  {
    id: 'nail-005',
    imageUrl: buildImageUrl('nail-005', 510),
    colors: ['purple', 'silver'],
    style: 'glam',
    occasion: 'birthday',
    technique: 'rhinestone',
    isTrending: false,
    isSaved: false,
  },
  {
    id: 'nail-006',
    imageUrl: buildImageUrl('nail-006', 720),
    colors: ['blue'],
    style: 'ombre',
    occasion: 'casual',
    technique: 'gel',
    isTrending: false,
    isSaved: false,
  },
  {
    id: 'nail-007',
    imageUrl: buildImageUrl('nail-007', 570),
    colors: ['pink', 'white'],
    style: 'minimal',
    occasion: 'office',
    technique: 'gel',
    isTrending: true,
    isSaved: false,
  },
  {
    id: 'nail-008',
    imageUrl: buildImageUrl('nail-008', 480),
    colors: ['red', 'yellow'],
    style: 'pattern',
    occasion: 'tet',
    technique: 'hand-paint',
    isTrending: false,
    isSaved: false,
  },
  {
    id: 'nail-009',
    imageUrl: buildImageUrl('nail-009', 630),
    colors: ['nude'],
    style: 'minimal',
    occasion: 'office',
    technique: 'gel',
    isTrending: false,
    isSaved: false,
  },
  {
    id: 'nail-010',
    imageUrl: buildImageUrl('nail-010', 600),
    colors: ['yellow', 'orange'],
    style: 'ombre',
    occasion: 'birthday',
    technique: 'nail-art',
    isTrending: false,
    isSaved: false,
  },
  {
    id: 'nail-011',
    imageUrl: buildImageUrl('nail-011', 540),
    colors: ['green'],
    style: 'pattern',
    occasion: 'casual',
    technique: 'hand-paint',
    isTrending: false,
    isSaved: false,
  },
  {
    id: 'nail-012',
    imageUrl: buildImageUrl('nail-012', 690),
    colors: ['white', 'silver'],
    style: 'glam',
    occasion: 'wedding',
    technique: 'rhinestone',
    isTrending: true,
    isSaved: false,
  },
  {
    id: 'nail-013',
    imageUrl: buildImageUrl('nail-013', 480),
    colors: ['black', 'red'],
    style: 'grunge',
    occasion: 'halloween',
    technique: 'nail-art',
    isTrending: false,
    isSaved: false,
  },
  {
    id: 'nail-014',
    imageUrl: buildImageUrl('nail-014', 510),
    colors: ['pastel-pink'],
    style: 'french',
    occasion: 'office',
    technique: 'gel',
    isTrending: false,
    isSaved: false,
  },
  {
    id: 'nail-015',
    imageUrl: buildImageUrl('nail-015', 720),
    colors: ['blue', 'white'],
    style: 'ombre',
    occasion: 'casual',
    technique: 'gel',
    isTrending: false,
    isSaved: false,
  },
  {
    id: 'nail-016',
    imageUrl: buildImageUrl('nail-016', 570),
    colors: ['purple'],
    style: 'minimal',
    occasion: 'birthday',
    technique: 'acrylic',
    isTrending: false,
    isSaved: false,
  },
  {
    id: 'nail-017',
    imageUrl: buildImageUrl('nail-017', 600),
    colors: ['red'],
    style: 'glam',
    occasion: 'wedding',
    technique: 'rhinestone',
    isTrending: false,
    isSaved: false,
  },
  {
    id: 'nail-018',
    imageUrl: buildImageUrl('nail-018', 660),
    colors: ['brown', 'nude'],
    style: 'minimal',
    occasion: 'office',
    technique: 'gel',
    isTrending: true,
    isSaved: false,
  },
  {
    id: 'nail-019',
    imageUrl: buildImageUrl('nail-019', 480),
    colors: ['pink', 'purple'],
    style: 'ombre',
    occasion: 'birthday',
    technique: 'gel',
    isTrending: false,
    isSaved: false,
  },
  {
    id: 'nail-020',
    imageUrl: buildImageUrl('nail-020', 540),
    colors: ['black', 'silver'],
    style: 'glam',
    occasion: 'halloween',
    technique: 'rhinestone',
    isTrending: false,
    isSaved: false,
  },
  {
    id: 'nail-021',
    imageUrl: buildImageUrl('nail-021', 630),
    colors: ['white'],
    style: 'french',
    occasion: 'wedding',
    technique: 'gel',
    isTrending: false,
    isSaved: false,
  },
  {
    id: 'nail-022',
    imageUrl: buildImageUrl('nail-022', 600),
    colors: ['orange', 'yellow'],
    style: 'pattern',
    occasion: 'casual',
    technique: 'hand-paint',
    isTrending: false,
    isSaved: false,
  },
  {
    id: 'nail-023',
    imageUrl: buildImageUrl('nail-023', 510),
    colors: ['green', 'white'],
    style: 'minimal',
    occasion: 'tet',
    technique: 'gel',
    isTrending: false,
    isSaved: false,
  },
  {
    id: 'nail-024',
    imageUrl: buildImageUrl('nail-024', 720),
    colors: ['red', 'yellow'],
    style: 'glam',
    occasion: 'tet',
    technique: 'rhinestone',
    isTrending: true,
    isSaved: false,
  },
  {
    id: 'nail-025',
    imageUrl: buildImageUrl('nail-025', 480),
    colors: ['nude', 'pink'],
    style: 'french',
    occasion: 'office',
    technique: 'gel',
    isTrending: false,
    isSaved: false,
  },
  {
    id: 'nail-026',
    imageUrl: buildImageUrl('nail-026', 690),
    colors: ['blue', 'silver'],
    style: 'glam',
    occasion: 'birthday',
    technique: 'nail-art',
    isTrending: false,
    isSaved: false,
  },
  {
    id: 'nail-027',
    imageUrl: buildImageUrl('nail-027', 540),
    colors: ['pastel-pink', 'white'],
    style: 'minimal',
    occasion: 'casual',
    technique: 'gel',
    isTrending: false,
    isSaved: false,
  },
  {
    id: 'nail-028',
    imageUrl: buildImageUrl('nail-028', 570),
    colors: ['purple', 'pink'],
    style: 'ombre',
    occasion: 'birthday',
    technique: 'nail-art',
    isTrending: false,
    isSaved: false,
  },
  {
    id: 'nail-029',
    imageUrl: buildImageUrl('nail-029', 600),
    colors: ['black'],
    style: 'minimal',
    occasion: 'office',
    technique: 'acrylic',
    isTrending: false,
    isSaved: false,
  },
  {
    id: 'nail-030',
    imageUrl: buildImageUrl('nail-030', 480),
    colors: ['red', 'white'],
    style: 'pattern',
    occasion: 'tet',
    technique: 'hand-paint',
    isTrending: false,
    isSaved: false,
  },
]
