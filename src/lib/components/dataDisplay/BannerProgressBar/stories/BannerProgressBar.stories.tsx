//https://storybook.js.org/docs/react/writing-docs/docs-page
// https://github.com/storybookjs/storybook/tree/next/code/frameworks/nextjs?ref=storybook-blog
import React from 'react'

import BannerProgressBar, { type BannerProgressBarProps } from '../BannerProgressBar.js'

const defaultArgs: BannerProgressBarProps = {
  title: 'BannerProgressBar',
  loading: false,
  progress: 50,
}

export default {
  title: 'lib/components/dataDisplay/BannerProgressBar',
  component: BannerProgressBar,
  args: defaultArgs,
  parameters: {
    signInAs: false,
  },
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const Template = (args: BannerProgressBarProps) => {
  return (
    <>
      <BannerProgressBar {...args} />
    </>
  )
}

export const Default = {
  render: (args: BannerProgressBarProps) => {
    return <Template {...args} />
  },
}

// export const Variant = {
//  ...Default,
//  args: {
//  ...defaultArgs,
// } satisfies BannerProgressBarProps
// }
