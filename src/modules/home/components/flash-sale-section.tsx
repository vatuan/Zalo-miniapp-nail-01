import React from 'react'
import { HiFire, HiOutlineArrowLongRight, HiOutlineClock } from 'react-icons/hi2'
import { useNavigate } from 'react-router-dom'
import { Box, Button, Text } from 'zmp-ui'

import { FlashSaleItem } from '@/mocks/home-data'
import { ROUTE_PATHS } from '@/routing/paths'
import { clsx } from '@/utils/clsx'

type FlashSaleSectionProps = {
  flashSales: FlashSaleItem[]
}

export function FlashSaleSection({ flashSales }: FlashSaleSectionProps) {
  const navigate = useNavigate()

  return (
    <Box>
      <Box className="mb-2 flex items-center gap-2">
        <HiFire className="text-brand-dark" size={18} />
        <Text className="text-sm font-bold tracking-wide text-text-primary">FLASH SALE HÔM NAY</Text>
      </Box>

      <Box className="hide-scrollbar flex gap-3 overflow-x-auto pb-1">
        {flashSales.map((item) => {
          const isSoldOut = item.slotsLeft === 0
          const isLowSlots = item.slotsLeft <= 2

          return (
            <Box
              key={item.id}
              className={clsx(
                'relative w-[210px] shrink-0 rounded-xl border p-4 shadow-sm',
                isSoldOut ? 'border-border-soft bg-surface-muted' : 'border-card-border bg-card-surface',
              )}
            >
              {isSoldOut ? (
                <Box className="absolute inset-0 z-10 flex items-center justify-center rounded-xl bg-overlay-backdrop">
                  <Text className="rounded-full bg-status-danger px-3 py-1 text-xs font-bold text-button-primary-fg">
                    HẾT SLOT
                  </Text>
                </Box>
              ) : null}

              <Text className="mb-2 text-sm font-semibold text-text-primary">{item.name}</Text>

              <Box className="mb-3 space-y-1">
                <Text className="text-xs text-text-secondary line-through">{item.originalPrice}</Text>
                <Text className="text-base font-bold text-brand-dark">{item.salePrice}</Text>
                <Text className="inline-flex rounded-full bg-status-danger-soft px-2 py-0.5 text-xs font-semibold text-status-danger">
                  -{item.discount}
                </Text>
              </Box>

              <Box
                className={clsx(
                  'mb-3 flex items-center gap-1 text-xs',
                  isLowSlots ? 'font-semibold text-status-danger' : 'text-text-secondary',
                )}
              >
                <HiOutlineClock size={14} />
                <Text>{`Còn ${item.slotsLeft} slot`}</Text>
              </Box>

              <Button
                size="small"
                disabled={isSoldOut}
                className={clsx(
                  'w-full rounded-full',
                  isSoldOut ? 'bg-border-default text-text-secondary' : 'bg-button-primary-bg text-button-primary-fg',
                )}
                suffixIcon={!isSoldOut ? <HiOutlineArrowLongRight size={16} /> : undefined}
                onClick={() => navigate(`${ROUTE_PATHS.booking}?service=${item.id}`)}
              >
                Đặt ngay
              </Button>
            </Box>
          )
        })}
      </Box>
    </Box>
  )
}
