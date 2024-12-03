//https://storybook.js.org/docs/react/writing-docs/docs-page
import React from 'react'
import AsyncTester from '@useweb/async-tester'

import revokeYoutubeAccountAccess, {
  type RevokeYoutubeAccountAccessProps,
  type RevokeYoutubeAccountAccessReturn,
} from '../revokeYoutubeAccountAccess.js'
import userStubs from '../../../../../../data/users/users.stubs.js'

const defaultArgs: RevokeYoutubeAccountAccessProps = {
  user: userStubs[0],
}

export default {
  title:
    'lib/integrations/Google/Youtube/RevokeYoutubeAccountAccess/Revoke Youtube Account',
  args: defaultArgs,
  parameters: {
    signInAs: false,
  },
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const Template = (args: typeof defaultArgs) => {
  const fn = async (triggerProps = {}) => {
    return await revokeYoutubeAccountAccess({ ...args, ...triggerProps })
  }

  return (
    <>
      <AsyncTester<RevokeYoutubeAccountAccessReturn, RevokeYoutubeAccountAccessProps>
        fn={fn}
        autoExec
      />
    </>
  )
}

export const Default = {
  render: (args: RevokeYoutubeAccountAccessProps) => {
    return <Template {...args} />
  },
}

// const variantArgs: RevokeYoutubeAccountAccessProps = {
//  name: 'World',
// }

// export const Variant = {
//  ...Default,
//  args: variantArgs
// }
