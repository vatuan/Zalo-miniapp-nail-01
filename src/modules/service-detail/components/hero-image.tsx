import React from 'react'
import { HiOutlineSparkles } from 'react-icons/hi2'
import { Box } from 'zmp-ui'

type HeroImageProps = {
  imageUrl: string | null
  alt: string
}

export function HeroImage({ imageUrl, alt }: HeroImageProps) {
  if (imageUrl) {
    return (
      <Box className="aspect-[16/9] w-full overflow-hidden bg-surface-muted">
        <img src={imageUrl} alt={alt} className="h-full w-full object-cover" />
      </Box>
    )
  }

  return (
    <Box className="relative aspect-[16/9] w-full overflow-hidden bg-gradient-to-br from-brand-pink-soft via-brand-cream to-brand-gold">
      <Box className="absolute inset-0 flex items-center justify-center">
        <Box className="flex h-16 w-16 items-center justify-center rounded-full bg-surface-primary/60 text-brand-dark">
          <HiOutlineSparkles size={32} />
        </Box>
      </Box>
    </Box>
  )
}
