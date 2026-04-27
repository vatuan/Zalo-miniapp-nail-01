import React, { useMemo, useState } from 'react'
import { HiOutlineCalendarDays, HiOutlineClock, HiOutlineMapPin } from 'react-icons/hi2'
import { useNavigate } from 'react-router-dom'
import { Box, Button, Sheet, Text } from 'zmp-ui'

import { UpcomingAppointment } from '@/mocks/home-data'
import { ROUTE_PATHS } from '@/routing/paths'
import { clsx } from '@/utils/clsx'

type AppointmentWidgetProps = {
  appointment: Exclude<UpcomingAppointment, null>
  onConfirmCancel: () => void
}

export function AppointmentWidget({ appointment, onConfirmCancel }: AppointmentWidgetProps) {
  const navigate = useNavigate()
  const [isCancelSheetVisible, setIsCancelSheetVisible] = useState(false)

  const isToday = appointment.status === 'today'
  const isCancelledBySalon = appointment.status === 'cancelled_by_salon'

  const servicesLabel = useMemo(() => appointment.services.join(' • '), [appointment.services])

  return (
    <>
      <Box
        className={clsx(
          'rounded-xl border p-4 shadow-sm',
          isToday ? 'border-border-default bg-status-warning-soft' : 'border-card-border bg-card-surface',
        )}
      >
        <Box className="mb-3 flex items-center justify-between gap-2">
          <Box className="flex items-center gap-2">
            <HiOutlineCalendarDays className="text-brand-dark" size={18} />
            <Text className="text-xs font-semibold tracking-wide text-text-primary">LỊCH HẸN SẮP TỚI</Text>
          </Box>

          {appointment.totalOtherAppointments > 0 && !isCancelledBySalon ? (
            <Text className="text-xs font-semibold text-brand-dark">
              {`+${appointment.totalOtherAppointments} lịch khác`}
            </Text>
          ) : null}
        </Box>

        <Box className="space-y-2 text-sm text-text-primary">
          <Box className="flex items-center gap-2 font-semibold">
            <Text>{servicesLabel}</Text>
          </Box>

          <Box className="flex items-center gap-2">
            <HiOutlineClock className="text-text-secondary" size={16} />
            <Text>
              {isToday ? 'Hôm nay' : appointment.date}
              {` • ${appointment.time}`}
            </Text>
          </Box>

          <Box className="flex items-center gap-2">
            <HiOutlineMapPin className="text-text-secondary" size={16} />
            <Text>{appointment.branch}</Text>
          </Box>
        </Box>

        {isCancelledBySalon ? (
          <Box className="mt-4 flex items-center justify-between gap-2">
            <Text className="rounded-full bg-status-danger-soft px-2 py-1 text-xs font-semibold text-status-danger">
              Đã bị hủy
            </Text>
            <Button
              size="small"
              className="rounded-full bg-button-primary-bg px-4 text-button-primary-fg"
              onClick={() => navigate(ROUTE_PATHS.booking)}
            >
              Đặt lại
            </Button>
          </Box>
        ) : (
          <Box className="mt-4 grid grid-cols-2 gap-2">
            <Button
              size="small"
              className="rounded-full border border-border-default bg-surface-primary text-text-primary"
              onClick={() => navigate(ROUTE_PATHS.appointmentDetailBase.replace(':id', appointment.id))}
            >
              Xem chi tiết
            </Button>
            <Button
              size="small"
              className="rounded-full bg-button-primary-bg text-button-primary-fg"
              onClick={() => setIsCancelSheetVisible(true)}
            >
              Hủy
            </Button>
          </Box>
        )}
      </Box>

      <Sheet
        visible={isCancelSheetVisible}
        title="Xác nhận hủy lịch"
        onClose={() => setIsCancelSheetVisible(false)}
        autoHeight
      >
        <Box className="space-y-3 p-4">
          <Text className="text-sm text-text-primary">Bạn có chắc muốn hủy lịch hẹn này không?</Text>
          <Box className="grid grid-cols-2 gap-2">
            <Button
              variant="tertiary"
              type="neutral"
              className="rounded-full border border-border-default bg-surface-primary text-text-primary"
              onClick={() => setIsCancelSheetVisible(false)}
            >
              Không
            </Button>
            <Button
              type="danger"
              className="rounded-full bg-status-danger text-button-primary-fg"
              onClick={() => {
                onConfirmCancel()
                setIsCancelSheetVisible(false)
              }}
            >
              Hủy lịch
            </Button>
          </Box>
        </Box>
      </Sheet>
    </>
  )
}
