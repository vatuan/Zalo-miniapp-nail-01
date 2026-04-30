import React, { useState } from 'react'
import { HiChevronDown } from 'react-icons/hi2'
import { Box, Text } from 'zmp-ui'

import { ServicePriceVariant } from '@/mocks/service-detail-data'
import { formatDurationRange, formatPriceShort } from '@/modules/services/service-format'
import { clsx } from '@/utils/clsx'

type PriceVariantAccordionProps = {
  variants: ServicePriceVariant[]
  selectedId: string | null
  onSelect: (variantId: string) => void
}

export function PriceVariantAccordion({ variants, selectedId, onSelect }: PriceVariantAccordionProps) {
  const [isOpen, setIsOpen] = useState(true)

  const selectedVariant = variants.find((v) => v.id === selectedId) ?? variants[0]

  return (
    <Box className="rounded-xl border border-border-soft bg-surface-primary">
      <button
        type="button"
        onClick={() => setIsOpen((v) => !v)}
        className="flex w-full items-center justify-between gap-2 border-none bg-transparent px-3 py-2.5 text-left"
      >
        <Box className="flex flex-col">
          <Text className="text-[11px] font-semibold uppercase tracking-widest text-text-secondary">Bảng giá</Text>
          <Text className="text-sm font-semibold text-brand-dark">
            Từ {formatPriceShort(Math.min(...variants.map((v) => v.price)))}
          </Text>
        </Box>
        <HiChevronDown
          size={18}
          className={clsx('shrink-0 text-text-secondary transition-transform', isOpen && 'rotate-180')}
        />
      </button>

      {isOpen ? (
        <Box className="flex flex-col border-t border-border-soft">
          {variants.map((variant) => {
            const isSelected = variant.id === selectedVariant.id
            return (
              <button
                key={variant.id}
                type="button"
                onClick={() => onSelect(variant.id)}
                className={clsx(
                  'flex items-center justify-between gap-3 border-none bg-transparent px-3 py-2.5 text-left',
                  isSelected ? 'bg-brand-pink-ultra-soft' : '',
                )}
              >
                <Box className="flex min-w-0 flex-1 flex-col">
                  <Text
                    className={clsx(
                      'text-sm',
                      isSelected ? 'font-semibold text-brand-dark' : 'text-text-primary',
                    )}
                  >
                    {variant.label}
                  </Text>
                  <Text className="text-xs text-text-secondary">
                    {formatDurationRange(variant.durationMin, variant.durationMax)}
                  </Text>
                </Box>
                <Text
                  className={clsx(
                    'shrink-0 text-sm font-bold',
                    isSelected ? 'text-brand-dark' : 'text-text-primary',
                  )}
                >
                  {formatPriceShort(variant.price)}
                </Text>
              </button>
            )
          })}
        </Box>
      ) : null}
    </Box>
  )
}
