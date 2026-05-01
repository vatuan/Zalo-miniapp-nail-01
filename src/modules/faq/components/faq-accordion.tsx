import React, { useState } from 'react'
import { Box, Text } from 'zmp-ui'

import { faqItems } from '@/mocks/faq-data'

import { AccordionItem } from './accordion-item'

export function FaqAccordion() {
  const [openId, setOpenId] = useState<string | null>(null)

  const handleToggle = (id: string) => {
    setOpenId((current) => (current === id ? null : id))
  }

  return (
    <Box className="flex flex-col gap-2">
      <Text className="text-[13px] font-semibold uppercase tracking-wide text-text-secondary">Câu hỏi thường gặp</Text>

      <Box className="flex flex-col divide-y divide-border-soft rounded-2xl border border-brand-pink-soft bg-card-surface">
        {faqItems.map((item) => (
          <AccordionItem key={item.id} item={item} isOpen={openId === item.id} onToggle={() => handleToggle(item.id)} />
        ))}
      </Box>
    </Box>
  )
}
