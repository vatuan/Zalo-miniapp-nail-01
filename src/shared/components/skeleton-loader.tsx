import React from 'react'
import { Box } from 'zmp-ui'

type SkeletonLoaderProps = {
  className?: string
  roundedClassName?: string
}

export function SkeletonLoader({ className = '', roundedClassName = 'rounded-lg' }: SkeletonLoaderProps) {
  return <Box className={`animate-pulse bg-gray-200 ${roundedClassName} ${className}`.trim()} role="status" />
}
