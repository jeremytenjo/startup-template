import assert from '@useweb/assert'

export type GetYoutubeChannelUploadsProps = {
  channelId: string
  type: 'videos' | 'shorts'
}

export default async function getYoutubeChannelUploads(
  props: GetYoutubeChannelUploadsProps,
): GetYoutubeChannelUploadsReturn {
  assert<GetYoutubeChannelUploadsProps>({ props, requiredProps: ['channelId'] })
  const apiKey = process.env.YOUTUBE_API_KEY

  if (!apiKey) {
    throw new Error(`Missing process.env.YOUTUBE_API_KEY`)
  }

  const uploadsPlaylistId = props.channelId.replace(
    'UC',
    videTypeMetrix[props.type].prefix,
  )

  const youtubeChannelUploads =
    ((await fetch(
      `https://www.googleapis.com/youtube/v3/playlistItems?part=snippet%2CcontentDetails&maxResults=50&playlistId=${uploadsPlaylistId}&key=${apiKey}`,
      {
        headers: {
          Referer: 'https://socialseed.com',
        },
      },
    ).then((res) => res.json())) as YoutubePlaylistAPIReturn) || []

  return { youtubeChannelUploads }
}

// https://stackoverflow.com/questions/71192605/how-do-i-get-youtube-shorts-from-youtube-api-data-v3
const videTypeMetrix = {
  videos: {
    prefix: 'UULF',
  },
  shorts: {
    prefix: 'UUSH',
  },
}

export type GetYoutubeChannelUploadsReturn = Promise<{
  youtubeChannelUploads: YoutubePlaylistAPIReturn
}>

interface YoutubePlaylistAPIReturn {
  kind: string
  etag: string
  items: Item[]
  pageInfo: PageInfo
}

interface PageInfo {
  totalResults: number
  resultsPerPage: number
}

interface Item {
  kind: string
  etag: string
  id: string
  snippet: Snippet
  contentDetails: ContentDetails
}

interface ContentDetails {
  videoId: string
  videoPublishedAt: string
}

interface Snippet {
  publishedAt: string
  channelId: string
  title: string
  description: string
  thumbnails: Thumbnails
  channelTitle: string
  playlistId: string
  position: number
  resourceId: ResourceId
  videoOwnerChannelTitle: string
  videoOwnerChannelId: string
}

interface ResourceId {
  kind: string
  videoId: string
}

interface Thumbnails {
  default: Default
  medium: Default
  high: Default
  standard?: Default
  maxres?: Default
}

interface Default {
  url: string
  width: number
  height: number
}
