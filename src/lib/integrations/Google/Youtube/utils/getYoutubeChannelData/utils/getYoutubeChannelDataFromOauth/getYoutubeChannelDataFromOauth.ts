import assert from '@useweb/assert'

export type GetYoutubeChannelDataFromOauthProps = { accessToken: string }

// use to get youtube channel data from oauth, use getYoutubeChannelData to fetch channel data from api key
export default async function getYoutubeChannelDataFromOauth(
  props: GetYoutubeChannelDataFromOauthProps,
) {
  assert({ props })
  const headersList = {
    Accept: '*/*',
    Authorization: `Bearer ${props.accessToken}`,
  }
  // https://developers.google.com/youtube/v3/docs/channels/list?apix_params=%7B%22part%22:%5B%22snippet,contentDetails,statistics%22%5D,%22forUsername%22:%22GoogleDevelopers%22%7D
  const response = await fetch(
    'https://www.googleapis.com/youtube/v3/channels?part=snippet,contentDetails,statistics&mine=true',
    {
      method: 'GET',
      headers: headersList,
    },
  )

  const data = await response.json()

  return { data }
}

export type GetYoutubeChannelDataFromOauthReturn = ReturnType<
  typeof getYoutubeChannelDataFromOauth
>
