import assert from '@useweb/assert'
import useData from '@useweb/use-data'

export type GetYoutubeChannelDataProps = { youtubeChannelId: string }

// use to get any user's channel data using api key
export default async function getYoutubeChannelData(props: GetYoutubeChannelDataProps) {
  assert({ props })
  try {
    const apiKey = process.env.YOUTUBE_API_KEY
    console.log(`Fetching Youtube Channel Data for ${props.youtubeChannelId}...`)

    // https://developers.google.com/youtube/v3/docs/channels/list?apix_params=%7B%22part%22:%5B%22snippet,contentDetails,statistics%22%5D,%22forUsername%22:%22GoogleDevelopers%22%7D
    const res = await fetch(
      `https://www.googleapis.com/youtube/v3/channels?key=${apiKey}&id=${props.youtubeChannelId}&part=snippet,contentDetails,statistics`,
      {
        headers: {
          Referer: 'https://socialseed.com',
        },
      },
    )

    const resJson = await res.json()

    if (resJson.error) {
      throw new Error(resJson.error.message)
    }

    if (!resJson.items || resJson.items.length === 0) {
      throw new Error(`No Youtube Channel Data found for ${props.youtubeChannelId}`)
    }

    const data: GetYoutubeChannelDataReturn = {
      id: resJson.items[0].id,
      subscriberCount: parseInt(resJson.items[0].statistics?.subscriberCount, 10),
      videoCount: parseInt(resJson.items[0].statistics?.videoCount, 10),
      viewCount: parseInt(resJson.items[0].statistics?.viewCount, 10),
    }

    return [data]
  } catch (error: any) {
    throw new Error(error)
  }
}

export type GetYoutubeChannelDataReturn = {
  id: string
  subscriberCount: number
  videoCount: number
  viewCount: number
}

type UseYoutubeChannelDataProps = {
  youtubeChannelId: string | undefined
}

export const useYoutubeChannelData = (props: UseYoutubeChannelDataProps) => {
  const youtubeChannelData = useData<GetYoutubeChannelDataReturn>({
    id: props.youtubeChannelId
      ? `youtubeChannelData_${props.youtubeChannelId}`
      : undefined,
    get: {
      fetcher: async (props) => {
        const res = await fetch('/api/getYoutubeChannelData', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },

          body: JSON.stringify(props),
        })
          .then((res) => res.json())
          .catch((e) => {
            throw new Error(e)
          })

        if (res.error) {
          console.log(res.error)
          throw new Error(res.error)
        }

        return res.data || []
      },
      fetcherPayload: {
        youtubeChannelId: props.youtubeChannelId as string,
      },
    },
  })

  return youtubeChannelData
}
