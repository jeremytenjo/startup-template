//https://storybook.js.org/docs/react/writing-docs/docs-page
import React from 'react'
import AsyncTester from '@useweb/async-tester'

import getConversationWithLastMessage, {
  type GetConversationWithLastMessageProps,
  type GetConversationWithLastMessageReturn,
} from '../getConversationWithLastMessage.js'

const defaultArgs: GetConversationWithLastMessageProps = {
  currentUid: 'user1',
  uid: 'developer1',
  conversations: [],
}

export default {
  title: 'data/conversations/queries/Get Conversation With Last Message',
  args: defaultArgs,
  parameters: {
    signInAs: false,
  },
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const Template = (args: typeof defaultArgs) => {
  const fn = async (triggerProps = {}) => {
    return await getConversationWithLastMessage({ ...args, ...triggerProps })
  }

  return (
    <>
      <AsyncTester<
        GetConversationWithLastMessageReturn,
        GetConversationWithLastMessageProps
      >
        fn={fn}
        autoExec
      />
    </>
  )
}

export const Default = {
  render: (args: GetConversationWithLastMessageProps) => {
    return <Template {...args} />
  },
}

// export const Variant = {
//  ...Default,
//  args: {
//  ...defaultArgs,
// } satisfies GetConversationWithLastMessageProps
// }
