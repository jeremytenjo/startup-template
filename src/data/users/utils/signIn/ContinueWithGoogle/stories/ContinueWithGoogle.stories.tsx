//https://storybook.js.org/docs/react/writing-docs/docs-page
import React from 'react'
import AsyncTester from '@useweb/async-tester'

import continueWithGoogle, {
  type ContinueWithGoogleProps,
  type ContinueWithGoogleReturn,
} from '../continueWithGoogle.js'

const defaultArgs: ContinueWithGoogleProps = {
  signUp: undefined,
}

export default {
  title: 'lib/integrations/Google/Firebase/auth/signIn/Continue With Google',
  args: defaultArgs,
  parameters: {
    signInAs: false,
  },
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const Template = (args: typeof defaultArgs) => {
  const fn = async () => {
    return await continueWithGoogle({})
  }

  return (
    <>
      <AsyncTester<ContinueWithGoogleReturn, ContinueWithGoogleProps> fn={fn} autoExec />
    </>
  )
}

export const Default = {
  render: (args: ContinueWithGoogleProps) => {
    return <Template {...args} />
  },
}

// const variantArgs: ContinueWithGoogleProps = {
//  name: 'World',
// }

// export const Variant = {
//  ...Default,
//  args: variantArgs
// }
