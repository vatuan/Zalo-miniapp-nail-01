import React, { useEffect, useMemo, useState } from 'react'
import {
  HiArrowRight,
  HiBolt,
  HiCheck,
  HiOutlineCalendarDays,
  HiOutlineClock,
  HiOutlineHeart,
  HiOutlineSparkles,
  HiOutlineXCircle,
  HiStar,
} from 'react-icons/hi2'
import { useNavigate } from 'react-router-dom'
import { Box, Button, Sheet, Text, useSnackbar } from 'zmp-ui'

import { useConfigurePageHeader } from '@/layouts/page-layout-context'
import { Availability, mockTechnicians, Technician } from '@/mocks/technician-data'
import { ROUTE_PATHS } from '@/routing/paths'
import { BookingProgressBar, PageHeader, SkeletonLoader } from '@/shared/components'
import { clsx } from '@/utils/clsx'

const ANY_TECH_ID = '__any__'
const LOADING_DURATION_MS = 600

type SelectedTech = string

type AvailabilityBadgeProps = {
  availability: Availability
}

function AvailabilityBadge({ availability }: AvailabilityBadgeProps) {
  if (availability === 'available') {
    return (
      <Box className="inline-flex items-center gap-1 rounded-full bg-status-success-soft px-2 py-0.5">
        <HiOutlineCalendarDays size={12} className="text-status-success" />
        <Text className="text-[11px] font-semibold text-status-success">Còn lịch hôm nay</Text>
      </Box>
    )
  }
  if (availability === 'limited') {
    return (
      <Box className="inline-flex items-center gap-1 rounded-full bg-status-warning-soft px-2 py-0.5">
        <HiOutlineClock size={12} className="text-brand-dark" />
        <Text className="text-[11px] font-semibold text-brand-dark">Ít slot trống</Text>
      </Box>
    )
  }
  return (
    <Box className="inline-flex items-center gap-1 rounded-full bg-border-soft px-2 py-0.5">
      <HiOutlineXCircle size={12} className="text-text-secondary" />
      <Text className="text-[11px] font-semibold text-text-secondary">Hôm nay đã kín</Text>
    </Box>
  )
}

type AnyTechCardProps = {
  isSelected: boolean
  onSelect: () => void
}

function AnyTechCard({ isSelected, onSelect }: AnyTechCardProps) {
  return (
    <Box
      role="button"
      onClick={onSelect}
      className={clsx(
        'flex w-full items-start gap-3 rounded-2xl bg-brand-pink-ultra-soft p-4 shadow-sm transition-all active:scale-[0.99]',
        isSelected ? 'ring-2 ring-brand-pink' : 'ring-1 ring-brand-pink-soft',
      )}
    >
      <Box className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-brand-pink text-text-inverse">
        <HiBolt size={22} />
      </Box>

      <Box className="min-w-0 flex-1">
        <Box className="flex items-center gap-2">
          <Text className="text-sm font-semibold text-text-primary">Bất kỳ KTV nào</Text>
          <Text className="rounded-full bg-brand-pink px-2 py-0.5 text-[10px] font-semibold text-text-inverse">
            Đề xuất
          </Text>
        </Box>
        <Text className="mt-1 text-xs text-text-secondary">
          Nhanh nhất – Tự phân công KTV phù hợp nhất với dịch vụ của bạn.
        </Text>
      </Box>

      <Box
        className={clsx(
          'mt-1 flex h-5 w-5 shrink-0 items-center justify-center rounded-full border-2 transition-colors',
          isSelected ? 'border-brand-pink bg-brand-pink text-text-inverse' : 'border-border-default bg-surface-primary',
        )}
      >
        {isSelected ? <HiCheck size={12} /> : null}
      </Box>
    </Box>
  )
}

type TechnicianCardProps = {
  technician: Technician
  isSelected: boolean
  onSelect: (technician: Technician) => void
  onOpenProfile: (technicianId: string) => void
}

