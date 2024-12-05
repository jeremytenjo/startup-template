import assert from '@useweb/assert'
import type { PreviewData } from 'next/types'
import type { PrismicDocument } from '@prismicio/types'

import type { StandardDocument } from '../../../../../../../prismicio-types.d.js'
import fetchPrismicFromNode from '../../../utils/fetchPrismicFromNode/fetchPrismicFromNode.js'

export type GetStandardPageByUidProps = {
  previewData: PreviewData
  uid: 'terms-of-service' | 'privacy-policy' | 'faq'
}

export default async function getStandardPageByUid(props: GetStandardPageByUidProps) {
  assert<GetStandardPageByUidProps>({ props, requiredProps: ['uid'] })

  const { data } = await fetchPrismicFromNode<PrismicDocument<StandardDocument['data']>>({
    fnName: `getStandardPageByUid - ${props.uid}`,
    previewData: props.previewData,
    prismicFn: async ({ prismicClient }) => {
      return await prismicClient.getByUID('standard', props.uid)
    },
  })

  return data
}

export type GetStandardPageByUidReturn = ReturnType<typeof getStandardPageByUid>
