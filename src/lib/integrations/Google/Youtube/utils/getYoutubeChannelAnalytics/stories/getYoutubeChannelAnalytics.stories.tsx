//https://storybook.js.org/docs/react/writing-docs/docs-page
import React from 'react'
import AsyncTester from '@useweb/async-tester'

import getYoutubeChannelAnalytics, {
  type GetYoutubeChannelAnalyticsProps,
  type GetYoutubeChannelAnalyticsReturn,
} from '../getYoutubeChannelAnalytics.js'
import { testGoogleAccessToken } from '../../youtube.constants.js'

const defaultArgs: GetYoutubeChannelAnalyticsProps = {
  accessToken: testGoogleAccessToken,
  startDate: '2020-09-01',
  endDate: '2023-09-01',
  metrics: 'views',
}

export default {
  title: 'lib/integrations/Google/Youtube/utils/Get Youtube Channel Analytics',
  args: defaultArgs,
  parameters: {
    signInAs: false,
  },
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const Template = (args: typeof defaultArgs) => {
  const fn = async (triggerProps = {}) => {
    return await getYoutubeChannelAnalytics({ ...args, ...triggerProps })
  }

  return (
    <>
      <AsyncTester<GetYoutubeChannelAnalyticsReturn, GetYoutubeChannelAnalyticsProps>
        fn={fn}
        autoExec
      />
    </>
  )
}

export const Default = {
  render: (args: GetYoutubeChannelAnalyticsProps) => {
    return <Template {...args} />
  },
}

// const variantArgs: GetYoutubeChannelAnalyticsProps = {
//  name: 'World',
// }

// export const Variant = {
//  ...Default,
//  args: variantArgs
// }
