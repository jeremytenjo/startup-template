import type { Client, PrismicDocument } from '@prismicio/client'
import assert from '@useweb/assert'

import getPrismicClient from '../getPrismicClient/getPrismicClient.js'

export type FetchPrismicProps = {
  prismicFn: (props: { prismicClient: Client }) => any
}

export default async function fetchPrismic<
  // get schema from prismicio-types.d.js
  Schema extends {
    data: any
  },
>(props: FetchPrismicProps) {
  assert<FetchPrismicProps>({ props, requiredProps: ['prismicFn'] })

  const { prismicClient } = getPrismicClient()

  const data = (await props.prismicFn({ prismicClient })) as PrismicDocument<
    Schema['data']
  >

  return {
    data,
  }
}

export type FetchPrismicReturn = ReturnType<typeof fetchPrismic>
