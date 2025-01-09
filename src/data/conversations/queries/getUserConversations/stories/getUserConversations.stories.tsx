//https://storybook.js.org/docs/react/writing-docs/docs-page
import React from 'react'
import AsyncTester from '@useweb/async-tester'

import getUserConversations, {
  type GetUserConversationsProps,
  type GetUserConversationsReturn,
} from '../getUserConversations.js'

const defaultArgs: GetUserConversationsProps = {
  uid: 'user1',
}

export default {
  title: 'data/conversations/queries/Get User Conversations',
  args: defaultArgs,
  parameters: {
    signInAs: false,
  },
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const Template = (args: typeof defaultArgs) => {
  const fn = async (triggerProps = {}) => {
    return await getUserConversations({ ...args, ...triggerProps })
  }

  return (
    <>
      <AsyncTester<GetUserConversationsReturn, GetUserConversationsProps>
        fn={fn}
        autoExec
      />
    </>
  )
}

export const Default = {
  render: (args: GetUserConversationsProps) => {
    return <Template {...args} />
  },
}

// export const Variant = {
//  ...Default,
//  args: {
//  ...defaultArgs,
// } satisfies GetUserConversationsProps
// }
