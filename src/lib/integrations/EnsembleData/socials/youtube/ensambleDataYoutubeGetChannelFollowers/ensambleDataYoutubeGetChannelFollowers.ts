import assert from '@useweb/assert'

import ensembleDataFetcher from '../../../utils/ensembleDataFetcher/ensembleDataFetcher.js'

import type { EnsambleDataYoutubeGetChannelFollowersSchema } from './ensambleDataYoutubeGetChannelFollowers.schema.js'
import ensambleDataYoutubeGetChannelFollowersStubs from './ensambleDataYoutubeGetChannelFollowers.stubs.js'

export type EnsambleDataYoutubeGetChannelFollowersProps = { channelId: string }

export default async function ensambleDataYoutubeGetChannelFollowers(
  props: EnsambleDataYoutubeGetChannelFollowersProps,
): EnsambleDataYoutubeGetChannelFollowersReturn {
  assert<EnsambleDataYoutubeGetChannelFollowersProps>({
    props,
    requiredProps: ['channelId'],
  })

  // prevent using credits quota in development
  if (process.env.NODE_ENV === 'development') {
    return {
      data: ensambleDataYoutubeGetChannelFollowersStubs.data,
    }
  }

  // https://ensembledata.com/apis/docs#tag/Youtube/operation/channel_name_to_id_youtube_channel_name_to_id_get
  const { data } = await ensembleDataFetcher<
    {
      browseId: string
    },
    EnsambleDataYoutubeGetChannelFollowersSchema
  >({
    endpoint: '/youtube/channel/followers',
    payload: {
      browseId: props.channelId,
    },
  })

  return { data }
}

export type EnsambleDataYoutubeGetChannelFollowersReturn = Promise<{
  data: EnsambleDataYoutubeGetChannelFollowersSchema['data']
}>
