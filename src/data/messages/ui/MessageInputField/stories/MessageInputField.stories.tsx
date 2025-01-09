//https://storybook.js.org/docs/react/writing-docs/docs-page
// https://github.com/storybookjs/storybook/tree/next/code/frameworks/nextjs?ref=storybook-blog
import React from 'react'

import MessageInputField, { type MessageInputFieldProps } from '../MessageInputField.js'

const defaultArgs: MessageInputFieldProps = {
  onSendMessage(props) {
    console.log(props)
  },
  lastMessageSentDate: undefined,
}

export default {
  title: 'lib/components/input/MessageInputField',
  component: MessageInputField,
  args: defaultArgs,
  parameters: {
    signInAs: false,
  },
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const Template = (args: MessageInputFieldProps) => {
  return (
    <>
      <MessageInputField {...args} />
    </>
  )
}

export const Default = {
  render: (args: MessageInputFieldProps) => {
    return <Template {...args} />
  },
}

// export const Variant = {
//  ...Default,
//  args: {
//  ...defaultArgs,
// } satisfies MessageInputFieldProps
// }
