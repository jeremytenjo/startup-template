import useData from '@useweb/use-data'

import getYoutubeChannelDataFromOauth from '../getYoutubeChannelDataFromOauth/getYoutubeChannelDataFromOauth.js'

export type GetBasicYoutubeChannelDataProps = { googleAccessToken: string }

export default async function getBasicYoutubeChannelData(
  props: GetBasicYoutubeChannelDataProps,
): Promise<GetBasicYoutubeChannelDataReturn> {
  const youtubeChannelData = await getYoutubeChannelDataFromOauth({
    accessToken: props.googleAccessToken,
  })

  if (youtubeChannelData.data.error) {
    throw new Error(
      `Error youtubeChannelDatating youtube channel data: ${youtubeChannelData.data.error.message}`,
    )
  }

  const username = youtubeChannelData?.data?.items?.[0]?.snippet?.customUrl?.replace(
    '@',
    '',
  )

  const subscriberCount =
    youtubeChannelData?.data?.items?.[0]?.statistics.subscriberCount || '0'
  const viewCount = youtubeChannelData?.data?.items?.[0]?.statistics.viewCount || '0'
  const youtubeChannelId = youtubeChannelData?.data?.items?.[0]?.id

  return {
    id: youtubeChannelId,
    username,
    subscriberCount,
    viewCount,
    youtubeChannelId,
  }
}

export type GetBasicYoutubeChannelDataReturn = any

export const useBasicYoutubeChannelData = (props: GetBasicYoutubeChannelDataProps) => {
  const channelData = useData<any, any>({
    id: props.googleAccessToken
      ? `basicYoutubeChannelData/${props.googleAccessToken}`
      : undefined,
    get: {
      fetcher: async () => {
        const data = await getBasicYoutubeChannelData(props)
        return data ? [data] : []
      },
    },
  })

  return channelData
}
