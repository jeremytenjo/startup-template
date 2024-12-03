//https://storybook.js.org/docs/react/writing-docs/docs-page
// https://github.com/storybookjs/storybook/tree/next/code/frameworks/nextjs?ref=storybook-blog
import React from 'react'

import TikTokEmbed, { type TikTokEmbedProps } from '../TikTokEmbed.js'

const defaultArgs: TikTokEmbedProps = {
  url: 'https://www.tiktok.com/@ccaarqn/video/7237955542327561499?is_from_webapp=1&sender_device=pc',
  errorFallback: <>error loading tiktok</>,
}

export default {
  title: 'lib/components/socials/tiktok/TikTokEmbed',
  component: TikTokEmbed,
  args: defaultArgs,
  parameters: {
    signInAs: false,
  },
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const Template = (args: TikTokEmbedProps) => {
  return (
    <>
      <TikTokEmbed {...args} />
    </>
  )
}

export const Default = {
  render: (args: TikTokEmbedProps) => {
    return <Template {...args} />
  },
}

// export const Variant = {
//  ...Default,
//  args: {
//  ...defaultArgs,
// } satisfies TikTokEmbedProps
// }
