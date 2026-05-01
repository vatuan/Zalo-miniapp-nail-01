import { useCallback, useState } from 'react'
import { getLocation } from 'zmp-sdk'
import { useSnackbar } from 'zmp-ui'

import { mockGpsAvailable } from '@/mocks/branch-data'

export function useGpsPermission() {
  const [gpsGranted, setGpsGranted] = useState<boolean>(false)
  const { openSnackbar } = useSnackbar()

  const requestGps = useCallback(async () => {
    try {
      await getLocation()
      setGpsGranted(true)
    } catch {
      // For demo/UI: fall back to mock value so the granted state can be exercised
      // without a real Zalo runtime. If even the mock says unavailable, show the toast.
      if (mockGpsAvailable) {
        setGpsGranted(true)
        return
      }
      openSnackbar({ text: 'Vui lòng bật vị trí trong cài đặt', type: 'warning' })
    }
  }, [openSnackbar])

  return { gpsGranted, requestGps }
}