function TechnicianCard({ technician, isSelected, onSelect, onOpenProfile }: TechnicianCardProps) {
  const isFull = technician.availability === 'full'

  const handleSelectClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation()
    onSelect(technician)
  }

  const handleProfileClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation()
    onOpenProfile(technician.id)
  }

  return (
    <Box
      aria-disabled={isFull}
      className={clsx(
        'flex w-full items-start gap-3 rounded-2xl border bg-card-surface p-3 shadow-sm transition-all',
        isSelected ? 'border-2 border-brand-pink' : 'border border-brand-pink-soft',
        isFull ? 'opacity-60 pointer-events-none' : '',
      )}
    >
      <Box className="h-12 w-12 shrink-0 overflow-hidden rounded-full bg-surface-muted">
        <img src={technician.avatar} alt={technician.name} className="h-full w-full object-cover" />
      </Box>

      <Box className="min-w-0 flex-1">
        <Box className="flex items-start justify-between gap-2">
          <Text className="line-clamp-1 text-sm font-semibold text-text-primary">{technician.name}</Text>
          {technician.isFavorite ? <HiOutlineHeart size={16} className="shrink-0 text-brand-pink" /> : null}
        </Box>

        <Box className="mt-0.5 flex items-center gap-1">
          <HiStar size={12} className="text-brand-gold" />
          <Text className="text-xs font-semibold text-text-primary">{technician.rating.toFixed(1)}</Text>
          <Text className="text-xs text-text-secondary">({technician.reviewCount} đánh giá)</Text>
        </Box>

        <Box className="mt-1.5">
          <AvailabilityBadge availability={technician.availability} />
        </Box>

        <Box className="mt-2 flex justify-end items-center gap-3">
          <button
            type="button"
            onClick={handleProfileClick}
            className="text-xs border-none bg-transparent font-semibold text-brand-pink hover:text-brand-dark"
          >
            Xem profile
          </button>

          <button
            type="button"
            onClick={handleSelectClick}
            disabled={isFull}
            className={clsx(
              'rounded-full border-none px-3 py-1 text-xs font-semibold transition-colors active:scale-[0.98]',
              isSelected
                ? 'ring-1 ring-brand-pink bg-brand-pink text-text-inverse'
                : 'ring-1 ring-brand-pink bg-surface-primary text-brand-pink',
            )}
          >
            {isSelected ? 'Bỏ chọn' : 'Chọn'}
          </button>
        </Box>
      </Box>
    </Box>
  )
}

type TechnicianProfileSheetProps = {
  technician: Technician | null
  isSelected: boolean
  onClose: () => void
  onToggleSelect: (technician: Technician) => void
}

function TechnicianProfileSheet({ technician, isSelected, onClose, onToggleSelect }: TechnicianProfileSheetProps) {
  if (!technician) {
    return <Sheet visible={false} onClose={onClose} mask handler swipeToClose autoHeight={false} height="80%" />
  }

  const previewPortfolio = technician.portfolio.slice(0, 3)
  const remainingCount = Math.max(technician.portfolio.length - previewPortfolio.length, 0)

  const handleCtaClick = () => {
    onToggleSelect(technician)
    onClose()
  }

  return (
    <Sheet visible onClose={onClose} mask handler swipeToClose autoHeight={false} height="80%">
      <Box className="flex h-full flex-col max-h-[75vh]">
        <Box className="flex-1 overflow-y-auto px-4 pb-4 pt-2">
          <Box className="flex items-center gap-3">
            <Box className="h-20 w-20 shrink-0 overflow-hidden rounded-full bg-surface-muted">
              <img src={technician.avatar} alt={technician.name} className="h-full w-full object-cover" />
            </Box>
            <Box className="min-w-0 flex-1">
              <Text className="text-base font-semibold text-text-primary">{technician.name}</Text>
              <Box className="mt-1 flex items-center gap-1">
                <HiStar size={14} className="text-brand-gold" />
                <Text className="text-xs font-semibold text-text-primary">{technician.rating.toFixed(1)}</Text>
                <Text className="text-xs text-text-secondary">• {technician.reviewCount} đánh giá</Text>
              </Box>
              <Text className="mt-1 text-xs text-text-secondary">Kinh nghiệm: {technician.experienceYears} năm</Text>
            </Box>
          </Box>

          <Box className="mt-5">
            <Text className="text-[11px] font-semibold uppercase tracking-widest text-text-secondary">Chuyên môn</Text>
            <Box className="mt-2 flex flex-wrap gap-2">
              {technician.specialties.map((specialty) => (
                <Box
                  key={specialty}
                  className="rounded-full bg-brand-pink-ultra-soft px-3 py-1 ring-1 ring-brand-pink-soft"
                >
                  <Text className="text-xs font-semibold text-brand-pink">{specialty}</Text>
                </Box>
              ))}
            </Box>
          </Box>

          <Box className="mt-5">
            <Text className="text-[11px] font-semibold uppercase tracking-widest text-text-secondary">
              Portfolio gần đây
            </Text>
            <Box className="mt-2 grid grid-cols-4 gap-2">
              {previewPortfolio.map((src, index) => (
                <Box key={`${src}-${index}`} className="aspect-square overflow-hidden rounded-xl bg-surface-muted">
                  <img src={src} alt={`portfolio-${index}`} className="h-full w-full object-cover" />
                </Box>
              ))}
              {remainingCount > 0 ? (
                <Box className="flex aspect-square items-center justify-center rounded-xl bg-brand-pink-ultra-soft ring-1 ring-brand-pink-soft">
                  <Text className="text-sm font-semibold text-brand-pink">+{remainingCount}</Text>
                </Box>
              ) : null}
            </Box>
          </Box>

          <Box className="mt-5">
            <Text className="text-[11px] font-semibold uppercase tracking-widest text-text-secondary">Đánh giá</Text>
            <Box className="mt-2 flex flex-col gap-2">
              {technician.reviews.map((review, index) => (
                <Box
                  key={`${review.author}-${index}`}
                  className="rounded-2xl border border-brand-pink-soft bg-card-surface p-3"
                >
                  <Box className="flex items-center gap-1">
                    {Array.from({ length: review.rating }).map((_, starIdx) => (
                      <HiStar key={starIdx} size={12} className="text-brand-gold" />
                    ))}
                  </Box>
                  <Text className="mt-1 text-sm text-text-primary">"{review.comment}"</Text>
                  <Text className="mt-0.5 text-[11px] text-text-secondary">— {review.author}</Text>
                </Box>
              ))}
            </Box>
          </Box>
        </Box>

        <Box className="border-t mt-auto border-border-soft bg-surface-primary px-4 py-3">
          <button
            type="button"
            onClick={handleCtaClick}
            className={clsx(
              'flex w-full items-center justify-center gap-2 rounded-full border-none px-5 py-3 text-sm font-semibold transition-colors active:scale-[0.99]',
              isSelected
                ? 'bg-surface-primary text-brand-pink ring-1 ring-brand-pink'
                : 'bg-button-primary-bg text-button-primary-fg',
            )}
          >
            {isSelected ? 'Bỏ chọn KTV này' : 'Chọn KTV này'}
          </button>
        </Box>
      </Box>
    </Sheet>
  )
}

