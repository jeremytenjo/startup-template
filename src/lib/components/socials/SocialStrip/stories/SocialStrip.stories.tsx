//https://storybook.js.org/docs/react/writing-docs/docs-page
// https://github.com/storybookjs/storybook/tree/next/code/frameworks/nextjs?ref=storybook-blog
import React from 'react'

import SocialStrip, { type SocialStripProps } from '../SocialStrip.js'

const defaultArgs: SocialStripProps = {
  platformName: 'youtubeVideo',
}

export default {
  title: 'lib/components/socials/SocialStrip',
  component: SocialStrip,
  args: defaultArgs,
  parameters: {
    signInAs: false,
  },
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const Template = (args: SocialStripProps) => {
  return (
    <>
      <SocialStrip {...args} />
    </>
  )
}

export const Default = {
  render: (args: SocialStripProps) => {
    return <Template {...args} />
  },
}

// export const Variant = {
//  ...Default,
//  args: {
//  ...defaultArgs,
// } satisfies SocialStripProps
// }
