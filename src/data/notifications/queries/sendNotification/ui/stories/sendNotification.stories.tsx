//https://storybook.js.org/docs/react/writing-docs/docs-page
// https://github.com/storybookjs/storybook/tree/next/code/frameworks/nextjs?ref=storybook-blog
import React from 'react'

import SendNotificationUi, {
  type SendNotificationUiProps,
} from '../SendNotificationUi.js'

const defaultArgs: SendNotificationUiProps = {
  name: 'SendNotificationUi',
}

export default {
  title: 'data/notifications/queries/ui/Send Notification',
  args: defaultArgs,
  parameters: {
    signInAs: false,
  },
}

const Template = (args: SendNotificationUiProps) => {
  return (
    <>
      <SendNotificationUi {...args} />
    </>
  )
}

export const Default = {
  render: (args: SendNotificationUiProps) => {
    return <Template {...args} />
  },
}

// export const Variant = {
//  ...Default,
//  args: {
//  ...defaultArgs,
// } satisfies SendNotificationUiProps
// }
