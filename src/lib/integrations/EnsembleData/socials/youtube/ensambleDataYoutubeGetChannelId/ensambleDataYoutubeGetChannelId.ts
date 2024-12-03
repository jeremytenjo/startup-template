import assert from '@useweb/assert'

import ensembleDataFetcher from '../../../utils/ensembleDataFetcher/ensembleDataFetcher.js'

import type { EnsambleDataYoutubeGetChannelIdSchema } from './ensambleDataYoutubeGetChannelId.schema.js'
import ensambleDataYoutubeGetChannelIdStubs from './ensambleDataYoutubeGetChannelId.stubs.js'

export type EnsambleDataYoutubeGetChannelIdProps = { username: string }

export default async function ensambleDataYoutubeGetChannelId(
  props: EnsambleDataYoutubeGetChannelIdProps,
): EnsambleDataYoutubeGetChannelIdReturn {
  assert<EnsambleDataYoutubeGetChannelIdProps>({ props, requiredProps: ['username'] })

  // prevent using credits quota in development
  if (process.env.NODE_ENV === 'development') {
    return {
      data: ensambleDataYoutubeGetChannelIdStubs.data,
    }
  }

  // https://ensembledata.com/apis/docs#tag/Youtube/operation/channel_name_to_id_youtube_channel_name_to_id_get
  const { data } = await ensembleDataFetcher<
    {
      name: string
    },
    EnsambleDataYoutubeGetChannelIdSchema
  >({
    endpoint: '/youtube/channel/name-to-id',
    payload: {
      name: props.username,
    },
  })

  return { data }
}

export type EnsambleDataYoutubeGetChannelIdReturn = Promise<{
  data: EnsambleDataYoutubeGetChannelIdSchema['data']
}>
