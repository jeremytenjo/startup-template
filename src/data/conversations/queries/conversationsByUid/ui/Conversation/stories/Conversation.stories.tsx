//https://storybook.js.org/docs/react/writing-docs/docs-page
import Box from '@useweb/ui/Box'
import React, { useEffect } from 'react'

import Conversation, { type ConversationProps } from '../Conversation.js'

const defaultArgs: ConversationProps = {
  conversationId: 'direct-conversation-1',
  uid: 'user1',
}

export default {
  title: 'data/conversations/queries/conversationsByUid/ui/Conversation',
  args: defaultArgs,
  parameters: {
    signInAs: 'user1',
  },
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const Template = (args: typeof defaultArgs) => {
  useEffect(() => {
    setTimeout(() => {
      const fbs = document.querySelectorAll('#firebase-emulator-warning')

      for (const iterator of fbs) {
        iterator?.remove()
      }
      document.querySelector('[name="AuthUserSetter trigger"]')?.remove()
    }, 1000)
  }, [])

  return (
    <Box
      sx={{
        position: 'relative',
        height: '100vh',
        maxHeight: '100vh',
      }}
    >
      <Conversation {...args} />
    </Box>
  )
}

export const Default = {
  render: (args: ConversationProps) => {
    return <Template {...args} />
  },
}

// export const OtherUser = {
//   ...Default,
//   args: {
//     ...defaultArgs,
//   },
//   parameters: {
//     signInAs: 'developer1',
//   },
// }
