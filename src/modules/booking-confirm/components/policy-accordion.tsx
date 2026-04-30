import React, { useState } from 'react'
import { HiChevronDown, HiOutlineShieldCheck } from 'react-icons/hi2'
import { Box, Text } from 'zmp-ui'

import { clsx } from '@/utils/clsx'

const POLICY_ITEMS: string[] = [
  'Hủy trước 2 giờ: Miễn phí',
  'Hủy trong vòng 2 giờ: Phí 20% giá trị đặt lịch',
  'Vắng mặt không báo trước: Phí 50% giá trị đặt lịch',
  'Đến trễ quá 15 phút: Slot có thể được dời sang khung giờ khác',
]

export function PolicyAccordion() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <Box className="flex flex-col gap-2">
      <button
        type="button"
        onClick={() => setIsOpen((prev) => !prev)}
        className="flex items-center justify-between gap-2 rounded-2xl border-none bg-card-surface px-4 py-3 ring-1 ring-brand-pink-soft active:scale-[0.99]"
      >
        <Box className="flex items-center gap-2">
          <HiOutlineShieldCheck size={18} className="text-brand-pink" />
          <Text className="text-sm font-semibold text-text-primary">Chính sách hủy lịch</Text>
        </Box>
        <HiChevronDown
          size={18}
          className={clsx('text-text-secondary transition-transform', isOpen ? 'rotate-180' : 'rotate-0')}
        />
      </button>

      {isOpen ? (
        <Box className="flex flex-col gap-1 rounded-2xl bg-brand-pink-ultra-soft px-4 py-3">
          {POLICY_ITEMS.map((item) => (
            <Box key={item} className="flex items-start gap-2">
              <Text className="text-xs text-brand-pink">•</Text>
              <Text className="text-xs text-text-primary">{item}</Text>
            </Box>
          ))}
        </Box>
      ) : null}
    </Box>
  )
}
