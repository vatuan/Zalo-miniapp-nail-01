import React, { ReactNode } from 'react'

type MasonryGridProps = {
  children: ReactNode
}

export function MasonryGrid({ children }: MasonryGridProps) {
  return <div className="columns-2 gap-3">{children}</div>
}
