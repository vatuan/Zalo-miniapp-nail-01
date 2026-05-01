import React, { useCallback, useMemo } from 'react'
import { useNavigate } from 'react-router-dom'
import { Box, useSnackbar } from 'zmp-ui'

import { useConfigurePageHeader } from '@/layouts/page-layout-context'
import { userProfile } from '@/mocks/profile-data'
import { ROUTE_PATHS } from '@/routing/paths'
import { PageHeader } from '@/shared/components'

import { FooterBlock } from './components/footer-block'
import { SectionList, SectionListItem } from './components/section-list'
import { ShortcutGrid } from './components/shortcut-grid'
import { UserInfoBlock } from './components/user-info-block'

export function ProfilePageModule() {
  const navigate = useNavigate()
  const { openSnackbar } = useSnackbar()

  const handleContactOA = useCallback(() => {
    try {
      openSnackbar({ text: 'Đang mở Zalo OA của salon...', type: 'success' })
    } catch {
      // fallback: silent no-op
    }
  }, [openSnackbar])

  const handleNavigateToBranhList = useCallback(() => {
    navigate(ROUTE_PATHS.bookingBranch)
  }, [navigate])

  const headerConfig = useMemo(
    () => ({
      content: (
        <Box className="w-full">
          <PageHeader title="Hồ sơ của tôi" />
        </Box>
      ),
    }),
    [],
  )

  useConfigurePageHeader(headerConfig)

  const historyItems: SectionListItem[] = useMemo(
    () => [
      {
        id: 'favorite-nails',
        label: `Mẫu yêu thích (${userProfile.savedNailCount})`,
        onClick: () => navigate(ROUTE_PATHS.gallery),
      },
    ],
    [navigate],
  )

  const settingsItems: SectionListItem[] = useMemo(
    () => [
      {
        id: 'notifications',
        label: 'Cài đặt thông báo',
        disabled: false,
      },
    ],
    [],
  )

  const supportItems: SectionListItem[] = useMemo(
    () => [
      {
        id: 'faq',
        label: 'Danh sách chi nhánh',
        onClick: handleNavigateToBranhList,
      },
      {
        id: 'faq',
        label: 'Câu hỏi thường gặp',
        disabled: false,
      },
      {
        id: 'contact-oa',
        label: 'Liên hệ qua Zalo OA',
        onClick: handleContactOA,
      },
    ],
    [handleContactOA, handleNavigateToBranhList],
  )

  return (
    <Box className="flex min-h-full flex-col gap-4 bg-app-bg px-4 pt-4 pb-8">
      <UserInfoBlock />
      <ShortcutGrid />
      <SectionList title="Lịch sử & cá nhân" items={historyItems} />
      <SectionList title="Cài đặt" items={settingsItems} />
      <SectionList title="Hỗ trợ" items={supportItems} />
      <FooterBlock />
    </Box>
  )
}
