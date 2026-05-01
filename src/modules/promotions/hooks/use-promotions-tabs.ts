import { useState } from 'react'

export function usePromotionsTabs() {
  const [activeTab, setActiveTab] = useState<0 | 1>(0)
  return { activeTab, setActiveTab }
}
