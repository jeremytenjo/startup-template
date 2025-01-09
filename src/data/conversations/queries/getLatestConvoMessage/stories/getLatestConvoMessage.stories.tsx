//https://storybook.js.org/docs/react/writing-docs/docs-page
import React from 'react'
import AsyncTester from '@useweb/async-tester'

import getLatestConvoMessage, {
  type GetLatestConvoMessageProps,
  type GetLatestConvoMessageReturn,
} from '../getLatestConvoMessage.js'
import ConversationsStubs from '../../../conversations.stubs.js'

const defaultArgs: GetLatestConvoMessageProps = {
  uid: 'user1',
  otherMemberUid: 'developer1',
  conversation: ConversationsStubs[0],
}

export default {
  title: 'data/messages/queries/Get Latest Convo Message',
  args: defaultArgs,
  parameters: {
    signInAs: 'user1',
  },
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const Template = (args: typeof defaultArgs) => {
  const fn = async (triggerProps = {}) => {
    return await getLatestConvoMessage({ ...args, ...triggerProps })
  }

  return (
    <>
      <AsyncTester<GetLatestConvoMessageReturn, GetLatestConvoMessageProps>
        fn={fn}
        autoExec
      />
    </>
  )
}

export const Default = {
  render: (args: GetLatestConvoMessageProps) => {
    return <Template {...args} />
  },
}

// export const Variant = {
//  ...Default,
//  args: {
//  ...defaultArgs,
// } satisfies GetLatestConvoMessageProps
// }
