import React from 'react'
import { HiOutlineBellAlert } from 'react-icons/hi2'
import { Box, Text } from 'zmp-ui'

const REMINDER_ITEMS: string[] = [
  'Xác nhận qua Zalo OA ngay',
  'Nhắc trước 24 giờ',
  'Nhắc trước 1 giờ',
]

export function ReminderList() {
  return (
    <Box className="flex flex-col gap-2 rounded-2xl border border-brand-pink-soft bg-card-surface p-4">
      <Box className="flex items-center gap-2">
        <HiOutlineBellAlert size={16} className="text-brand-pink" />
        <Text className="text-[11px] font-semibold uppercase tracking-widest text-text-secondary">
          Bạn sẽ nhận nhắc nhở
        </Text>
      </Box>
      <Box className="flex flex-col gap-1">
        {REMINDER_ITEMS.map((item) => (
          <Box key={item} className="flex items-start gap-2">
            <Text className="text-xs text-brand-pink">•</Text>
            <Text className="text-xs text-text-primary">{item}</Text>
          </Box>
        ))}
      </Box>
    </Box>
  )
}
