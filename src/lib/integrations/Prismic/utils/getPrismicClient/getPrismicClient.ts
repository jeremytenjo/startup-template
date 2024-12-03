import * as prismic from '@prismicio/client'
import * as prismicNext from '@prismicio/next'

import prismicConfig from '../../prismic.config.js'

type GetPrismicClientProps = {
  previewData?: any
  req?: any
}

// https://prismic.io/docs/technologies/setup-nextjs#configure-prismic
// This factory function allows smooth preview setup

/**
 * [Docs](https://prismic.io/docs/technical-reference/prismicio-client#usage)
 */
export default function getPrismicClient(props: GetPrismicClientProps = {}): {
  prismicClient: prismic.Client
} {
  const prismicClient = prismic.createClient(prismicConfig.repositoryName, {
    ...props,
    accessToken: prismicConfig.accessToken,
  })

  prismicNext.enableAutoPreviews({
    client: prismicClient,
    previewData: props.previewData,
    req: props.req,
  })

  return { prismicClient }
}
