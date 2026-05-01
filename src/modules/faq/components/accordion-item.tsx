import React from 'react'
import { HiChevronDown } from 'react-icons/hi2'
import { Box, Text } from 'zmp-ui'

import { FaqItem } from '@/mocks/faq-data'
import { clsx } from '@/utils/clsx'

type AccordionItemProps = {
  item: FaqItem
  isOpen: boolean
  onToggle: () => void
}

export function AccordionItem({ item, isOpen, onToggle }: AccordionItemProps) {
  return (
    <Box className="flex flex-col">
      <button
        type="button"
        onClick={onToggle}
        className="flex items-center justify-between gap-3 border-none bg-transparent px-4 py-3.5 text-left active:opacity-80"
      >
        <Text className="flex-1 text-[14px] font-medium text-text-primary">{item.question}</Text>
        <HiChevronDown
          size={18}
          className={clsx('shrink-0 text-text-secondary transition-transform', isOpen ? 'rotate-180' : 'rotate-0')}
        />
      </button>

      <Box
        className={clsx(
          'grid overflow-hidden transition-[grid-template-rows] duration-200 ease-out',
          isOpen ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]',
        )}
      >
        <Box className="overflow-hidden">
          <Text className="px-4 pb-3.5 text-[13px] leading-relaxed text-text-secondary">{item.answer}</Text>
        </Box>
      </Box>
    </Box>
  )
}
