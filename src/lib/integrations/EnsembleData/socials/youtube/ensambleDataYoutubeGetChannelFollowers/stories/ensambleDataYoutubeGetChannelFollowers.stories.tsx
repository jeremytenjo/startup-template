//https://storybook.js.org/docs/react/writing-docs/docs-page
// https://github.com/storybookjs/storybook/tree/next/code/frameworks/nextjs?ref=storybook-blog
import React from 'react'
import AsyncTester from '@useweb/async-tester'

import ensambleDataYoutubeGetChannelFollowers, {
  type EnsambleDataYoutubeGetChannelFollowersProps,
  type EnsambleDataYoutubeGetChannelFollowersReturn,
} from '../ensambleDataYoutubeGetChannelFollowers.js'

const defaultArgs: EnsambleDataYoutubeGetChannelFollowersProps = {
  channelId: 'UCnQghMm3Z164JFhScQYFTBw',
}

export default {
  title:
    'lib/integrations/EnsembleData/socials/youtube/EnsambleDataYoutubeGetChannelFollowers',
  args: defaultArgs,
  parameters: {
    signInAs: false,
  },
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const Template = (args: EnsambleDataYoutubeGetChannelFollowersProps) => {
  const fn = async (triggerProps = {}) => {
    return await ensambleDataYoutubeGetChannelFollowers({
      ...args,
      ...triggerProps,
    })
  }

  return (
    <>
      <AsyncTester<
        EnsambleDataYoutubeGetChannelFollowersReturn,
        EnsambleDataYoutubeGetChannelFollowersProps
      >
        fn={fn}
        autoExec
      />
    </>
  )
}

export const Default = {
  render: (args: EnsambleDataYoutubeGetChannelFollowersProps) => {
    return <Template {...args} />
  },
}

// export const Variant = {
//  ...Default,
//  args: {
//  ...defaultArgs,
// } satisfies EnsambleDataYoutubeGetChannelFollowersProps
// }
