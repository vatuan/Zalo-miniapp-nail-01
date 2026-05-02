import React, { useState } from 'react'
import { Box, Text } from 'zmp-ui'

import { getTierConfig, memberProfile, nextTierProgress } from '@/mocks/loyalty-data'

export function BenefitsList() {
  const [showNextTier, setShowNextTier] = useState(false)

  const currentTier = getTierConfig(memberProfile.tier)
  const nextTier = nextTierProgress.nextTier ? getTierConfig(nextTierProgress.nextTier) : null

  const currentName = formatTierName(currentTier.label)
  const nextName = nextTier ? formatTierName(nextTier.label) : ''

  return (
    <Box className="flex flex-col gap-3 rounded-2xl border border-border-soft bg-surface-primary p-4">
      <Text className="text-sm font-semibold uppercase tracking-wide text-text-secondary">
        Quyền lợi hiện tại ({currentName})
      </Text>

      <ul className="flex flex-col gap-2 p-0 pl-1 m-0">
        {currentTier.benefits.map((benefit) => (
          <li key={benefit} className="flex items-start gap-2">
            <span className="mt-0.5 text-brand-green">✓</span>
            <Text className="flex-1 text-[14px] text-text-primary">{benefit}</Text>
          </li>
        ))}
      </ul>

      {nextTier ? (
        <>
          <button
            type="button"
            onClick={() => setShowNextTier((v) => !v)}
            className="self-start text-xs border-none bg-transparent font-semibold text-brand-pink"
          >
            {showNextTier ? `Ẩn quyền lợi ${nextName} ↑` : `Xem quyền lợi ${nextName}`}
          </button>

          {showNextTier ? (
            <Box className="flex flex-col gap-2 rounded-xl border border-border-soft bg-surface-muted p-3">
              <Text className="text-[13px] font-semibold text-text-primary">
                {nextTier.icon} Quyền lợi khi lên {nextName}
              </Text>
              <ul className="flex flex-col gap-2 p-0 m-0 pl-2">
                {nextTier.benefits.map((benefit) => (
                  <li key={benefit} className="flex items-start gap-2">
                    <span className="mt-0.5 text-brand-pink">✦</span>
                    <Text className="flex-1 text-[14px] text-text-primary">{benefit}</Text>
                  </li>
                ))}
              </ul>
            </Box>
          ) : null}
        </>
      ) : null}
    </Box>
  )
}

function formatTierName(label: string) {
  const name = label.replace(' MEMBER', '')
  return name.charAt(0) + name.slice(1).toLowerCase()
}
