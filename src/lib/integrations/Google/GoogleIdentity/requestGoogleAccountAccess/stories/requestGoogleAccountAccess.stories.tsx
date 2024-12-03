//https://storybook.js.org/docs/react/writing-docs/docs-page
import React from 'react'
import AsyncTester from '@useweb/async-tester'
import requestGoogleAccountAccessToken, {
  type RequestGoogleAccountAccessTokenProps,
  type RequestGoogleAccountAccessTokenReturn,
} from '@useweb/google-identity-service/requestGoogleAccountAccessToken'

const defaultArgs: RequestGoogleAccountAccessTokenProps = {
  clientId: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID as string,
  scopes: [
    'https://www.googleapis.com/auth/yt-analytics.readonly',
    'https://www.googleapis.com/auth/youtube.readonly',
  ],
}

export default {
  title: 'lib/integrations/Google/GoogleIdentity/Request Google Account Access',
  args: defaultArgs,
  parameters: {
    signInAs: false,
  },
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const Template = (args: typeof defaultArgs) => {
  const fn = async (triggerProps = {}) => {
    return await requestGoogleAccountAccessToken({ ...args, ...triggerProps })
  }

  return (
    <>
      <AsyncTester<
        RequestGoogleAccountAccessTokenReturn,
        RequestGoogleAccountAccessTokenProps
      >
        fn={fn}
      />
    </>
  )
}

export const Default = {
  render: (args: RequestGoogleAccountAccessTokenProps) => {
    return <Template {...args} />
  },
}

// const variantArgs: RequestGoogleAccountAccessTokenProps = {
//  name: 'World',
// }

// export const Variant = {
//  ...Default,
//  args: variantArgs
// }
