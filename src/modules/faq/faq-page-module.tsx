import React, { useCallback, useMemo } from 'react'
import { useNavigate } from 'react-router-dom'
import { Box } from 'zmp-ui'

import { useConfigurePageHeader } from '@/layouts/page-layout-context'
import { PageHeader } from '@/shared/components'

import { ContactBanner } from './components/contact-banner'
import { FaqAccordion } from './components/faq-accordion'
import { FeedbackLink } from './components/feedback-link'

export function FaqPageModule() {
  const navigate = useNavigate()
  const handleBack = useCallback(() => navigate(-1), [navigate])

  const headerConfig = useMemo(
    () => ({
      content: (
        <Box className="w-full">
          <PageHeader title="Hỗ trợ" onBack={handleBack} />
        </Box>
      ),
    }),
    [handleBack],
  )

  useConfigurePageHeader(headerConfig)

  return (
    <Box className="flex min-h-full flex-col gap-4 bg-app-bg px-4 pt-4 pb-8">
      <ContactBanner />
      <FaqAccordion />
      <FeedbackLink />
    </Box>
  )
}
