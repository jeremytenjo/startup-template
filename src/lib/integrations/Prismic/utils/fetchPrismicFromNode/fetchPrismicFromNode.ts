import assert from '@useweb/assert'
import type { PreviewData } from 'next/types'
import type { Client } from '@prismicio/client'
import type { PrismicDocument } from '@prismicio/types'

import getPrismicClient from '../getPrismicClient/getPrismicClient.js'
import nodePhError from '../../../PostHog/events/node/nodePhError/nodePhError.js'

export type FetchPrismicFromNodeProps = {
  fnName: string
  previewData: PreviewData
  prismicFn: (props: { prismicClient: Client }) => any
}

export default async function fetchPrismicFromNode<
  // get schema from prismicio-types.d.js
  Schema extends {
    data: any
  },
>(props: FetchPrismicFromNodeProps) {
  assert<FetchPrismicFromNodeProps>({ props, requiredProps: [] })

  try {
    const { prismicClient } = getPrismicClient({
      previewData: props.previewData,
    })

    const data = (await props.prismicFn({ prismicClient })) as PrismicDocument<
      Schema['data']
    >

    return {
      data,
    }
  } catch (error) {
    console.log({ error })

    nodePhError({
      fnName: props.fnName,
      description: String(error),
      metadata: {
        props,
        error,
      },
    })

    return {
      data: {} as PrismicDocument<Schema['data']>,
    }
  }
}

export type FetchPrismicReturn = ReturnType<typeof fetchPrismicFromNode>
