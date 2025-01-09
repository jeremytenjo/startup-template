//https://storybook.js.org/docs/react/writing-docs/docs-page
import React from 'react'
import AsyncTester from '@useweb/async-tester'

import getConversationById, {
  type GetConversationByIdProps,
  type GetConversationByIdReturn,
} from '../getConversationById.js'

const defaultArgs: GetConversationByIdProps = {
  conversationId: 'direct-conversation-1',
}

export default {
  title: 'data/conversations/queries/conversationsByUid/Get Conversation By Id',
  args: defaultArgs,
  parameters: {
    signInAs: 'user1',
  },
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const Template = (args: typeof defaultArgs) => {
  const fn = async (triggerProps = {}) => {
    return await getConversationById({ ...args, ...triggerProps })
  }

  return (
    <>
      <AsyncTester<GetConversationByIdReturn, GetConversationByIdProps>
        fn={fn}
        autoExec
      />
    </>
  )
}

export const Default = {
  render: (args: GetConversationByIdProps) => {
    return <Template {...args} />
  },
}

// export const Variant = {
//  ...Default,
//  args: {
//  ...defaultArgs,
// } satisfies GetConversationByIdProps
// }
