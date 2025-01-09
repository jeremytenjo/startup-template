//https://storybook.js.org/docs/react/writing-docs/docs-page
import React from 'react'
import AsyncTester from '@useweb/async-tester'

import sendNewMessage, {
  type SendNewMessageProps,
  type SendNewMessageReturn,
} from '../sendNewMessage.js'
import userStubs from '../../../../users/users.stubs.js'

const defaultArgs: SendNewMessageProps = {
  receiver: {
    id: userStubs[0].id,
    name: userStubs[0].displayName,
    email: userStubs[0].email,
    photoURL: userStubs[0].profilePhoto?.src || '',
  },
  sender: {
    id: userStubs[1].id,
    name: userStubs[1].displayName,
    email: userStubs[1].email,
    photoURL: userStubs[1].profilePhoto?.src || '',
  },
  message: 'Hello',
}

export default {
  title: 'data/messages/queries/Send New Message',
  args: defaultArgs,
  parameters: {
    signInAs: 'user1',
  },
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const Template = (args: typeof defaultArgs) => {
  const fn = async (triggerProps = {}) => {
    return await sendNewMessage({ ...args, ...triggerProps })
  }

  return (
    <>
      <AsyncTester<SendNewMessageReturn, SendNewMessageProps> fn={fn} />
    </>
  )
}

export const Default = {
  render: (args: SendNewMessageProps) => {
    return <Template {...args} />
  },
}

// export const Variant = {
//  ...Default,
//  args: {
//  ...defaultArgs,
// } satisfies SendNewMessageProps
// }
