import React from 'react'
import { HiOutlineSparkles } from 'react-icons/hi2'
import { Box, Text } from 'zmp-ui'

import { clsx } from '@/utils/clsx'
import { formatMoney } from '@/utils/format'

type PointsToggleProps = {
  isEnabled: boolean
  availablePoints: number
  discountAmount: number
  onToggle: () => void
}

export function PointsToggle({ isEnabled, availablePoints, discountAmount, onToggle }: PointsToggleProps) {
  if (availablePoints <= 0) return null

  return (
    <button
      type="button"
      onClick={onToggle}
      className={clsx(
        'flex w-full items-center justify-between rounded-2xl border-none px-4 py-3 text-left transition-colors active:scale-[0.99]',
        isEnabled ? 'ring-1 ring-brand-pink bg-brand-pink-ultra-soft' : 'ring-1 ring-brand-pink-soft bg-card-surface',
      )}
    >
      <Box className="flex items-center gap-2">
        <HiOutlineSparkles size={18} className="text-brand-pink" />
        <Box>
          <Text className="text-sm font-semibold text-text-primary">Dùng {availablePoints} điểm</Text>
          <Text className="text-xs text-text-secondary">Giảm {formatMoney(discountAmount)}</Text>
        </Box>
      </Box>
      <Box
        className={clsx(
          'relative h-6 w-10 rounded-full transition-colors',
          isEnabled ? 'bg-brand-pink' : 'bg-border-soft',
        )}
      >
        <Box
          className={clsx(
            'absolute top-0.5 h-5 w-5 rounded-full bg-surface-primary shadow transition-all',
            isEnabled ? 'left-[18px]' : 'left-0.5',
          )}
        />
      </Box>
    </button>
  )
}
