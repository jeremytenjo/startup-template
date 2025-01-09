//https://storybook.js.org/docs/react/writing-docs/docs-page
// https://github.com/storybookjs/storybook/tree/next/code/frameworks/nextjs?ref=storybook-blog
import React from 'react'
import AsyncTester from '@useweb/async-tester'
import date from '@useweb/date'

import sendSystemMessage, {
  type SendSystemMessageProps,
  type SendSystemMessageReturn,
} from '../sendSystemMessage.js'
import userStubs from '../../../../users/users.stubs.js'

const defaultArgs: SendSystemMessageProps = {
  message: {
    body: 'Eric Accepted your offer  this isia asdkfjk message with alo if ddetail slakdsjfkja asdf',
    conversationId: 'inProgress-job-1',
    seenBy: 'user1',
    senderUid: 'user1',
    sentDate: Date.parse(date().toISOString()),

    ctas: [
      {
        label: 'View Agreement',
        href: '/job/inProgress-job-1/agreement',
      },
    ],
  },

  notificationTitle: 'Eric Accepted your offer',
  receiver: userStubs.find((user) => user.id === 'user1') as any,
  sender: userStubs.find((user) => user.id === 'creator2') as any,
}

export default {
  title: 'data/messages/queries/SendSystemMessage',
  args: defaultArgs,
  parameters: {
    signInAs: 'user1',
  },
}

const Template = (args: SendSystemMessageProps) => {
  const fn = async (triggerProps = {}) => {
    return await sendSystemMessage({ ...args, ...triggerProps })
  }

  return (
    <>
      <AsyncTester<SendSystemMessageReturn, SendSystemMessageProps> fn={fn} autoExec />
    </>
  )
}

export const Default = {
  render: (args: SendSystemMessageProps) => {
    return <Template {...args} />
  },
}

export const Multine = {
  ...Default,
  args: {
    ...defaultArgs,
    notificationProps: {
      multilineBody: true,
    },
  } satisfies SendSystemMessageProps,
}

// export const Variant = {
//  ...Default,
//  args: {
//  ...defaultArgs,
// } satisfies SendSystemMessageProps
// }
