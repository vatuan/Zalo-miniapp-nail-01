import React from 'react'
import { HiCheckCircle, HiOutlineBellAlert } from 'react-icons/hi2'
import { Box, Text } from 'zmp-ui'

import { SectionCard } from './section-card'

const REMINDERS: string[] = ['Trước 24 giờ', 'Trước 1 giờ']

export function RemindersSection() {
  return (
    <SectionCard icon={<HiOutlineBellAlert size={18} />} title="Nhắc nhở tự động">
      <Box className="flex flex-col gap-1">
        {REMINDERS.map((reminder) => (
          <Box key={reminder} className="flex items-center gap-2">
            <HiCheckCircle size={14} className="text-status-success" />
            <Text className="text-sm text-text-primary">{reminder}</Text>
          </Box>
        ))}
      </Box>
    </SectionCard>
  )
}
