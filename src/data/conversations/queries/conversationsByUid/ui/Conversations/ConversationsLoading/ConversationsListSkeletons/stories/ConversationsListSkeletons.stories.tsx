//https://storybook.js.org/docs/react/writing-docs/docs-page
import React from 'react'

import ConversationsListSkeletons from '../ConversationsListSkeletons.js'

const defaultArgs: any = {}

export default {
  title:
    'data/conversations/queries/conversationsByUid/ui/Conversations/ConversationsLoading/Conversations List Skeletons',
  args: defaultArgs,
  parameters: {
    signInAs: false,
  },
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const Template = (args: typeof defaultArgs) => {
  return (
    <>
      <ConversationsListSkeletons {...args} />
    </>
  )
}

export const Default = {
  render: (args: any) => {
    return <Template {...args} />
  },
}

// export const Variant = {
//  ...Default,
//  args: {
//  ...defaultArgs,
// } satisfies any
// }
