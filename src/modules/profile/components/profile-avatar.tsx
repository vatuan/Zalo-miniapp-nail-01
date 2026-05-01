import React, { useState } from 'react'
import { Box, Text } from 'zmp-ui'

type ProfileAvatarProps = {
  name: string
  avatarUrl: string | null
  size?: number
}

export function ProfileAvatar({ name, avatarUrl, size = 64 }: ProfileAvatarProps) {
  const [hasError, setHasError] = useState(false)
  const initial = name.trim().slice(0, 1).toUpperCase() || 'U'
  const showFallback = !avatarUrl || hasError

  if (showFallback) {
    return (
      <Box
        className="flex shrink-0 items-center justify-center rounded-full bg-brand-pink text-text-inverse"
        style={{ width: size, height: size }}
      >
        <Text className="text-xl font-bold text-text-inverse">{initial}</Text>
      </Box>
    )
  }

  return (
    <img
      src={avatarUrl}
      alt={name}
      onError={() => setHasError(true)}
      className="shrink-0 rounded-full object-cover"
      style={{ width: size, height: size }}
    />
  )
}
