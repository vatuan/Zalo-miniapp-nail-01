import React from 'react'
import { HiOutlineInformationCircle } from 'react-icons/hi2'
import { Box, Text } from 'zmp-ui'

type BeforeYouComeProps = {
  notes: string[]
}

export function BeforeYouCome({ notes }: BeforeYouComeProps) {
  if (notes.length === 0) return null

  return (
    <Box className="flex flex-col gap-2 rounded-xl bg-brand-pink-ultra-soft p-3">
      <Box className="flex items-center gap-1.5">
        <HiOutlineInformationCircle size={16} className="text-brand-dark" />
        <Text className="text-[11px] font-semibold uppercase tracking-widest text-brand-dark">Trước khi đến</Text>
      </Box>
      <Box className="flex flex-col gap-1">
        {notes.map((note, index) => (
          <Text key={index} className="text-sm text-text-primary">
            • {note}
          </Text>
        ))}
      </Box>
    </Box>
  )
}
