//https://storybook.js.org/docs/react/writing-docs/docs-page
// https://github.com/storybookjs/storybook/tree/next/code/frameworks/nextjs?ref=storybook-blog
import React from 'react'
import AsyncTester from '@useweb/async-tester'

import getPaypalAccessToken, {
  type GetPaypalAccessTokenReturn,
} from '../getPaypalAccessToken.js'

const defaultArgs: any = {
  name: 'getPaypalAccessToken',
}

export default {
  title: 'lib/integrations/Paypal/utils/getPaypalAccessToken',

  args: defaultArgs,
  parameters: {
    signInAs: false,
  },
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const Template = (args: any) => {
  const fn = async () => {
    return await getPaypalAccessToken()
  }

  return (
    <>
      <AsyncTester<GetPaypalAccessTokenReturn, any> fn={fn} autoExec />
    </>
  )
}

export const Default = {
  render: (args: any) => {
    return <Template {...args} />
  },
}

// export const Variant = {
//  ...Default,
//  args: {
//  ...defaultArgs,
// } satisfies any
// }
