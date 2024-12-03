//https://storybook.js.org/docs/react/writing-docs/docs-page
// https://github.com/storybookjs/storybook/tree/next/code/frameworks/nextjs?ref=storybook-blog
import React from 'react'

import InfoBanner, { type InfoBannerProps } from '../InfoBanner.js'

const defaultArgs: InfoBannerProps = {
  icon: '/images/illustrations/clipboard.png',
  title: 'Game Listings',
  subTitle: 'Get more views to apply for more jobs',
  leftGradientIcon: 'purple',
  rightGradientIcon: 'orange',
}

export default {
  title: 'lib/components/dataDisplay/InfoBanner',
  component: InfoBanner,
  args: defaultArgs,
  parameters: {
    signInAs: false,
  },
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const Template = (args: InfoBannerProps) => {
  return (
    <>
      <InfoBanner {...args} />
    </>
  )
}

export const Default = {
  render: (args: InfoBannerProps) => {
    return <Template {...args} />
  },
}

export const WithChildren = {
  ...Default,
  args: {
    ...defaultArgs,
    children: 'children',
  } satisfies InfoBannerProps,
}

// export const Variant = {
//  ...Default,
//  args: {
//  ...defaultArgs,
// } satisfies InfoBannerProps
// }
