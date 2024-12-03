//https://storybook.js.org/docs/react/writing-docs/docs-page
// https://github.com/storybookjs/storybook/tree/next/code/frameworks/nextjs?ref=storybook-blog
import React from 'react'

import YoutubeEmbed, { type YoutubeEmbedProps } from '../YoutubeEmbed.js'

const defaultArgs: YoutubeEmbedProps = {
  url: 'https://www.youtube.com/watch?v=MmTXbrub2jg&ab_channel=KingBach',
  isYoutubeShort: false,
}

export default {
  title: 'lib/components/socials/youtube/YoutubeEmbed',
  component: YoutubeEmbed,
  args: defaultArgs,
  parameters: {
    signInAs: false,
  },
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const Template = (args: YoutubeEmbedProps) => {
  return (
    <>
      <YoutubeEmbed {...args} />
    </>
  )
}

export const Default = {
  render: (args: YoutubeEmbedProps) => {
    return <Template {...args} />
  },
}

// export const Variant = {
//  ...Default,
//  args: {
//  ...defaultArgs,
// } satisfies YoutubeEmbedProps
// }
