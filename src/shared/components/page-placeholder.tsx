import React from 'react'
import { Text } from 'zmp-ui'

type PagePlaceholderProps = {
  text: string
}

export function PagePlaceholder({ text }: PagePlaceholderProps) {
  return (
    <div className="rounded-xl border border-[#e9eaec] bg-white p-4">
      <Text size="large" className="font-semibold">
        {text}
      </Text>
    </div>
  )
}
