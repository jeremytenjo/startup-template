import type { PrivacyPolicyDocumentData } from '../../../../../../../prismicio-types.js'
import { prismicSingles } from '../../../prismic.singles.js'
import useFetchPrismic from '../../fetchPrismic/useFetchPrismic/useFetchPrismic.js'

export default function usePrivacyPolicy() {
  const privacyPolicy = useFetchPrismic<{
    data: PrivacyPolicyDocumentData
  }>({
    id: prismicSingles.privacyPolicy.id,
    prismicFn(p) {
      return p.prismicClient.getSingle(prismicSingles.privacyPolicy.id)
    },
  })

  const privacyPolicyData = privacyPolicy.get.firstItem?.data?.content

  return {
    loading: privacyPolicy.get?.fetching,
    error: privacyPolicy.get?.error,
    privacyPolicy: privacyPolicyData,
  }
}

export type UsePrivacyPolicyReturn = ReturnType<typeof usePrivacyPolicy>
