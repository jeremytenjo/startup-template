//https://storybook.js.org/docs/react/writing-docs/docs-page
// https://github.com/storybookjs/storybook/tree/next/code/frameworks/nextjs?ref=storybook-blog
import React from 'react'
import AsyncTester from '@useweb/async-tester'

import getAllUnseenMessages, {
  type GetAllUnseenMessagesProps,
  type GetAllUnseenMessagesReturn,
} from '../getAllUnseenMessages.js'

const defaultArgs: GetAllUnseenMessagesProps = {
  uid: 'user1',
}

export default {
  title: 'data/messages/queries/Get All Unseen Messages',
  args: defaultArgs,
  parameters: {
    signInAs: 'user1',
  },
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const Template = (args: GetAllUnseenMessagesProps) => {
  const fn = async (triggerProps = {}) => {
    return await getAllUnseenMessages({ ...args, ...triggerProps })
  }

  return (
    <>
      <AsyncTester<GetAllUnseenMessagesReturn, GetAllUnseenMessagesProps>
        fn={fn}
        autoExec
      />
    </>
  )
}

export const Default = {
  render: (args: GetAllUnseenMessagesProps) => {
    return <Template {...args} />
  },
}

// export const Variant = {
//  ...Default,
//  args: {
//  ...defaultArgs,
// } satisfies GetAllUnseenMessagesProps
// }
