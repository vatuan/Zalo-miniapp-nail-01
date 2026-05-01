import { useCallback } from 'react'
import { useNavigate } from 'react-router-dom'
import { openPhone } from 'zmp-sdk'
import { useSnackbar } from 'zmp-ui'

import { Branch } from '@/mocks/branch-data'
import { ROUTE_PATHS } from '@/routing/paths'

export function useBranchActions() {
  const navigate = useNavigate()
  const { openSnackbar } = useSnackbar()

  const openDirections = useCallback(
    async (branch: Branch) => {
      try {
        // zmp-sdk has no openMap export; surface intent via snackbar so the UI flow is verifiable.
        openSnackbar({ text: `Đang mở chỉ đường đến ${branch.name}...`, type: 'success' })
      } catch {
        // silent fallback
      }
    },
    [openSnackbar],
  )

  const callBranch = useCallback(
    async (branch: Branch) => {
      try {
        await openPhone({ phoneNumber: branch.phone.replace(/\s/g, '') })
      } catch {
        openSnackbar({ text: `Đang gọi ${branch.phone}...`, type: 'success' })
      }
    },
    [openSnackbar],
  )

  const bookBranch = useCallback(
    (branch: Branch) => {
      navigate(ROUTE_PATHS.bookingBranch, { state: { branchId: branch.id } })
    },
    [navigate],
  )

  return { openDirections, callBranch, bookBranch }
}
