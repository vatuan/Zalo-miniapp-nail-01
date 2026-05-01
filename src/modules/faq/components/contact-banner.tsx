import React from 'react'
import { HiArrowRight, HiOutlineChatBubbleLeftRight } from 'react-icons/hi2'
import { openChat } from 'zmp-sdk'
import { Box, Text, useSnackbar } from 'zmp-ui'

const SALON_OA_ID = 'oa-nailspa'

export function ContactBanner() {
  const { openSnackbar } = useSnackbar()

  const handleContact = async () => {
    try {
      await openChat({ id: SALON_OA_ID, type: 'oa' })
    } catch {
      openSnackbar({ text: 'Đang mở Zalo OA của salon...', type: 'success' })
    }
  }

  return (
    <button
      type="button"
      onClick={handleContact}
      className="flex w-full items-center justify-between gap-3 rounded-2xl border-none bg-button-primary-bg px-4 py-3 text-button-primary-fg active:opacity-80"
    >
      <Box className="flex items-center gap-2">
        <HiOutlineChatBubbleLeftRight size={18} />
        <Text className="text-[14px] font-semibold text-button-primary-fg">Liên hệ qua Zalo OA</Text>
      </Box>
      <HiArrowRight size={16} />
    </button>
  )
}
