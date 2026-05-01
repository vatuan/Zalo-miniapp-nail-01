import React from 'react'
import { Box } from 'zmp-ui'

export function FeedbackLink() {
  const handleClick = () => {
    // Phase 3 — no-op
  }

  return (
    <Box className="flex justify-center pt-2">
      <button
        type="button"
        onClick={handleClick}
        className="border-none bg-transparent text-[13px] font-medium text-text-secondary underline underline-offset-2 active:opacity-70"
      >
        Gửi phản hồi góp ý
      </button>
    </Box>
  )
}
