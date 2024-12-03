//https://storybook.js.org/docs/react/writing-docs/docs-page
import React from 'react'
import AsyncTester from '@useweb/async-tester'

import verifyYoutubeAccount, {
  type VerifyYoutubeAccountProps,
  type VerifyYoutubeAccountReturn,
} from '../verifyYoutubeAccount.js'
import userStubs from '../../../../../../data/users/users.stubs.js'

const defaultArgs: VerifyYoutubeAccountProps = {
  user: userStubs[0],
}

export default {
  title: 'lib/integrations/Google/Youtube/VerifyYoutubeAccount/Verify Youtube Account',
  args: defaultArgs,
  parameters: {
    signInAs: false,
  },
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const Template = (args: typeof defaultArgs) => {
  const fn = async (triggerProps = {}) => {
    return await verifyYoutubeAccount({ ...args, ...triggerProps })
  }

  return (
    <>
      <AsyncTester<VerifyYoutubeAccountReturn, VerifyYoutubeAccountProps>
        fn={fn}
        autoExec
      />
    </>
  )
}

export const Default = {
  render: (args: VerifyYoutubeAccountProps) => {
    return <Template {...args} />
  },
}

// const variantArgs: VerifyYoutubeAccountProps = {
//  name: 'World',
// }

// export const Variant = {
//  ...Default,
//  args: variantArgs
// }
