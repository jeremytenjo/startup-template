//https://storybook.js.org/docs/react/writing-docs/docs-page
// https://github.com/storybookjs/storybook/tree/next/code/frameworks/nextjs?ref=storybook-blog
import React from 'react'
import AsyncTester from '@useweb/async-tester'
import { getToday } from '@useweb/date'

import sendNotification, {
  type SendNotificationProps,
  type SendNotificationReturn,
} from '../sendNotification.js'

const defaultArgs: SendNotificationProps = {
  notification: {
    senderUid: 'creator1',
    receiverUid: 'developer1',
    imageUrl: 'https://i.pravatar.cc/300',
    title: 'Anna Srzand sent you a message',
    sentDate: getToday(),
    message: 'Hello this is a message',

    seen: false,
    href: '/',
    ctas: [
      {
        label: 'Reply',
        href: '/conversations/conversationId',
      },
    ],
  },
}

export default {
  title: 'data/notifications/queries/Send Notification',
  args: defaultArgs,
  parameters: {
    signInAs: 'creator1',
  },
}

const Template = (args: SendNotificationProps) => {
  const fn = async (triggerProps = {}) => {
    return await sendNotification({ ...args, ...triggerProps })
  }

  return (
    <>
      <AsyncTester<SendNotificationReturn, SendNotificationProps> fn={fn} autoExec />
    </>
  )
}

export const Default = {
  render: (args: SendNotificationProps) => {
    return <Template {...args} />
  },
}

// export const Variant = {
//  ...Default,
//  args: {
//  ...defaultArgs,
// } satisfies SendNotificationProps
// }
