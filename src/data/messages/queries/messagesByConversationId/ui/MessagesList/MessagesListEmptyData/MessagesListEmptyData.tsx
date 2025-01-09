import React from 'react'
import Box from '@useweb/ui/Box'
import { type UseDataUiComponentProps } from '@useweb/use-data-ui'

import type MessageSchema from '../../../../../message.schema.js'
import ConversationStatusMessage from '../../_common/ConversationStatusMessage/ConversationStatusMessage.js'

export type MessagesListEmptyDataProps =
  UseDataUiComponentProps<MessageSchema>['emptyData']

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export default function MessagesListEmptyData(props: MessagesListEmptyDataProps) {
  return (
    <Box
      data-id='MessagesListEmptyData'
      sx={{
        wdith: '100%',
        textAlign: 'center',
        color: 'neutral.200',
        mb: '15px',
      }}
    >
      <ConversationStatusMessage text={`Send your first message`} />
    </Box>
  )
}
