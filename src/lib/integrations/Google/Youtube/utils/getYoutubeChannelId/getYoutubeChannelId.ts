import assert from '@useweb/assert'

import ensambleDataYoutubeGetChannelId from '../../../../EnsembleData/socials/youtube/ensambleDataYoutubeGetChannelId/ensambleDataYoutubeGetChannelId.js'

export type GetYoutubeChannelIdProps = { username: string; type: 'videos' | 'shorts' }

export default async function getYoutubeChannelId(props: GetYoutubeChannelIdProps) {
  assert<GetYoutubeChannelIdProps>({ props, requiredProps: ['username'] })

  const channelLink = `https://www.youtube.com/@${props.username}/${props.type}`
  const html = await fetch(channelLink).then((res) => res.text())
  let channelId =
    html.match(/channelId":"(.{24})"/)?.[1] ||
    html.match(/https:\/\/www\.youtube\.com\/channel\/(.*)/)?.[1]

  if (!channelId) {
    const ensembleDataYoutubeGetChannelId = await ensambleDataYoutubeGetChannelId({
      username: props.username,
    })

    channelId = ensembleDataYoutubeGetChannelId?.data
  }

  if (!channelId) {
    throw new Error(`channelId was not found in youtube page`, {
      cause: {
        props,
        channelLink,
        html,
      },
    })
  }

  return { channelId }
}

export type GetYoutubeChannelIdReturn = ReturnType<typeof getYoutubeChannelId>
