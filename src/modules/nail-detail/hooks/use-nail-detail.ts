import { useParams } from 'react-router-dom'

import { getNailDetailById, NailDetail } from '@/mocks/nail-detail-data'

export function useNailDetail(): { detail: NailDetail | null; notFound: boolean } {
  const { nailId } = useParams<{ nailId: string }>()
  const detail = nailId ? getNailDetailById(nailId) : null
  return { detail: detail ?? null, notFound: !detail }
}
