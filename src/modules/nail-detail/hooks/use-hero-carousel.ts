import { useCallback, useRef, useState } from 'react'

export function useHeroCarousel(count: number) {
  const containerRef = useRef<HTMLDivElement>(null)
  const [activeIndex, setActiveIndex] = useState(0)

  const handleScroll = useCallback(() => {
    const el = containerRef.current
    if (!el || el.offsetWidth === 0) return
    const index = Math.round(el.scrollLeft / el.offsetWidth)
    setActiveIndex(Math.min(Math.max(index, 0), count - 1))
  }, [count])

  return { containerRef, activeIndex, handleScroll }
}
