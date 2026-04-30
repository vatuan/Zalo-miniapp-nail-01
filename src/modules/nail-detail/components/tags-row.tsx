import React, { useCallback } from 'react'
import { useNavigate } from 'react-router-dom'
import { Box } from 'zmp-ui'

import { NailDetailTag } from '@/mocks/nail-detail-data'
import { ROUTE_PATHS } from '@/routing/paths'

import { TagChip } from './tag-chip'

type TagsRowProps = {
  tags: NailDetailTag[]
}

export function TagsRow({ tags }: TagsRowProps) {
  const navigate = useNavigate()

  const handleTagClick = useCallback(
    (tag: NailDetailTag) => {
      const params = new URLSearchParams({ [tag.kind]: tag.value })
      navigate(`${ROUTE_PATHS.gallery}?${params.toString()}`)
    },
    [navigate],
  )

  if (tags.length === 0) return null

  return (
    <Box className="flex flex-row flex-wrap gap-2">
      {tags.map((tag) => (
        <TagChip key={`${tag.kind}-${tag.value}`} label={tag.label} onClick={() => handleTagClick(tag)} />
      ))}
    </Box>
  )
}
