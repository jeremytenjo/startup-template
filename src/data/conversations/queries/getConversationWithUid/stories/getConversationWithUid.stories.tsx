//https://storybook.js.org/docs/react/writing-docs/docs-page
import React from 'react'
import AsyncTester from '@useweb/async-tester'

import getConversationWithUid, {
  type GetConversationWithUidProps,
  type GetConversationWithUidReturn,
} from '../getConversationWithUid.js'

const defaultArgs: GetConversationWithUidProps = {
  currentUid: 'user1',
  uid: 'developer1',
}

export default {
  title: 'data/conversations/queries/Get Conversation With Uid',
  args: defaultArgs,
  parameters: {
    signInAs: false,
  },
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const Template = (args: typeof defaultArgs) => {
  const fn = async (triggerProps = {}) => {
    return await getConversationWithUid({ ...args, ...triggerProps })
  }

  return (
    <>
      <AsyncTester<GetConversationWithUidReturn, GetConversationWithUidProps>
        fn={fn}
        autoExec
      />
    </>
  )
}

export const Default = {
  render: (args: GetConversationWithUidProps) => {
    return <Template {...args} />
  },
}

// export const Variant = {
//  ...Default,
//  args: {
//  ...defaultArgs,
// } satisfies GetConversationWithUidProps
// }
