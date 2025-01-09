import React from 'react'
import Box from '@useweb/ui/Box'
import UseDataUi from '@useweb/use-data-ui'

import useMessagesList from '../../useMessagesList/useMessagesList.js'
import type MessageSchema from '../../../../message.schema.js'
import useConversationData from '../../../../../conversations/queries/conversationsByUid/ui/Conversation/useConversationData/useConversationData.js'
import colors from '../../../../../../theme/tokens/colors.js'
import { scrollbarStyles } from '../../../../ui/MessageInputField/MessageInputField.js'

import MessagesListData from './MessagesListData/MessagesListData.js'
import MessagesListEmptyData from './MessagesListEmptyData/MessagesListEmptyData.js'
import MessagesListLoading from './MessagesListLoading/MessagesListLoading.js'
import MessagesListError from './MessagesListError/MessagesListError.js'

export default function MessagesList() {
  const conversation = useConversationData()
  const messages = useMessagesList()

  const conversationNotFound = conversation.data.get.dataIsEmpty

  if (conversation.data.get.error || conversationNotFound) {
    return null
  }

  return (
    <Box
      data-id='ConversationMessagesList'
      sx={{
        overflow: 'auto',
        backgroundColor: 'neutral.600',
        borderRadius: [, , '0 6px 6px 0'],
        p: '15px',
        pb: 0,

        ...scrollbarStyles,
        '&::-webkit-scrollbar-thumb': {
          background: colors.neutral[300],
          borderRadius: '32px',
        },
      }}
    >
      <UseDataUi<MessageSchema>
        asyncFunctionVariable={messages}
        data={MessagesListData}
        emptyData={MessagesListEmptyData}
        loading={MessagesListLoading}
        error={MessagesListError}
      />
    </Box>
  )
}