type ContinueBarProps = {
  isEnabled: boolean
  onContinue: () => void
}

function ContinueBar({ isEnabled, onContinue }: ContinueBarProps) {
  return (
    <Box className="sticky -bottom-[0.5px] left-0 right-0 border-t border-border-soft bg-surface-primary px-4 py-3 shadow-[0_-2px_8px_rgba(0,0,0,0.08)]">
      <button
        type="button"
        disabled={!isEnabled}
        onClick={onContinue}
        className={clsx(
          'flex w-full items-center justify-center gap-2 rounded-full border-none px-5 py-3 text-sm font-semibold',
          isEnabled
            ? 'bg-button-primary-bg text-button-primary-fg active:scale-[0.99]'
            : 'cursor-not-allowed bg-gray-200 text-text-primary',
        )}
      >
        Tiếp tục <HiArrowRight size={18} />
      </button>
    </Box>
  )
}

export function BookingTechnicianPageModule() {
  const navigate = useNavigate()
  const { openSnackbar } = useSnackbar()

  const [isLoading, setIsLoading] = useState(true)
  const [selectedId, setSelectedId] = useState<SelectedTech>('')
  const [profileTechId, setProfileTechId] = useState<string | null>(null)

  const headerConfig = useMemo(
    () => ({
      content: (
        <Box className="w-full">
          <PageHeader title="Chọn kỹ thuật viên" onBack={() => navigate(ROUTE_PATHS.bookingServices)} />
          <BookingProgressBar currentStep={3} totalSteps={5} />
        </Box>
      ),
    }),
    [navigate],
  )

  useConfigurePageHeader(headerConfig)

  useEffect(() => {
    const timer = window.setTimeout(() => setIsLoading(false), LOADING_DURATION_MS)
    return () => window.clearTimeout(timer)
  }, [])

  const favoriteTechnicians = mockTechnicians.filter((t) => t.isFavorite)
  const allTechnicians = mockTechnicians

  const handleSelectAny = () => {
    setSelectedId((prev) => (prev === ANY_TECH_ID ? '' : ANY_TECH_ID))
  }

  const handleSelectTechnician = (technician: Technician) => {
    if (technician.availability === 'full') {
      openSnackbar({
        text: 'KTV này kín hôm nay. Chọn ngày khác ở bước tiếp theo',
        type: 'warning',
      })
      return
    }
    setSelectedId((prev) => (prev === technician.id ? '' : technician.id))
  }

  const handleOpenProfile = (technicianId: string) => {
    setProfileTechId(technicianId)
  }

  const handleCloseProfile = () => {
    setProfileTechId(null)
  }

  const handleToggleSelectFromSheet = (technician: Technician) => {
    setSelectedId((prev) => (prev === technician.id ? '' : technician.id))
  }

  const profileTechnician = profileTechId ? (mockTechnicians.find((t) => t.id === profileTechId) ?? null) : null

  const handleContinue = () => {
    // eslint-disable-next-line no-console
    console.log('Tiếp tục with selection:', selectedId)
  }

  const hasTechnicians = allTechnicians.length > 0
  const isCtaEnabled = hasTechnicians && selectedId !== ''

  return (
    <Box className="flex min-h-full flex-col bg-app-bg">
      {isLoading ? (
        <Box className="flex flex-col gap-3 px-4 py-4">
          <SkeletonLoader className="h-20 rounded-2xl" />
          <SkeletonLoader className="h-5 w-40 rounded-full" />
          <SkeletonLoader className="h-24 rounded-2xl" />
          <SkeletonLoader className="h-24 rounded-2xl" />
          <SkeletonLoader className="h-24 rounded-2xl" />
        </Box>
      ) : !hasTechnicians ? (
        <Box className="flex flex-1 flex-col items-center justify-center gap-3 px-6 py-10 text-center">
          <Box className="flex h-12 w-12 items-center justify-center rounded-full bg-surface-muted text-brand-dark">
            <HiOutlineSparkles size={22} />
          </Box>
          <Text className="text-sm text-text-primary">Chi nhánh này chưa có thông tin kỹ thuật viên</Text>
          <Button
            size="small"
            className="rounded-full bg-button-primary-bg text-button-primary-fg"
            onClick={() => navigate(ROUTE_PATHS.bookingServices)}
          >
            Quay lại
          </Button>
        </Box>
      ) : (
        <>
          <Box className="flex flex-1 flex-col gap-5 px-4 pt-3 pb-4">
            <AnyTechCard isSelected={selectedId === ANY_TECH_ID} onSelect={handleSelectAny} />

            <Box className="flex items-center gap-2">
              <Box className="h-px flex-1 bg-border-soft" />
              <Text className="text-[11px] font-semibold uppercase tracking-widest text-text-secondary">
                Hoặc chọn người cụ thể
              </Text>
              <Box className="h-px flex-1 bg-border-soft" />
            </Box>

            {favoriteTechnicians.length > 0 ? (
              <Box className="flex flex-col gap-2">
                {/* Phase 3 */}
                <Box className="flex items-center gap-1.5">
                  <HiOutlineHeart size={14} className="text-brand-pink" />
                  <Text className="text-xs font-semibold uppercase tracking-widest text-text-secondary">
                    Yêu thích của bạn
                  </Text>
                </Box>
                <Box className="flex flex-col gap-3">
                  {favoriteTechnicians.map((technician) => (
                    <TechnicianCard
                      key={`fav-${technician.id}`}
                      technician={technician}
                      isSelected={selectedId === technician.id}
                      onSelect={handleSelectTechnician}
                      onOpenProfile={handleOpenProfile}
                    />
                  ))}
                </Box>
              </Box>
            ) : null}

            <Box className="flex flex-col gap-2">
              <Box className="flex items-center gap-1.5">
                <HiOutlineSparkles size={14} className="text-brand-dark" />
                <Text className="text-xs font-semibold uppercase tracking-widest text-text-secondary">
                  Tất cả kỹ thuật viên
                </Text>
              </Box>
              <Box className="flex flex-col gap-3">
                {allTechnicians.map((technician) => (
                  <TechnicianCard
                    key={technician.id}
                    technician={technician}
                    isSelected={selectedId === technician.id}
                    onSelect={handleSelectTechnician}
                    onOpenProfile={handleOpenProfile}
                  />
                ))}
              </Box>
            </Box>
          </Box>

          <ContinueBar isEnabled={isCtaEnabled} onContinue={handleContinue} />
        </>
      )}

      <TechnicianProfileSheet
        technician={profileTechnician}
        isSelected={profileTechnician ? selectedId === profileTechnician.id : false}
        onClose={handleCloseProfile}
        onToggleSelect={handleToggleSelectFromSheet}
      />
    </Box>
  )
}
