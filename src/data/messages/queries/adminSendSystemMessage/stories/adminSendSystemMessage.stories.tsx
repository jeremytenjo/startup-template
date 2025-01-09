//https://storybook.js.org/docs/react/writing-docs/docs-page
// https://github.com/storybookjs/storybook/tree/next/code/frameworks/nextjs?ref=storybook-blog
import React from 'react'
import AsyncTester from '@useweb/async-tester'

import adminSendSystemMessage, {
  type AdminSendSystemMessageProps,
  type AdminSendSystemMessageReturn,
} from '../adminSendSystemMessage.js'
import userStubs from '../../../../users/users.stubs.js'

const defaultArgs: AdminSendSystemMessageProps = {
  user: userStubs[0],
  message: 'Hello from Admin!',
}

export default {
  title: 'data/messages/queries/adminSendSystemMessage',

  args: defaultArgs,
  parameters: {
    signInAs: false,
  },
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const Template = (args: AdminSendSystemMessageProps) => {
  const fn = async (triggerProps = {}) => {
    return await adminSendSystemMessage({ ...args, ...triggerProps })
  }

  return (
    <>
      <AsyncTester<AdminSendSystemMessageReturn, AdminSendSystemMessageProps>
        fn={fn}
        autoExec
      />
    </>
  )
}

export const Default = {
  render: (args: AdminSendSystemMessageProps) => {
    return <Template {...args} />
  },
}

// export const Variant = {
//  ...Default,
//  args: {
//  ...defaultArgs,
// } satisfies AdminSendSystemMessageProps
// }
