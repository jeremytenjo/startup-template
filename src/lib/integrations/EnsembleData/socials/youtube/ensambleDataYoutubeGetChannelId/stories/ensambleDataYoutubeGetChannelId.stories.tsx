//https://storybook.js.org/docs/react/writing-docs/docs-page
// https://github.com/storybookjs/storybook/tree/next/code/frameworks/nextjs?ref=storybook-blog
import React from 'react'
import AsyncTester from '@useweb/async-tester'

import ensambleDataYoutubeGetChannelId, {
  type EnsambleDataYoutubeGetChannelIdProps,
  type EnsambleDataYoutubeGetChannelIdReturn,
} from '../ensambleDataYoutubeGetChannelId.js'

const defaultArgs: EnsambleDataYoutubeGetChannelIdProps = {
  username: '1Coal',
}

export default {
  title: 'lib/integrations/EnsembleData/socials/youtube/EnsambleDataYoutubeGetChannelId',
  args: defaultArgs,
  parameters: {
    signInAs: false,
  },
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const Template = (args: EnsambleDataYoutubeGetChannelIdProps) => {
  const fn = async (triggerProps = {}) => {
    return await ensambleDataYoutubeGetChannelId({ ...args, ...triggerProps })
  }

  return (
    <>
      <AsyncTester<
        EnsambleDataYoutubeGetChannelIdReturn,
        EnsambleDataYoutubeGetChannelIdProps
      >
        fn={fn}
        autoExec
      />
    </>
  )
}

export const Default = {
  render: (args: EnsambleDataYoutubeGetChannelIdProps) => {
    return <Template {...args} />
  },
}

// export const Variant = {
//  ...Default,
//  args: {
//  ...defaultArgs,
// } satisfies EnsambleDataYoutubeGetChannelIdProps
// }
