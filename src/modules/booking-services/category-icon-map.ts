import {
  HiOutlineCube,
  HiOutlineHandRaised,
  HiOutlinePaintBrush,
  HiOutlineSparkles,
  HiOutlineSwatch,
} from 'react-icons/hi2'

import { ServiceCategory } from '@/mocks/service-data'

/**
 * Data-driven icon mapping for service categories.
 * AI_RULES rule 13: emoji are kept out of mocks; mocks store an iconKey
 * (matching ServiceCategory) and the UI maps it to a react-icons component.
 */
export const CATEGORY_ICON: Record<ServiceCategory, React.ComponentType<{ size?: number; className?: string }>> = {
  nail: HiOutlineSparkles,
  pedicure: HiOutlineHandRaised,
  nail_art: HiOutlinePaintBrush,
  combo: HiOutlineCube,
  duong_da: HiOutlineSwatch,
}
