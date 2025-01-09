import React from 'react'
import date from '@useweb/date'
import Box from '@useweb/ui/Box'

import MessageUiC, { type MessageUiProps } from '../MessageUi.js'

const defaultArgs: MessageUiProps = {
  isMyMessage: false,
  sentDate: Date.parse(date('2013-07-01').toISOString()),
  body: `Hi, I am part of the marketing team at Nike. I came across your channel and was impressed with your content and the passion you bring to your videos.`,
  isSending: false,
  avatar: 'https://thumbs.dreamstime.com/b/algeria-map-collection-253453437.jpg',
  error: undefined,
  ctas: undefined,
  systemMessageProps: undefined,
  allConversationMessages: [],
  messageIndex: 0,
}

export default {
  title: 'data/messages/ui/Message',
  args: defaultArgs,
  parameters: {
    signInAs: false,
  },
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const Template = (args: typeof defaultArgs) => {
  return (
    <Box sx={{ p: 2 }}>
      <MessageUiC {...args} attachments={[]} />
      <br />
      <MessageUiC
        {...args}
        isMyMessage
        body={`Thank you for reaching out to me regarding sponsorship opportunities.`}
      />
      <br />
      <MessageUiC {...args} isSystemMessage body={`Agreement reached`} />
      <MessageUiC
        {...args}
        isMyMessage
        body={`Thank you for reaching out to me regarding sponsorship opportunities. I am glad to hear that you are interested in partnering with my channel.`}
      />
      <MessageUiC
        {...args}
        isSystemMessage
        body={`Video ready for review`}
        ctas={[
          {
            label: 'Review video',
            href: '/delivery',
          },
          {
            label: 'Delete video',
            href: '/delivery',
          },
        ]}
      />
    </Box>
  )
}

export const OtherUserMessageText = {
  render: (args: MessageUiProps) => {
    return <Template {...args} />
  },
}

export const OtherUserMessageAtachments = {
  ...OtherUserMessageText,
  args: {
    ...defaultArgs,
    attachments: [
      {
        downloadUrl: 'https://i.pravatar.cc/206',
        type: 'image/',
        name: 'hello',
      },
      { downloadUrl: 'https://i.pravatar.cc/200', type: '.pdf', name: 'hello' },
      {
        downloadUrl: 'https://i.pravatar.cc/201',
        type: 'image/',
        name: 'hello',
      },
      {
        downloadUrl: 'https://i.pravatar.cc/202',
        type: 'image/',
        name: 'hello',
      },
      { downloadUrl: 'https://i.pravatar.cc/203', type: '.mp4', name: 'file' },
      {
        downloadUrl: 'https://i.pravatar.cc/204',
        type: 'image/',
        name: 'hello',
      },
    ],
  } satisfies MessageUiProps,
}
