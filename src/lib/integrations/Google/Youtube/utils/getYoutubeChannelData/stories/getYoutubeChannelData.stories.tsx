//https://storybook.js.org/docs/react/writing-docs/docs-page
import React from 'react'
import AsyncTester from '@useweb/async-tester'

import getYoutubeChannelData, {
  type GetYoutubeChannelDataProps,
} from '../getYoutubeChannelData.js'

const defaultArgs: GetYoutubeChannelDataProps = {
  youtubeChannelId: 'UCl1rYtgypS4SWhvHGpISMYQ',
}

export default {
  title: 'lib/integrations/Google/Youtube/utils/Get Youtube Channel Data',
  args: defaultArgs,
  parameters: {
    signInAs: false,
  },
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const Template = (args: typeof defaultArgs) => {
  const fn = async (triggerProps = {}) => {
    return await getYoutubeChannelData({ ...args, ...triggerProps })
  }

  return (
    <>
      <AsyncTester<any, GetYoutubeChannelDataProps> fn={fn} autoExec />
    </>
  )
}

export const Default = {
  render: (args: GetYoutubeChannelDataProps) => {
    return <Template {...args} />
  },
}

// const variantArgs: GetYoutubeChannelDataProps = {
//  name: 'World',
// }

// export const Variant = {
//  ...Default,
//  args: variantArgs
// }
