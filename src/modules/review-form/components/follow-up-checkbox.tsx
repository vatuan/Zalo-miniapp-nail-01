import React from 'react'
import { Box, Text } from 'zmp-ui'

type FollowUpCheckboxProps = {
  checked: boolean
  onChange: (checked: boolean) => void
}

export function FollowUpCheckbox({ checked, onChange }: FollowUpCheckboxProps) {
  return (
    <Box className="rounded-xl border border-border-soft bg-status-warning-soft px-3 py-3">
      <label className="flex cursor-pointer items-start gap-3">
        <input
          type="checkbox"
          checked={checked}
          onChange={(e) => onChange(e.target.checked)}
          className="mt-0.5 h-4 w-4 shrink-0 accent-brand-pink"
        />
        <Text className="text-[13px] leading-relaxed text-text-primary">
          Bạn có muốn salon liên hệ lại để xử lý không?
        </Text>
      </label>
    </Box>
  )
}
