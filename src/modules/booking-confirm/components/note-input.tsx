import React from 'react'
import { Box, Text } from 'zmp-ui'

const MAX_NOTE_LENGTH = 300

type NoteInputProps = {
  value: string
  onChange: (value: string) => void
}

export function NoteInput({ value, onChange }: NoteInputProps) {
  const handleChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    const next = event.target.value.slice(0, MAX_NOTE_LENGTH)
    onChange(next)
  }

  return (
    <Box className="flex flex-col gap-2">
      <Text className="text-[11px] font-semibold uppercase tracking-widest text-text-secondary">
        Ghi chú cho salon
      </Text>
      <Box className="rounded-2xl border border-brand-pink-soft bg-card-surface p-3">
        <textarea
          value={value}
          onChange={handleChange}
          placeholder="Nhập ghi chú... (dị ứng, màu sơn yêu thích, v.v.)"
          rows={4}
          className="w-full resize-none border-none bg-transparent text-sm text-text-primary outline-none placeholder:text-text-secondary"
        />
        <Box className="flex justify-end">
          <Text className="text-[11px] text-text-secondary">
            {value.length}/{MAX_NOTE_LENGTH}
          </Text>
        </Box>
      </Box>
    </Box>
  )
}
