import { NailColor, NailOccasion, NailStyle, NailTechnique } from './gallery-data'

export type NailDetailTagKind = 'color' | 'style' | 'occasion' | 'technique'

export type NailDetailTag =
  | { kind: 'color'; value: NailColor; label: string }
  | { kind: 'style'; value: NailStyle; label: string }
  | { kind: 'occasion'; value: NailOccasion; label: string }
  | { kind: 'technique'; value: NailTechnique; label: string }

export interface NailDetailService {
  id: string
  name: string
  durationMin: number
}

export interface NailRelatedPreview {
  id: string
  imageUrl: string
}

export interface NailDetail {
  id: string
  images: string[]
  name: string
  tags: NailDetailTag[]
  services: NailDetailService[]
  durationMin: number
  priceFrom: number
  relatedNails: NailRelatedPreview[]
  isSaved: boolean
}

function buildImageUrl(seed: string): string {
  return `https://picsum.photos/seed/${seed}/430/500`
}

export const mockNailDetails: NailDetail[] = [
  {
    id: 'nail-003',
    images: [buildImageUrl('nail-003-1'), buildImageUrl('nail-003-2'), buildImageUrl('nail-003-3')],
    name: 'French Pearl Cô Dâu',
    tags: [
      { kind: 'style', value: 'french', label: '#french' },
      { kind: 'occasion', value: 'wedding', label: '#cuoi' },
    ],
    services: [
      { id: 'svc-gel', name: 'Sơn gel', durationMin: 60 },
      { id: 'svc-dinh-da', name: 'Đính đá rhinestone', durationMin: 30 },
    ],
    durationMin: 90,
    priceFrom: 280000,
    relatedNails: [
      { id: 'nail-021', imageUrl: buildImageUrl('nail-021') },
      { id: 'nail-014', imageUrl: buildImageUrl('nail-014') },
      { id: 'nail-025', imageUrl: buildImageUrl('nail-025') },
    ],
    isSaved: false,
  },
  {
    id: 'nail-024',
    images: [buildImageUrl('nail-024-1')],
    name: 'Đỏ Vàng Lộc Tết',
    tags: [
      { kind: 'style', value: 'glam', label: '#glam' },
      { kind: 'occasion', value: 'tet', label: '#tet' },
      { kind: 'technique', value: 'rhinestone', label: '#dinhda' },
    ],
    services: [
      { id: 'svc-gel', name: 'Sơn gel', durationMin: 60 },
      { id: 'svc-nail-art-ve-tay', name: 'Vẽ tay nail art', durationMin: 60 },
      { id: 'svc-dinh-da', name: 'Đính đá rhinestone', durationMin: 45 },
    ],
    durationMin: 180,
    priceFrom: 550000,
    relatedNails: [],
    isSaved: false,
  },
]

export function getNailDetailById(id: string): NailDetail | undefined {
  return mockNailDetails.find((d) => d.id === id)
}

export function hasNailDetail(id: string): boolean {
  return mockNailDetails.some((d) => d.id === id)
}
