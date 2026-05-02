import React, { useCallback, useMemo } from 'react'
import { GoDotFill } from 'react-icons/go'
import { HiFire } from 'react-icons/hi2'
import { useNavigate } from 'react-router-dom'
import { Box, Text } from 'zmp-ui'

import { useConfigurePageHeader } from '@/layouts/page-layout-context'
import { getActivePromos, getEndingSoonPromos } from '@/mocks/promotions-data'
import { PageHeader } from '@/shared/components'

import { PromoSection } from './components/promo-section'
import { PromotionsTabBar } from './components/promotions-tab-bar'
import { VoucherCard } from './components/voucher-card'
import { VoucherCodeInput } from './components/voucher-code-input'
import { VoucherEmptyState } from './components/voucher-empty-state'
import { VoucherFilterChips } from './components/voucher-filter-chips'
import { usePromotionsTabs } from './hooks/use-promotions-tabs'
import { useVoucherTab } from './hooks/use-voucher-tab'

const activePromos = getActivePromos()
const endingSoonPromos = getEndingSoonPromos()

export function PromotionsPageModule() {
  const navigate = useNavigate()
  const { activeTab, setActiveTab } = usePromotionsTabs()
  const { activeFilter, setFilter, filteredVouchers, activeCount, manualCode, setManualCode, handleAddCode } =
    useVoucherTab()

  const handleBack = useCallback(() => navigate(-1), [navigate])

  const headerConfig = useMemo(
    () => ({
      content: (
        <Box className="w-full">
          <PageHeader title="Ưu đãi & Voucher" onBack={handleBack} />
        </Box>
      ),
    }),
    [handleBack],
  )

  useConfigurePageHeader(headerConfig)

  return (
    <Box className="flex min-h-full flex-col bg-app-bg">
      <Box className="sticky -top-[0.5px] z-10 bg-surface-primary shadow-sm">
        <PromotionsTabBar activeTab={activeTab} onTabChange={setActiveTab} />
      </Box>

      {activeTab === 0 ? (
        <Box className="flex flex-col gap-5 px-4 py-4 pb-8">
          <PromoSection
            title={
              <div className="flex items-center gap-1">
                <HiFire size={20} />
                <Text className="text-sm">Đang diễn ra</Text>
              </div>
            }
            promos={activePromos}
          />
          <PromoSection
            title={
              <div className="flex items-center gap-1">
                <GoDotFill size={20} className="text-red-500" />
                <Text className="text-sm text-text-secondary">Sắp kết thúc</Text>
              </div>
            }
            promos={endingSoonPromos}
          />
        </Box>
      ) : null}

      {activeTab === 1 ? (
        <Box className="flex flex-col gap-4 pb-8 pt-4">
          <Box className="px-4">
            <VoucherFilterChips activeFilter={activeFilter} activeCount={activeCount} onChange={setFilter} />
          </Box>

          {filteredVouchers.length === 0 ? (
            <VoucherEmptyState />
          ) : (
            <Box className="flex flex-col gap-3 px-4">
              {filteredVouchers.map((voucher) => (
                <VoucherCard key={voucher.id} voucher={voucher} />
              ))}
            </Box>
          )}

          <Box className="px-4">
            <VoucherCodeInput value={manualCode} onChange={setManualCode} onSubmit={handleAddCode} />
          </Box>
        </Box>
      ) : null}
    </Box>
  )
}
