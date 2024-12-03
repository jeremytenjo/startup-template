import type { UsersTermsOfServiceDocumentData } from '../../../../../../../prismicio-types.js'
import { prismicSingles } from '../../../prismic.singles.js'
import useFetchPrismic from '../../fetchPrismic/useFetchPrismic/useFetchPrismic.js'

export default function useTos() {
  const tos = useFetchPrismic<{
    data: UsersTermsOfServiceDocumentData
  }>({
    id: prismicSingles.tos.id,
    prismicFn(p) {
      return p.prismicClient.getSingle(prismicSingles.tos.id)
    },
  })

  const tosData = tos.get.firstItem?.data

  return {
    loading: tos.get?.fetching,
    error: tos.get?.error,
    creator: tosData?.creator_tos,
    developer: tosData?.developer_tos,
    agency: tosData?.agency_tos,
  }
}

export type UseTosReturn = ReturnType<typeof useTos>
