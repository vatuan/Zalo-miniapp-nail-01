import React, { useState } from 'react'
import { Box, Text } from 'zmp-ui'

import { pointHistory, PointHistoryEntry } from '@/mocks/loyalty-data'
import { clsx } from '@/utils/clsx'
import { formatTime } from '@/utils/format'

const PREVIEW_COUNT = 3

export function PointHistory() {
  const [showAll, setShowAll] = useState(false)
  const visible = showAll ? pointHistory : pointHistory.slice(0, PREVIEW_COUNT)
  const hasMore = pointHistory.length > PREVIEW_COUNT

  return (
    <Box className="flex flex-col gap-3 rounded-2xl border border-border-soft bg-surface-primary p-4">
      <Text className="text-[13px] font-semibold uppercase tracking-wide text-text-secondary">Lịch sử điểm</Text>

      <ul className="flex flex-col divide-y divide-border-soft p-0 m-0">
        {visible.map((entry) => (
          <PointHistoryRow key={entry.id} entry={entry} />
        ))}
      </ul>

      {hasMore ? (
        <button
          type="button"
          onClick={() => setShowAll((v) => !v)}
          className="self-center border-none bg-transparent text-sm font-semibold text-brand-pink"
        >
          {showAll ? 'Thu gọn' : 'Xem tất cả lịch sử'}
        </button>
      ) : null}
    </Box>
  )
}

type PointHistoryRowProps = {
  entry: PointHistoryEntry
}

function PointHistoryRow({ entry }: PointHistoryRowProps) {
  const isEarn = entry.delta > 0

  return (
    <li className="flex items-center justify-between gap-3 py-2.5 first:pt-0 last:pb-0">
      <Box className="flex flex-1 flex-col gap-0.5">
        <Text className="text-[14px] text-text-primary">{entry.source}</Text>
        <Text className="text-[12px] text-text-secondary">{formatTime(entry.date, 'DD/MM/YYYY')}</Text>
      </Box>

      <Text className={clsx('text-[15px] font-bold', isEarn ? 'text-brand-green' : 'text-status-danger')}>
        {isEarn ? '+' : ''}
        {entry.delta}
      </Text>
    </li>
  )
}
