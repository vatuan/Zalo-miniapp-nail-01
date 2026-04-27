import React from 'react'
import { Button } from 'zmp-ui'

import { useAuthStore } from '@/stores/auth-store'

type AuthToggleButtonProps = {
  className?: string
}

export function AuthToggleButton({ className }: AuthToggleButtonProps) {
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated)
  const toggle = useAuthStore((state) => state.toggle)

  return (
    <Button size="small" variant={isAuthenticated ? 'secondary' : 'primary'} onClick={toggle} className={className}>
      {isAuthenticated ? 'Logout (Mock)' : 'Login (Mock)'}
    </Button>
  )
}
