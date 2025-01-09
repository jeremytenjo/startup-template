//https://storybook.js.org/docs/react/writing-docs/docs-page
// https://github.com/storybookjs/storybook/tree/next/code/frameworks/nextjs?ref=storybook-blog
import React from 'react'
import AsyncTester from '@useweb/async-tester'

import getAllUnseenConversationMessagesFromUid, {
  type GetAllUidUnseenConversationMessagesProps,
  type GetAllUidUnseenConversationMessagesReturn,
} from '../getAllUnseenConversationMessagesFromUid.js'

const defaultArgs: GetAllUidUnseenConversationMessagesProps = {
  uid: 'user1',
}

export default {
  title: 'data/conversations/queries/Get All Unseen Conversation Messages From Uid',
  args: defaultArgs,
  parameters: {
    signInAs: 'user1',
  },
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const Template = (args: GetAllUidUnseenConversationMessagesProps) => {
  const fn = async (triggerProps = {}) => {
    return await getAllUnseenConversationMessagesFromUid({
      ...args,
      ...triggerProps,
    })
  }

  return (
    <>
      <AsyncTester<
        GetAllUidUnseenConversationMessagesReturn,
        GetAllUidUnseenConversationMessagesProps
      >
        fn={fn}
        autoExec
      />
    </>
  )
}

export const Default = {
  render: (args: GetAllUidUnseenConversationMessagesProps) => {
    return <Template {...args} />
  },
}

// export const Variant = {
//  ...Default,
//  args: {
//  ...defaultArgs,
// } satisfies GetAllUidUnseenConversationMessagesProps
// }
