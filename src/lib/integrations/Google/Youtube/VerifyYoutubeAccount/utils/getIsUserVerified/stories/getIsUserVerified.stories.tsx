//https://storybook.js.org/docs/react/writing-docs/docs-page
import React from 'react'
import AsyncTester from '@useweb/async-tester'

import getIsUserVerified, {
  type GetIsUserVerifiedProps,
  type GetIsUserVerifiedReturn,
} from '../getIsUserVerified.js'

const defaultArgs: GetIsUserVerifiedProps = {
  youtubeUsername: 'jeremytenjo',
}

export default {
  title:
    'lib/integrations/Google/Youtube/VerifyYoutubeAccount/utils/Get Is User Verified',
  args: defaultArgs,
  parameters: {
    signInAs: false,
  },
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const Template = (args: typeof defaultArgs) => {
  const fn = async (triggerProps = {}) => {
    return await getIsUserVerified({ ...args, ...triggerProps })
  }

  return (
    <>
      <AsyncTester<GetIsUserVerifiedReturn, GetIsUserVerifiedProps> fn={fn} autoExec />
    </>
  )
}

export const Default = {
  render: (args: GetIsUserVerifiedProps) => {
    return <Template {...args} />
  },
}

// export const Variant = {
//  ...Default,
//  args: {
//  ...defaultArgs,
// } satisfies GetIsUserVerifiedProps
// }
