//https://storybook.js.org/docs/react/writing-docs/docs-page
import React from 'react'
import PixelPerfect from '@useweb/pixel-perfect'

import ConversationPreviewComponent from '../ConversationPreviewItem.js'
import MessagesStubs from '../../../../../../../../messages/messages.stubs.js'
import userStubs from '../../../../../../../../users/users.stubs.js'
import ConversationsStubs from '../../../../../../../conversations.stubs.js'

export default {
  title: 'lib/components/ConversationPreviewItem',
}

export const Default = {
  render: () => {
    return (
      <>
        <PixelPerfect
          hide={true}
          assets={[
            {
              width: 0,
              // Design https://www.figma.com/file/eg8sAdcWmoj6V3ttnJbDyn/Social-Seed?node-id=1655%3A41477
              url: 'https://figma-alpha-api.s3.us-west-2.amazonaws.com/images/80713760-fd42-4b8c-892f-dbb3d8e0d91d',
            },
          ]}
        />

        <ConversationPreviewComponent
          conversation={{
            rawConversation: ConversationsStubs[0],
            latestMessage: {
              message: MessagesStubs[0],
              otherMember: userStubs[0],
              isSentByCurrentUser: false,
            },
            id: '1',
          }}
        />
      </>
    )
  },
}
