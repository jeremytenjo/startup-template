//https://storybook.js.org/docs/react/writing-docs/docs-page
import React from 'react'

import { ConversationsDataProvider } from '../../../../../../conversations/queries/conversationsByUid/ui/Conversations/useConversationsData/useConversationsData.js'
import MessageInputComponent from '../MessageInput.js'

export default {
  title: 'data/messages/ui/Message Input',
}

export const Default = {
  render: () => {
    return (
      <>
        <ConversationsDataProvider
          props={{
            dataConfig: {
              getOptions: {
                fetcherPayload: {
                  uid: 'user1',
                },
              },
            },
          }}
        >
          <MessageInputComponent />
        </ConversationsDataProvider>
      </>
    )
  },
}
