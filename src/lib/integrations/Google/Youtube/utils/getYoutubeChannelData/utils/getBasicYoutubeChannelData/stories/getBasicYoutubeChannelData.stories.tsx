//https://storybook.js.org/docs/react/writing-docs/docs-page
import React from 'react'
import AsyncTester from '@useweb/async-tester'

import getBasicYoutubeChannelData, {
  type GetBasicYoutubeChannelDataProps,
  type GetBasicYoutubeChannelDataReturn,
} from '../getBasicYoutubeChannelData.js'

const defaultArgs: GetBasicYoutubeChannelDataProps = {
  googleAccessToken: process.env.YOUTUBE_API_KEY || '',
}

export default {
  title:
    'lib/integrations/Google/Youtube/utils/getYoutubeChannelData/utils/Get Basic Youtube Channel Data',
  args: defaultArgs,
  parameters: {
    signInAs: false,
  },
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const Template = (args: typeof defaultArgs) => {
  const fn = async (triggerProps = {}) => {
    return await getBasicYoutubeChannelData({ ...args, ...triggerProps })
  }

  return (
    <>
      <AsyncTester<GetBasicYoutubeChannelDataReturn, GetBasicYoutubeChannelDataProps>
        fn={fn}
        autoExec
      />
    </>
  )
}

export const Default = {
  render: (args: GetBasicYoutubeChannelDataProps) => {
    return <Template {...args} />
  },
}

// const variantArgs: GetBasicYoutubeChannelDataProps = {
//  name: 'World',
// }

// export const Variant = {
//  ...Default,
//  args: variantArgs
// }
