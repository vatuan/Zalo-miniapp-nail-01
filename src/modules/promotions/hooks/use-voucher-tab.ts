import { useCallback, useMemo, useState } from 'react'
import { useSnackbar } from 'zmp-ui'

import { getActiveVoucherCount, getVouchersByStatus, VoucherStatus } from '@/mocks/promotions-data'

export function useVoucherTab() {
  const { openSnackbar } = useSnackbar()
  const [activeFilter, setActiveFilter] = useState<VoucherStatus>('active')
  const [manualCode, setManualCode] = useState('')

  const filteredVouchers = useMemo(() => getVouchersByStatus(activeFilter), [activeFilter])
  const activeCount = getActiveVoucherCount()

  const handleAddCode = useCallback(() => {
    openSnackbar({ text: 'Mã không hợp lệ hoặc đã tồn tại', type: 'error' })
    setManualCode('')
  }, [openSnackbar])

  return {
    activeFilter,
    setFilter: setActiveFilter,
    filteredVouchers,
    activeCount,
    manualCode,
    setManualCode,
    handleAddCode,
  }
}
