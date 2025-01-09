import React from 'react'
import Box from '@useweb/ui/Box'
import { type UseDataUiComponentProps } from '@useweb/use-data-ui'

import type ConversationSchema from '../../../../../conversation.schema.js'
import MessagesNotSelected from '../../../../../../messages/ui/MessagesNotSelected/MessagesNotSelected.js'

export type ConversationsEmptyDataProps =
  UseDataUiComponentProps<ConversationSchema>['emptyData']

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export default function ConversationsEmptyData(props: ConversationsEmptyDataProps) {
  return (
    <Wrapper>
      <MessagesNotSelected noConversations />
    </Wrapper>
  )
}

const Wrapper = ({ children }) => {
  return (
    <Box
      data-id='ConversationsEmptyData'
      sx={{
        width: '100%',
        display: ['flex', , 'none'],
        justifyContent: 'center',
      }}
    >
      {children}
    </Box>
  )
}
