import React from 'react'
import { HiOutlineCamera, HiXMark } from 'react-icons/hi2'
import { Box, Text } from 'zmp-ui'

type PhotoUploadSectionProps = {
  photos: string[]
  maxPhotos: number
  onAdd: () => void
  onRemove: (index: number) => void
}

export function PhotoUploadSection({ photos, maxPhotos, onAdd, onRemove }: PhotoUploadSectionProps) {
  const canAdd = photos.length < maxPhotos

  return (
    <Box className="flex flex-col gap-3">
      <Box className="flex items-center justify-between">
        <Text className="text-[11px] font-bold uppercase tracking-wider text-text-secondary">
          Thêm ảnh kết quả
        </Text>
        <Text className="text-[11px] text-text-secondary">
          {photos.length}/{maxPhotos}
        </Text>
      </Box>

      <Box className="flex gap-2">
        {photos.map((url, index) => (
          <div
            key={`${url}-${index}`}
            className="relative h-20 w-20 shrink-0 overflow-hidden rounded-xl border border-border-soft"
          >
            <img src={url} alt={`Ảnh ${index + 1}`} className="h-full w-full object-cover" />
            <button
              type="button"
              onClick={() => onRemove(index)}
              aria-label="Xóa ảnh"
              className="absolute right-1 top-1 flex h-5 w-5 items-center justify-center rounded-full border-none bg-black/60 text-white"
            >
              <HiXMark size={12} />
            </button>
          </div>
        ))}

        {canAdd ? (
          <button
            type="button"
            onClick={onAdd}
            className="flex h-20 w-20 shrink-0 flex-col items-center justify-center gap-1 rounded-xl border border-dashed border-border-default bg-surface-primary text-text-secondary active:bg-surface-muted"
          >
            <HiOutlineCamera size={20} />
            <Text className="text-[11px] text-text-secondary">Thêm ảnh</Text>
          </button>
        ) : null}
      </Box>
    </Box>
  )
}
