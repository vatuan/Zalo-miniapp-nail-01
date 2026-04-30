import {
  HiOutlineCube,
  HiOutlineHandRaised,
  HiOutlinePaintBrush,
  HiOutlineSparkles,
  HiOutlineSwatch,
} from 'react-icons/hi2'

import { ServiceCategory } from '@/mocks/service-data'

export const CATEGORY_ICON: Record<ServiceCategory, React.ComponentType<{ size?: number; className?: string }>> = {
  nail: HiOutlineSparkles,
  pedicure: HiOutlineHandRaised,
  nail_art: HiOutlinePaintBrush,
  combo: HiOutlineCube,
  duong_da: HiOutlineSwatch,
}
