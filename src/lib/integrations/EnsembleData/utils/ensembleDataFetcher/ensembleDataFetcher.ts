import assert from '@useweb/assert'
import crossFetch from 'cross-fetch'

import { ensembleDataConfig } from '../../ensembleData.config.js'

export type EnsembleDataFetcherProps<ParamsSchema> = {
  endpoint:
    | '/tt/user/posts'
    | '/tt/user/info'
    | '/youtube/channel/name-to-id'
    | '/youtube/channel/followers'
  payload: ParamsSchema
}

export default async function ensembleDataFetcher<ParamsSchema, ReturnSchema>(
  props: EnsembleDataFetcherProps<ParamsSchema>,
): EnsembleDataFetcherReturn<ReturnSchema> {
  const token = ensembleDataConfig.token

  if (!token) {
    throw new Error(`process.env.ENSEMBLE_DATA_API_KEY is undefined`)
  }

  assert<EnsembleDataFetcherProps<ParamsSchema>>({
    props,
    requiredProps: ['endpoint', 'payload'],
  })

  // https://ensembledata.com/apis/docs#tag/Tiktok/operation/user_posts_from_username_tt_user_posts_get
  const root = 'https://www.ensembledata.com/apis'
  const payload = {
    token,
    ...props.payload,
  }

  const queryString = new URLSearchParams(payload).toString()
  const url = `${root}${props.endpoint}?${queryString}`
  const res = await crossFetch(url)
    .then((res) => res.json())
    .then((data) => data.data)

  return res
}

export type EnsembleDataFetcherReturn<ReturnSchema> = Promise<ReturnSchema>
