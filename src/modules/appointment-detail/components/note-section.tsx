import React from 'react'
import { HiOutlinePencilSquare } from 'react-icons/hi2'
import { Text } from 'zmp-ui'

import { SectionCard } from './section-card'

type NoteSectionProps = {
  note: string
}

export function NoteSection({ note }: NoteSectionProps) {
  return (
    <SectionCard icon={<HiOutlinePencilSquare size={18} />} title="Ghi chú của bạn">
      <Text className="text-sm text-text-primary">"{note}"</Text>
    </SectionCard>
  )
}
