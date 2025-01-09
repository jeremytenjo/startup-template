//https://storybook.js.org/docs/react/writing-docs/docs-page
// https://github.com/storybookjs/storybook/tree/next/code/frameworks/nextjs?ref=storybook-blog
import React from 'react'
import AsyncTester from '@useweb/async-tester'

import getUnseenMessagesFromConversation, {
  type GetUnseenMessagesFromConversationProps,
  type GetUnseenMessagesFromConversationReturn,
} from '../getUnseenMessagesFromConversation.js'

const defaultArgs: GetUnseenMessagesFromConversationProps = {
  conversationId: 'direct-conversation-1',
  otherUserUid: 'developer1',
}

export default {
  title: 'data/conversations/queries/Get Unseen Messages From Conversation',
  args: defaultArgs,
  parameters: {
    signInAs: 'user1',
  },
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const Template = (args: GetUnseenMessagesFromConversationProps) => {
  const fn = async (triggerProps = {}) => {
    return await getUnseenMessagesFromConversation({
      ...args,
      ...triggerProps,
    })
  }

  return (
    <>
      <AsyncTester<
        GetUnseenMessagesFromConversationReturn,
        GetUnseenMessagesFromConversationProps
      >
        fn={fn}
        autoExec
      />
    </>
  )
}

export const Default = {
  render: (args: GetUnseenMessagesFromConversationProps) => {
    return <Template {...args} />
  },
}

// export const Variant = {
//  ...Default,
//  args: {
//  ...defaultArgs,
// } satisfies GetUnseenMessagesFromConversationProps
// }
